import { For } from "solid-js";

export default function Home() {
  const features = [
    "100% Transparent Smart Contracts",
    "Real-time verifiable impact",
    "No hidden transaction fees",
    "AI-powered beneficiary matching",
    "Instant fund distribution",
    "Tamper-proof donation receipts"
  ];

  return (
    <main class="w-[min(1120px,calc(100%-32px))] mx-auto py-16">
      <section class="grid place-items-center min-h-[72vh] text-center">
        <img
          src="https://raw.githubusercontent.com/RamsNotes31/Aidnara-AI/main/docs/logo/aidnara_ai_logo.png"
          alt="Aidnara AI logo"
          class="w-32 md:w-40 h-auto mb-6 drop-shadow-[0_0_15px_rgba(37,99,235,0.3)]"
        />
        <h1 class="text-[clamp(48px,9vw,112px)] leading-[0.95] m-0 font-bold">
          Empower with <span class="text-blue-500">Aidnara</span>
        </h1>
        <p class="max-w-[720px] text-muted text-[clamp(18px,2vw,24px)] leading-[1.6] mt-6">
          Human-centered aid with AI-verified impact. 
          See exactly where your donation goes, powered by blockchain transparency.
        </p>
        
        <div class="flex flex-wrap justify-center gap-4 mt-8">
          <a href="/campaigns" class="rounded-full px-5 py-3 font-extrabold bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/30 hover:scale-105 transition-transform">
            Browse Campaigns
          </a>
          <a href="/campaigns/create" class="rounded-full px-5 py-3 font-extrabold border border-white/20 text-white hover:bg-white/5 transition-colors">
            Start Campaign
          </a>
        </div>
      </section>

      <section aria-label="Core features" class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
        <For each={features}>
          {(feature) => (
            <article class="border border-white/10 rounded-3xl p-6 bg-[#0f1b2d]/70 text-muted shadow-sm hover:border-white/20 transition-colors">
              {feature}
            </article>
          )}
        </For>
      </section>
    </main>
  );
}
