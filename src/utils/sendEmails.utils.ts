import nodemailer from "nodemailer";

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
    html: `<!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body {
              font-family: 'Arial', sans-serif;
              line-height: 1.6;
              margin: 0;
              padding: 0;
            }
        
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #f4f4f4;
            }
        
            h1 {
              color: #333;
            }
        
            p {
              color: #666;
            }
        
            footer {
              margin-top: 20px;
              font-size: 12px;
              color: #999;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Reminder: Your Event is Starting Soon</h1>
        
            <p>Hello,</p>
        
            <p>This is a friendly reminder that your event, "<strong>${title}</strong>," is scheduled to start in ${timing}.</p>
        
            <p><strong>Event Details:</strong></p>
            <ul>
              <li><strong>Info:</strong> ${additionalInfo}</li>
              <li><strong>Date:</strong> ${date}</li>
              <li><strong>Time:</strong> ${time}</li>
            </ul>
        
            <p>We look forward to having you at the event. If you have any questions or need further assistance, please feel free to contact us.</p>
        
            <footer>
              <p>Best regards,<br>Auxibot Team</p>
            </footer>
          </div>
        </body>
        </html>
        `,
  };
  await transporter.sendMail(mailOptions);
}
