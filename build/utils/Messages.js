"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newYearMessage = exports.defaultMessage = void 0;
const defaultMessage = (title, timing, additionalInfo, date, time) => {
    return `<!DOCTYPE html>
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
        `;
};
exports.defaultMessage = defaultMessage;
const newYearMessage = (title, timing, additionalInfo, date, time) => {
    return `<!DOCTYPE html>
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
            
            <p>Dear Team,</p>

            <p> As we bid farewell to the past year, I want to take a moment to express my heartfelt gratitude for the unwavering dedication and incredible teamwork that each of you has brought to our team.<br>
            Our success stories:<br>
            1. Akwukwo. <br>
            2. Ezigbo. <br>
            4. certvault <br>
            3. AuxiBot. <br><br>
            Together, we wrote alot of bugs, achieved remarkable milestones and conquered challenges. With the dawn of the New Year upon us, let's embrace the upcoming opportunities with enthusiasm, determination, and a shared sense of purpose. As a team, our collective efforts know no bounds. Let's carry forward this spirit of collaboration and innovation as we set our sights on new goals and aspirations.<br><br>
            May the canvas of the upcoming year be filled with inspiring moments, abundant success, and endless possibilities. Let's continue to support and motivate each other, turning challenges into stepping stones towards greater achievements.<br><br>
            Here's to a New Year filled with exciting ventures, meaningful collaborations, and shared successes!
            Wishing you and your loved ones a joyous, prosperous, and Happy New Year! <br><br>

            Emmanuel Ekete<br>
            Tech From Root
            </p>
          


            <footer>
              <p>Best regards,<br>Auxibot Team</p>
            </footer>
          </div>
        </body>
        </html>
        `;
};
exports.newYearMessage = newYearMessage;
//# sourceMappingURL=Messages.js.map