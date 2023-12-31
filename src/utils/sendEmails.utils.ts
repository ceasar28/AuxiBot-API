import nodemailer from "nodemailer";
import { defaultMessage, newYearMessage } from "./Messages";

export default async function sendEmail(
  to: string,
  timing: string,
  title: string,
  date: string,
  time: string,
  additionalInfo: string
) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.nodemailer_user,
      pass: process.env.nodemailer_password,
    },
  });

  const mailOptions = {
    from: "Tech From Root <techfromroot@gmail.com>",
    to: `${to}`,
    subject: "Auxibot Reminder",
    sender: "Auxibot",
    html: newYearMessage(title, timing, additionalInfo, date, time),
  };
  await transporter.sendMail(mailOptions);
}
