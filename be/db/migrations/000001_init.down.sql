alter table donations drop constraint if exists donations_certificate_id_fkey;

drop table if exists certificates cascade;
drop table if exists proofs cascade;
drop table if exists donations cascade;
drop table if exists campaigns cascade;
