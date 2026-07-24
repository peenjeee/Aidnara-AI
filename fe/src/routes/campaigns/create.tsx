import { createSignal } from "solid-js";

export default function CreateCampaignPage() {
  const [status, setStatus] = createSignal("");

  async function submitCampaign(event: SubmitEvent) {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const cover = formData.get("cover_image");

    if (!(cover instanceof File)) {
      setStatus("Cover image is required.");
      return;
    }

    setStatus("Uploading cover image...");

    try {
      const upload = new FormData();
      upload.set("kind", "campaign-cover");
      upload.set("file", cover);

      const uploadResponse = await fetch("/api/uploads", { method: "POST", body: upload });
      if (!uploadResponse.ok) throw new Error("Cover upload failed");
      const uploaded = await uploadResponse.json();

      const response = await fetch("/api/campaigns", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...Object.fromEntries(formData.entries()), cover_image_url: uploaded.path }),
      });

      if (!response.ok) throw new Error("Campaign API rejected the request");
      const campaign = await response.json();
      setStatus(`Campaign created: ${campaign.id || campaign.title || "success"}`);
      form.reset();
    } catch {
      setStatus("Could not create campaign yet. Check backend API and database config.");
    }
  }

  return (
    <main class="w-[min(760px,calc(100%-32px))] mx-auto py-16 grid gap-6">
      <section class="grid gap-4">
        <p class="text-gold font-bold uppercase tracking-[0.14em]">Organizer</p>
        <h1 class="text-5xl font-bold">Create Campaign</h1>
        <p class="text-muted text-xl leading-relaxed">
          Create off-chain campaign metadata first. On-chain linking can happen after wallet and contract deployment are ready.
        </p>
      </section>

      <form class="grid gap-4 rounded-3xl border border-white/10 bg-[#0f1b2d]/70 p-6" onSubmit={submitCampaign}>
        <label class="grid gap-2 font-bold">
          Owner wallet
          <input class="rounded-xl border border-white/10 bg-bg p-3" name="owner_address" placeholder="0x..." required />
        </label>
        <label class="grid gap-2 font-bold">
          Title
          <input class="rounded-xl border border-white/10 bg-bg p-3" name="title" minlength="5" maxlength="80" placeholder="Bantu Anak Desa Belajar Online" required />
        </label>
        <label class="grid gap-2 font-bold">
          Short description
          <input class="rounded-xl border border-white/10 bg-bg p-3" name="short_description" minlength="20" maxlength="160" placeholder="Campaign pendidikan transparan." required />
        </label>
        <label class="grid gap-2 font-bold">
          Long description
          <textarea class="min-h-32 rounded-xl border border-white/10 bg-bg p-3" name="long_description" minlength="100" maxlength="2000" placeholder="Jelaskan kebutuhan, penerima, dan rencana penggunaan dana." required />
        </label>
        <label class="grid gap-2 font-bold">
          Category
          <select class="rounded-xl border border-white/10 bg-bg p-3" name="category" required>
            <option value="education">Education</option>
            <option value="health">Health</option>
            <option value="disaster">Disaster</option>
            <option value="community">Community</option>
            <option value="environment">Environment</option>
          </select>
        </label>
        <label class="grid gap-2 font-bold">
          Target amount
          <input class="rounded-xl border border-white/10 bg-bg p-3" name="target_amount" type="number" min="0.001" step="0.001" placeholder="0.05" required />
        </label>
        <label class="grid gap-2 font-bold">
          Cover image
          <input class="rounded-xl border border-white/10 bg-bg p-3" name="cover_image" type="file" accept="image/*" required />
        </label>
        <label class="grid gap-2 font-bold">
          Beneficiary name
          <input class="rounded-xl border border-white/10 bg-bg p-3" name="beneficiary_name" placeholder="Siswa Desa" required />
        </label>
        <label class="grid gap-2 font-bold">
          Location
          <input class="rounded-xl border border-white/10 bg-bg p-3" name="location" placeholder="Indonesia" required />
        </label>
        <label class="grid gap-2 font-bold">
          Expected impact
          <textarea class="min-h-24 rounded-xl border border-white/10 bg-bg p-3" name="expected_impact" minlength="30" maxlength="500" placeholder="Dampak yang ingin dicapai." required />
        </label>
        <button class="rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 px-5 py-3 font-extrabold text-white" type="submit">
          Create Campaign
        </button>
        {status() && <p class="rounded-2xl border border-yellow-300/30 bg-yellow-300/10 p-4 text-gold">{status()}</p>}
      </form>
    </main>
  );
}
