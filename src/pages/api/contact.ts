import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Dozvoljen je samo POST zahtev" });
  }

  const body = typeof req.body === "string" ? Object.fromEntries(new URLSearchParams(req.body)) : req.body;
  const name = body?.name || body?.Name;
  const email = body?.email || body?.["E-mail"];
  const subject = body?.subject || body?.Phone || body?.form_subject;
  const message = body?.message || body?.Message;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "Sva polja su obavezna" });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  try {
    await transporter.sendMail({
      from: `"${name}" <${process.env.SMTP_USER}>`,
      replyTo: email,
      to: process.env.SMTP_USER,
      subject: subject || "Kontakt poruka sa sajta",
      html: `
        <p><strong>Ime:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Tema:</strong> ${subject || "N/A"}</p>
        <p><strong>Poruka:</strong></p>
        <p>${message}</p>
      `,
    });

    return res.status(200).json({ message: "Poruka uspesno poslata." });
  } catch (error) {
    console.error("SMTP Error:", error);
    return res.status(500).json({ message: "Greska pri slanju poruke." });
  }
}
