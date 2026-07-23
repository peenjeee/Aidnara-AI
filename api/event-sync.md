# Event Sync

Event sync persistence is not implemented in the Go backend yet.

## Current State

- Donation validation reads on-chain logs per transaction.
- Background indexing for all contract events is still deferred.

## Future Indexed Events

- `CampaignCreated`
- `DonationReceived`
- `ProofSubmitted`
- `CertificateIssued`
- `FundsWithdrawn`
