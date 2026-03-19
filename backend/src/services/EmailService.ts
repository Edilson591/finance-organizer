import nodemailer from "nodemailer";



class EmailService {
  private transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  async send(to: string, subject: string, html: string) {
    await this.transporter.sendMail({
      from: `"Finance Organizer" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });
  }
}

export { EmailService };
