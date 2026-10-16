-- The portal's creator studio accepts public submissions by design.
-- Keep inserts limited to approved, self-contained catalog records.
grant insert, select on table public.products to anon, authenticated;
grant usage, select on sequence public.products_id_seq to anon, authenticated;
revoke update, delete, truncate, references, trigger on table public.products from anon, authenticated;

drop policy if exists "public skill submissions" on public.products;
create policy "public skill submissions"
  on public.products
  for insert
  to anon, authenticated
  with check (
    status = 'approved'
    and seller_id is null
    and metadata ? 'skills'
  );
