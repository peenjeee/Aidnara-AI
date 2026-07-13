alter table campaigns enable row level security;
alter table donations enable row level security;
alter table proofs enable row level security;
alter table certificates enable row level security;

drop policy if exists "public can read campaigns" on campaigns;
create policy "public can read campaigns"
  on campaigns for select
  using (true);

drop policy if exists "public can read donations" on donations;
create policy "public can read donations"
  on donations for select
  using (true);

drop policy if exists "public can read proofs" on proofs;
create policy "public can read proofs"
  on proofs for select
  using (true);

drop policy if exists "public can read certificates" on certificates;
create policy "public can read certificates"
  on certificates for select
  using (true);

-- ponytail: writes stay server-only via service role until wallet-session auth exists.
