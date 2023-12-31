import { Request, Response } from "express";
import EventModel from "../models/event.model";
import schedule from "node-schedule";
import * as yup from "yup";
import sendEmail from "../utils/sendEmails.utils";
import cron from "node-cron";

export default class EventController {
  async createEvent(req: Request, res: Response) {
    const eventSchema = yup.object().shape({
      title: yup.string().required("Title is required").trim(),
      email: yup
        .string()
        .email("Invalid email format")
        .required("Email is required")
        .lowercase()
        .trim(),
      inviteEmails: yup
        .array()
        .of(yup.string().email("Invalid email format"))
        .required("Invite emails are required"),
      additionalInfo: yup.string().trim(),
      date: yup
        .string()
        .required("Date is required")
        .matches(/^\d{4} - \d{2} - \d{2}$/),
      time: yup
        .string()
        .required("Time is required")
        .matches(/^\d{2}:\d{2}$/),
    });
    if (!req.body || typeof req.body !== "object") {
      return res.status(400).send({
        success: false,
        message: "Invalid request body",
      });
    }
    try {
      await eventSchema.validate(req.body, {
        abortEarly: false,
      });
    } catch (error) {
      const errorMessage: string[] = [];
      if (error instanceof yup.ValidationError) {
        error.inner.forEach((detail) => {
          errorMessage.push(detail.message);
        });
      } else {
        errorMessage.push("Validation error");
      }
      return res.status(403).send({
        message: errorMessage,
        success: false,
      });
    }
    const dateParts = req.body.date.split(" - ");
    const formattedDate = `${dateParts[0]}-${dateParts[1]}-${dateParts[2]}`;
    const dateTime = new Date(`${formattedDate}T${req.body.time}:00.000Z`);
    const utcTime = new Date(dateTime.toISOString());
    // to check for negative hourse
    let hours = utcTime.getUTCHours();
    // Adjust the hour in case it became negative after subtraction
    const adjustedHours = hours == 0 ? 24 : hours; // Handling negative hours
    console.log("adjusted hour :", adjustedHours);

    const cronExpressionOneDayBefore = `${utcTime.getUTCMinutes()} ${utcTime.getUTCHours()} ${
      utcTime.getUTCDate() - 1
    } ${utcTime.getUTCMonth() + 1} *`;
    const cronExpressionOneHourBefore = `${utcTime.getUTCMinutes()} ${
      adjustedHours - 1
    } ${utcTime.getUTCDate()} ${utcTime.getUTCMonth() + 1} *`;

    // Subtract 2 minutes from the current UTC time
    utcTime.setUTCMinutes(utcTime.getUTCMinutes() - 2);
    const cronExpressionTwoMinutesBefore = `${utcTime.getUTCMinutes()} ${utcTime.getUTCHours()} ${utcTime.getUTCDate()} ${
      utcTime.getUTCMonth() + 1
    } *`;

    console.log(cronExpressionOneDayBefore);
    console.log(cronExpressionOneHourBefore);
    console.log(cronExpressionTwoMinutesBefore);
    const { email, title, date, time, additionalInfo, inviteEmails } = req.body;
    req.body.time = dateTime;
    const createdEvent = await EventModel.create(req.body);

    cron.schedule(cronExpressionOneDayBefore, async () => {
      try {
        // looping through emails
        inviteEmails.map(async (mail: string) => {
          await sendEmail(mail, "a day", title, date, time, additionalInfo);
          console.log("Email for one day before sent successfully");
        });
      } catch (error) {
        console.error("Error sending email:", error);
      }
    });
    cron.schedule(cronExpressionOneHourBefore, async () => {
      try {
        // looping through emails
        inviteEmails.map(async (mail: string) => {
          await sendEmail(mail, "one hour", title, date, time, additionalInfo);
          console.log("Email for one hour before sent successfully");
        });
      } catch (error) {
        console.error("Error sending email:", error);
      }
    });
    cron.schedule(cronExpressionTwoMinutesBefore, async () => {
      try {
        // looping through emails
        inviteEmails.map(async (mail: string) => {
          await sendEmail(
            mail,
            "two minutes",
            title,
            date,
            time,
            additionalInfo
          );
          console.log("Email for two minutes before sent successfully");
        });
      } catch (error) {
        console.error("Error sending email:", error);
      }
    });
    const event = await EventModel.findOne({ _id: createdEvent.id }, "-__v");
    return res.status(201).send({
      success: true,
      message: "Event created successfully",
      event: event,
    });
  }

  async getEvents(req: Request, res: Response) {
    try {
      const events = await EventModel.find(
        { email: req.query.email },
        "-__v"
      ).sort({ time: 1 });

      return res.status(200).send({
        success: true,
        message: "Events fetched successfully",
        events: events,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).send({
        success: false,
        message: "Internal server error",
      });
    }
  }
}
