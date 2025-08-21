import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Dozvoljen je samo POST zahtev' });
  }

  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Sva polja su obavezna' });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"${name}" <djordje@adspire.rs>"`,
      replyTo: email,
      to: 'djordje@adspire.rs',
      subject: subject || 'Kontakt poruka sa sajta',
      html: `
        <p><strong>Ime:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Tema:</strong> ${subject || 'N/A'}</p>
        <p><strong>Poruka:</strong></p>
        <p>${message}</p>
      `,
    });

    return res.status(200).json({ message: 'Poruka uspešno poslata.' });
  } catch (error) {
    return res.status(500).json({ message: 'Greška pri slanju poruke.', error });
  }
}
