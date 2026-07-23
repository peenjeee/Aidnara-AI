import { For, createSignal, onMount } from "solid-js";
import { demoCampaigns, type DemoCampaign } from "./demo-campaigns";

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = createSignal<DemoCampaign[]>(demoCampaigns);
  const [notice, setNotice] = createSignal("Showing demo data until the Go API is connected.");

  onMount(async () => {
    try {
      const response = await fetch("/api/campaigns");
      if (!response.ok) throw new Error("Campaign API unavailable");
      const data = await response.json();
      if (Array.isArray(data) && data.length) {
        setCampaigns(data);
        setNotice("");
      }
    } catch {
      setNotice("Campaign API unavailable. Showing demo data.");
    }
  });

  return (
    <main class="w-[min(1120px,calc(100%-32px))] mx-auto py-16 grid gap-6">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <p class="text-gold font-bold uppercase tracking-[0.14em]">Open campaigns</p>
          <h1 class="text-5xl font-bold">Campaigns</h1>
        </div>
        <a href="/campaigns/create" class="rounded-full px-5 py-3 font-extrabold bg-gradient-to-br from-blue-600 to-cyan-500 text-white">
          Start Campaign
        </a>
      </div>

      {notice() && <p class="rounded-2xl border border-yellow-300/30 bg-yellow-300/10 p-4 text-gold">{notice()}</p>}

      <section class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <For each={campaigns()}>
          {(campaign) => (
            <a href={`/campaigns/${campaign.id}`} class="grid gap-3 rounded-3xl border border-white/10 bg-[#0f1b2d]/70 p-6 text-muted hover:border-white/20">
              <span class="text-gold text-sm font-extrabold uppercase">{campaign.category}</span>
              <h2 class="m-0 text-2xl font-bold text-white">{campaign.title}</h2>
              <p>{campaign.short_description}</p>
              <strong class="text-white">{campaign.target_amount} BNB target</strong>
            </a>
          )}
        </For>
      </section>
    </main>
  );
}
