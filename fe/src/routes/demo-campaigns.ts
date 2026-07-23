export type DemoCampaign = {
  id: string;
  title: string;
  short_description: string;
  category: string;
  target_amount: string;
  latest_trust_score: number;
};

export const demoCampaigns: DemoCampaign[] = [
  {
    id: 'demo-education-aid',
    title: 'Bantu Anak Desa Belajar Online',
    short_description: 'Laptop, router, dan bukti pembelian untuk akses belajar jarak jauh.',
    category: 'education',
    target_amount: '0.05',
    latest_trust_score: 87,
  },
  {
    id: 'demo-health-kit',
    title: 'Paket Kesehatan Ibu dan Anak',
    short_description: 'Distribusi vitamin, alat cek dasar, dan laporan dampak terverifikasi AI.',
    category: 'health',
    target_amount: '0.08',
    latest_trust_score: 91,
  },
];
