import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Бүх талбарыг бөглөнө үү' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.SMTP_EMAIL}>`,
      to: process.env.CONTACT_TO_EMAIL || 'abrenzevseg@gmail.com',
      replyTo: email,
      subject: `Portfolio Contact: ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #0d0a17; color: #b8b8c8; padding: 30px; border-radius: 12px;">
          <h2 style="color: #c91440; margin-bottom: 20px;">Шинэ мессеж ирлээ!</h2>
          <div style="background: #150f24; padding: 20px; border-radius: 8px; margin-bottom: 15px;">
            <p style="margin: 5px 0;"><strong style="color: #e0e0ea;">Нэр:</strong> ${name}</p>
            <p style="margin: 5px 0;"><strong style="color: #e0e0ea;">Email:</strong> <a href="mailto:${email}" style="color: #c91440;">${email}</a></p>
          </div>
          <div style="background: #150f24; padding: 20px; border-radius: 8px;">
            <p style="margin: 0 0 10px; color: #e0e0ea;"><strong>Мессеж:</strong></p>
            <p style="margin: 0; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
          <p style="margin-top: 20px; font-size: 12px; color: #6e6e80;">Sakuya Portfolio-оос илгээгдсэн</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('Email send error:', err);
    return NextResponse.json({ error: 'Email илгээхэд алдаа гарлаа' }, { status: 500 });
  }
}
