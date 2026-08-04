import { NextResponse } from "next/server";
import { renderStoredInvoice } from "@/lib/invoices/issue";
import { getSession } from "@/lib/os/session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * The one way a PDF leaves the system. Documents carry the buyer's address and
 * tax number, so the route is authenticated and the file is rendered on demand
 * from the stored row — there is no public URL to guess.
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await getSession())) {
    return NextResponse.json({ message: "Neautorizovano." }, { status: 401 });
  }

  const { id } = await params;
  const rendered = await renderStoredInvoice(id);
  if (!rendered) {
    return NextResponse.json({ message: "Dokument ne postoji." }, { status: 404 });
  }

  // The number contains a slash ("34/2026"), which cannot go in a filename.
  const filename = `${rendered.number.replace("/", "-")}.pdf`;

  return new NextResponse(Buffer.from(rendered.bytes), {
    headers: {
      "content-type": "application/pdf",
      "content-disposition": `inline; filename="${filename}"`,
      "cache-control": "no-store",
    },
  });
}
