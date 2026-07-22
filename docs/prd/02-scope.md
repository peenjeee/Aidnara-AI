# PRD 02 - MVP Scope

## MVP Scope Summary

MVP Aidnara AI fokus pada satu alur: create campaign, donate, upload proof, generate AI report, generate certificate, verify certificate.

## In Scope

- Landing page dengan value proposition dan CTA.
- Wallet connect memakai RainbowKit/wagmi.
- Campaign list dengan progress dan trust score.
- Create campaign oleh wallet owner.
- Campaign detail dengan donation dashboard.
- Donate memakai native BNB Smart Chain Testnet token (`tBNB`).
- Donation history dari event/cache database.
- Upload proof oleh campaign owner.
- AI impact report dari file bukti dan klaim owner.
- Public transparency dashboard.
- Donor certificate otomatis setelah donasi confirmed.
- Organizer certificate setelah minimal satu proof dan AI report tersedia.
- Certificate verification page berbasis QR/hash.
- Storage file off-chain melalui Local VPS Storage atau Pinata IPFS.
- Deployment ke Vercel.
- Automated PRD, testing, dan security checks via `scripts/verify-mvp.js`.

## Out Of Scope

- Payment gateway fiat.
- Login email/password.
- Admin panel terpisah.
- DAO governance.
- Multi-token donation.
- NFT certificate.
- KYC formal.
- Dispute resolution.
- Advanced fraud detection.
- Multi-language content management.
- Mobile app native.

## MVP Feature Priority

P0 must have:

- Wallet connect.
- Create campaign.
- Donate.
- Upload proof.
- AI impact report.
- Certificate verification.

P1 should have:

- Campaign filters.
- Explorer links.
- Download certificate as PDF/image.
- Dashboard trust score card.
- Donation and proof timeline.

P2 nice to have:

- Share certificate button.
- Category badges.
- Basic organizer profile.
- IPFS mirror in addition to Local VPS Storage.

## Success Criteria

- Campaign owner can create a campaign and receive `chainCampaignId`.
- Donor can donate and see a transaction hash.
- Campaign total updates from chain event or refreshed contract read.
- Owner can upload proof and receive structured AI report.
- Donor certificate can be opened and verified by hash.
- Organizer certificate can be opened and verified by hash.
- Verification page clearly shows `VALID ON-CHAIN` or `NOT FOUND`.
- `node scripts/verify-mvp.js` passes before demo and deployment.

## Acceptance Criteria

- If wallet is disconnected, protected actions show connect wallet CTA.
- If wallet is on wrong chain, transaction buttons are disabled or ask switch chain.
- If transaction is pending, UI shows pending state and prevents duplicate submit.
- If AI generation fails, proof remains saved and user can retry AI report.
- If certificate generation fails, donation/proof data remains intact and user can retry certificate generation.
- If certificate hash is unknown, verification page must not show ambiguous success text.

## Demo Dataset

Use one polished sample campaign:

- Title: `Bantu Anak Desa Belajar Online`
- Category: `Education`
- Target: `0.05 ETH`
- Expected impact: `Membantu 15 siswa mendapatkan akses belajar online.`
- Proof claim: `Dana digunakan untuk membeli 3 laptop bekas layak pakai dan 1 router internet.`
