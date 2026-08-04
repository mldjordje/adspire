import Link from "next/link";
import { ClientForm } from "@/components/os/ClientForm";

export const dynamic = "force-dynamic";

export default function NewClientPage() {
  return (
    <>
      <p className="os-sub">
        <Link href="/os/klijenti">← Klijenti</Link>
      </p>
      <h1 className="os-h1">Novi klijent</h1>
      <p className="os-sub">PIB i matični broj idu na fakturu — unesi ih odmah.</p>

      <section className="os-section">
        <ClientForm />
      </section>
    </>
  );
}
