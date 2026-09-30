-- Dr. Asim Prakash Dental Clinic — patient portal schema
-- Run this once in Supabase Dashboard -> SQL Editor -> New query -> Run.
-- Safe to re-run (uses "if not exists" / "or replace" where possible).

-- 1) One profile row per signed-up patient (name + phone; email lives on auth.users)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own" on public.profiles
  for select using (auth.uid() = id);

drop policy if exists "profiles_upsert_own" on public.profiles;
create policy "profiles_upsert_own" on public.profiles
  for insert with check (auth.uid() = id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = id);

-- 2) Appointments: the clinic creates/confirms real appointments from the
--    Supabase Table Editor; patients can see their own, request a new one,
--    and request a reschedule (which just flags the row for the clinic to
--    action manually — it does NOT move the confirmed appointment itself).
create table if not exists public.appointments (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid not null references auth.users(id) on delete cascade,
  service text,
  appointment_date date,
  appointment_time text,
  status text not null default 'requested',
    -- requested | confirmed | reschedule_requested | completed | cancelled
  note text,
  requested_date date,
  requested_time text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.appointments enable row level security;

drop policy if exists "appointments_select_own" on public.appointments;
create policy "appointments_select_own" on public.appointments
  for select using (auth.uid() = patient_id);

drop policy if exists "appointments_insert_own" on public.appointments;
create policy "appointments_insert_own" on public.appointments
  for insert with check (auth.uid() = patient_id);

drop policy if exists "appointments_update_own" on public.appointments;
create policy "appointments_update_own" on public.appointments
  for update using (auth.uid() = patient_id);

-- Helpful index for the dashboard's "my appointments" query
create index if not exists appointments_patient_date_idx
  on public.appointments (patient_id, appointment_date desc nulls last, created_at desc);
