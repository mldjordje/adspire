-- The person who answers for the document.
--
-- An invoice issued electronically is a verodostojna isprava only when the
-- person authorised to issue it confirms it (čl. 9 Zakona o računovodstvu). No
-- stamp and no wet signature are needed, but the document has to name who
-- issued it — a footer that says "valid without signature" and names nobody
-- leaves that element unsatisfied.

alter table settings add column if not exists responsible_person text;

-- The issuer is one person, so seed it from the existing company name rather
-- than leaving a field that has to be filled before the next invoice goes out.
update settings
set responsible_person = 'Đorđe Mladenović'
where id = 1 and (responsible_person is null or responsible_person = '');
