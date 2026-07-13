create extension if not exists pgcrypto;

create table if not exists campaigns (
  id uuid primary key default gen_random_uuid(),
  chain_campaign_id bigint unique,
  owner_address text not null,
  title text not null,
  short_description text not null,
  long_description text not null,
  category text not null check (category in ('education', 'health', 'disaster', 'community', 'environment')),
  target_amount numeric not null check (target_amount > 0),
  cover_image_url text not null,
  beneficiary_name text not null,
  location text not null,
  expected_impact text not null,
  metadata_uri text,
  create_tx_hash text,
  latest_trust_score integer check (latest_trust_score between 0 and 100),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists donations (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid not null references campaigns(id) on delete cascade,
  donor_address text not null,
  amount numeric not null check (amount > 0),
  tx_hash text not null unique,
  certificate_id uuid,
  created_at timestamptz not null default now()
);

create table if not exists proofs (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid not null references campaigns(id) on delete cascade,
  title text not null,
  description text not null,
  amount_used numeric not null check (amount_used > 0),
  impact_claim text not null,
  file_url text not null,
  file_hash text not null,
  proof_uri text,
  submit_tx_hash text,
  ai_status text not null default 'pending' check (ai_status in ('pending', 'generated', 'failed')),
  ai_summary text,
  ai_detected_items jsonb not null default '[]'::jsonb,
  ai_consistency text,
  ai_risk text check (ai_risk in ('Low', 'Medium', 'High')),
  ai_estimated_impact text,
  ai_trust_score integer check (ai_trust_score between 0 and 100),
  ai_certificate_impact_text text,
  created_at timestamptz not null default now()
);

create table if not exists certificates (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid not null references campaigns(id) on delete cascade,
  donation_id uuid references donations(id) on delete set null,
  proof_id uuid references proofs(id) on delete set null,
  recipient_address text not null,
  certificate_type text not null check (certificate_type in ('donor', 'organizer')),
  certificate_uri text,
  certificate_hash text not null unique,
  issue_tx_hash text,
  status text not null default 'generated' check (status in ('pending', 'generated', 'registered', 'failed', 'revoked')),
  issued_at timestamptz not null default now()
);

alter table donations
  add constraint donations_certificate_id_fkey
  foreign key (certificate_id) references certificates(id) on delete set null;

create index if not exists campaigns_owner_address_idx on campaigns(owner_address);
create index if not exists campaigns_chain_campaign_id_idx on campaigns(chain_campaign_id);
create index if not exists donations_campaign_id_idx on donations(campaign_id);
create index if not exists donations_tx_hash_idx on donations(tx_hash);
create index if not exists proofs_campaign_id_idx on proofs(campaign_id);
create index if not exists proofs_file_hash_idx on proofs(file_hash);
create index if not exists certificates_hash_idx on certificates(certificate_hash);
create index if not exists certificates_campaign_id_idx on certificates(campaign_id);
