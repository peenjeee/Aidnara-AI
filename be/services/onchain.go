package services

import (
	"context"
	"fmt"
	"math/big"
	"strings"

	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/ethclient"
)

const aidnaraABIJSON = `[
	{
		"anonymous": false,
		"inputs": [
			{"indexed": true, "internalType": "uint256", "name": "campaignId", "type": "uint256"},
			{"indexed": true, "internalType": "address", "name": "owner", "type": "address"},
			{"indexed": false, "internalType": "string", "name": "metadataURI", "type": "string"},
			{"indexed": false, "internalType": "uint256", "name": "targetAmount", "type": "uint256"}
		],
		"name": "CampaignCreated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{"indexed": true, "internalType": "uint256", "name": "campaignId", "type": "uint256"},
			{"indexed": true, "internalType": "address", "name": "donor", "type": "address"},
			{"indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256"}
		],
		"name": "DonationReceived",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{"indexed": true, "internalType": "uint256", "name": "campaignId", "type": "uint256"},
			{"indexed": true, "internalType": "bytes32", "name": "proofHash", "type": "bytes32"},
			{"indexed": false, "internalType": "string", "name": "proofURI", "type": "string"}
		],
		"name": "ProofSubmitted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{"indexed": true, "internalType": "uint256", "name": "campaignId", "type": "uint256"},
			{"indexed": true, "internalType": "address", "name": "recipient", "type": "address"},
			{"indexed": true, "internalType": "bytes32", "name": "certificateHash", "type": "bytes32"},
			{"indexed": false, "internalType": "string", "name": "certificateType", "type": "string"}
		],
		"name": "CertificateIssued",
		"type": "event"
	}
]`

type OnchainValidationOptions struct {
	RPCUrl          string
	ContractAddress string
}

type DonationEventExpectation struct {
	TxHash         string
	CampaignID     *big.Int
	DonorAddress   string
	Amount         *big.Int
}

// ValidateDonationEvent verifies that a transaction contains the expected DonationReceived event.
func ValidateDonationEvent(ctx context.Context, opts OnchainValidationOptions, expect DonationEventExpectation) error {
	client, err := ethclient.Dial(opts.RPCUrl)
	if err != nil {
		return fmt.Errorf("failed to connect to RPC: %w", err)
	}
	defer client.Close()

	txHash := common.HexToHash(expect.TxHash)
	receipt, err := client.TransactionReceipt(ctx, txHash)
	if err != nil {
		return fmt.Errorf("failed to fetch receipt: %w", err)
	}
	if receipt.Status != 1 {
		return fmt.Errorf("transaction failed on-chain")
	}

	contractAddr := common.HexToAddress(opts.ContractAddress)
	parsedABI, err := abi.JSON(strings.NewReader(aidnaraABIJSON))
	if err != nil {
		return fmt.Errorf("failed to parse ABI: %w", err)
	}

	event := parsedABI.Events["DonationReceived"]
	
	for _, log := range receipt.Logs {
		if log.Address.Cmp(contractAddr) != 0 {
			continue
		}
		if len(log.Topics) == 0 || log.Topics[0] != event.ID {
			continue
		}

		// Parse Indexed Topics
		campaignID := new(big.Int).SetBytes(log.Topics[1].Bytes())
		donor := common.BytesToAddress(log.Topics[2].Bytes())

		// Parse unindexed data
		var amount struct {
			Amount *big.Int
		}
		if err := parsedABI.UnpackIntoInterface(&amount, "DonationReceived", log.Data); err != nil {
			continue
		}

		// Assertions
		if campaignID.Cmp(expect.CampaignID) != 0 {
			return fmt.Errorf("campaignId mismatch: expected %v, got %v", expect.CampaignID, campaignID)
		}
		if !strings.EqualFold(donor.Hex(), expect.DonorAddress) {
			return fmt.Errorf("donor mismatch: expected %s, got %s", expect.DonorAddress, donor.Hex())
		}
		if amount.Amount.Cmp(expect.Amount) != 0 {
			return fmt.Errorf("amount mismatch: expected %v, got %v", expect.Amount, amount.Amount)
		}

		return nil // Success
	}

	return fmt.Errorf("DonationReceived event not found in transaction")
}
