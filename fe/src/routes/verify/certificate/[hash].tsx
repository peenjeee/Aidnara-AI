import { useParams } from "@solidjs/router";
import { createSignal, onMount } from "solid-js";

type CertificateVerification = {
  status?: string;
  certificate_type?: string;
  campaign_id?: string;
  recipient_address?: string;
  certificate_uri?: string;
  certificate_hash?: string;
  issued_at?: string;
  issue_tx_hash?: string;
};

export default function VerifyCertificatePage() {
  const params = useParams();
  const [certificate, setCertificate] = createSignal<CertificateVerification>();
  const [notice, setNotice] = createSignal("Checking certificate...");

  onMount(async () => {
    try {
      const response = await fetch(`/api/certificates/hash/${params.hash}`);
      if (!response.ok) throw new Error("Certificate not found");
      setCertificate(await response.json());
      setNotice("");
    } catch {
      if (params.hash === "demo-certificate-hash") {
        setCertificate({
          status: "issued",
          certificate_type: "donor",
          campaign_id: "demo-education-aid",
          recipient_address: "0x0000000000000000000000000000000000000002",
          certificate_hash: params.hash,
          issue_tx_hash: "0xdemo",
        });
        setNotice("Certificate API unavailable. Showing demo verification data.");
      } else {
        setNotice("Certificate not found.");
      }
    }
  });

  return (
    <main class="w-[min(760px,calc(100%-32px))] mx-auto py-16 grid gap-6">
      <section class="grid gap-4 rounded-3xl border border-white/10 bg-[#0f1b2d]/70 p-6">
        <p class="text-gold font-bold uppercase tracking-[0.14em]">Aidnara AI</p>
        <h1 class="text-5xl font-bold">Verify Certificate</h1>
        {notice() && <p class="rounded-2xl border border-yellow-300/30 bg-yellow-300/10 p-4 text-gold">{notice()}</p>}
        {certificate() && (
          <div class="grid gap-3 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 p-5">
            <strong class="text-gold uppercase tracking-[0.14em]">{certificate()!.status}</strong>
            <span>{certificate()!.certificate_type}</span>
            <code class="break-all text-white">{certificate()!.certificate_hash}</code>
            <p class="text-muted">Recipient: {certificate()!.recipient_address}</p>
            <p class="text-muted">Campaign: {certificate()!.campaign_id}</p>
            {certificate()!.issue_tx_hash && (
              <a class="break-all text-cyan-300 underline" href={explorerTxUrl(certificate()!.issue_tx_hash!)} target="_blank">
                View transaction on BscScan: {certificate()!.issue_tx_hash}
              </a>
            )}
          </div>
        )}
      </section>
    </main>
  );
}

function explorerTxUrl(txHash: string) {
  return `https://testnet.bscscan.com/tx/${txHash}`;
}
