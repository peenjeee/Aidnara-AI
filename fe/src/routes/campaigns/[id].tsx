import { useParams } from "@solidjs/router";
import { createSignal, onMount } from "solid-js";
import { demoCampaigns, type DemoCampaign } from "../demo-campaigns";

export default function CampaignDetailPage() {
  const params = useParams();
  const [campaign, setCampaign] = createSignal<DemoCampaign | undefined>();
  const [notice, setNotice] = createSignal("Loading campaign...");

  onMount(async () => {
    try {
      const response = await fetch(`/api/campaigns/${params.id}`);
      if (!response.ok) throw new Error("Campaign API unavailable");
      setCampaign(await response.json());
      setNotice("");
    } catch {
      const demoCampaign = demoCampaigns.find((item) => item.id === params.id);
      setCampaign(demoCampaign);
      setNotice(demoCampaign ? "Campaign API unavailable. Showing demo data." : "Campaign not found.");
    }
  });

  return (
    <main class="w-[min(760px,calc(100%-32px))] mx-auto py-16 grid gap-6">
      {notice() && <p class="rounded-2xl border border-yellow-300/30 bg-yellow-300/10 p-4 text-gold">{notice()}</p>}
      {campaign() && (
        <article class="grid gap-4 rounded-3xl border border-white/10 bg-[#0f1b2d]/70 p-6">
          <p class="text-gold font-bold uppercase tracking-[0.14em]">{campaign()!.category}</p>
          <h1 class="text-5xl font-bold">{campaign()!.title}</h1>
          <p class="text-muted text-xl leading-relaxed">{campaign()!.short_description}</p>
          <div class="flex flex-wrap gap-3">
            <span class="rounded-full bg-cyan-500/10 px-4 py-2 font-bold">{campaign()!.target_amount} BNB target</span>
            <span class="rounded-full bg-cyan-500/10 px-4 py-2 font-bold">{campaign()!.latest_trust_score} trust score</span>
          </div>
        </article>
      )}
    </main>
  );
}
