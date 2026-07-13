const features = [
  'BNB Smart Chain donation tracking',
  'AI-assisted proof and impact reports',
  'QR-verifiable impact certificates',
];

export default function HomePage() {
  return (
    <main className="shell">
      <section className="hero">
        <img
          src="https://raw.githubusercontent.com/RamsNotes31/Aidnara-AI/main/docs/logo/aidnara_ai_logo.png"
          alt="Aidnara AI logo"
          className="logo"
        />
        <p className="eyebrow">Transparent Aid, Verified Impact</p>
        <h1>Aidnara AI</h1>
        <p className="lede">
          A transparent donation platform on BNB Smart Chain with AI impact verification and on-chain
          certificate records.
        </p>
        <div className="actions">
          <a href="/campaigns" className="primary">Explore Campaigns</a>
          <a href="/campaigns/create" className="secondary">Start Campaign</a>
        </div>
      </section>

      <section className="cards" aria-label="Core features">
        {features.map((feature) => (
          <article className="card" key={feature}>{feature}</article>
        ))}
      </section>
    </main>
  );
}
