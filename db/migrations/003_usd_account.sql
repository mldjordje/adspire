-- A second foreign-currency account.
--
-- The issuer holds EUR and USD accounts separately, and a foreign invoice must
-- name the account that can actually receive the currency it is denominated in
-- — a dollar transfer sent to the euro account is the buyer's bank charging
-- both sides a conversion nobody agreed to.

alter table settings add column if not exists usd_account text;
