import { Request, Response } from "express";
import EventModel from "../models/event.model";
import schedule from 'node-schedule';
import * as yup from "yup"
import sendEmail from "../utils/sendEmails.utils";

export default class EventController {
    async createEvent(req: Request, res: Response) {
        const eventSchema = yup.object().shape({
            title: yup.string().required('Title is required').trim(),
            email: yup.string().email('Invalid email format').required('Email is required').lowercase().trim(),
            inviteEmails: yup.array().of(yup.string().email('Invalid email format')).required('Invite emails are required'),
            additionalInfo: yup.string().trim(),
            date: yup.string().required('Date is required').matches(/^\d{4} - \d{2} - \d{2}$/),
            time: yup.string().required('Time is required').matches(/^\d{2}:\d{2}$/)
        });
        if (!req.body || typeof req.body !== 'object') {
            return res.status(400).send({
                success: false,
                message: 'Invalid request body',
            });
        }
        try{ 
            await eventSchema.validate(req.body, {
                abortEarly: false
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
        const dateParts = req.body.date.split(' - ');
        const formattedDate = `${dateParts[0]}-${dateParts[1]}-${dateParts[2]}`;
        const dateTime = new Date(`${formattedDate}T${req.body.time}:00.000Z`);
        const {email, title, date, time} = req.body;
        req.body.time = dateTime;
        const createdEvent = await EventModel.create(req.body);

        const emailJob1 = schedule.scheduleJob((dateTime.getTime() - 86400000), async function () {
            try {
                await sendEmail(email, "a day", title, date, time);
                console.log('Email for one day before sent successfully');
            } catch (error) {
                console.error('Error sending email:', error);
            }
        });    
        const emailJob2 = schedule.scheduleJob((dateTime.getTime() - 3600000), async function () {
            try {
                await sendEmail(email, "one hour", title, date, time);
                console.log('Email for one hour before sent successfully');
            } catch (error) {
                console.error('Error sending email:', error);
            }
        });    
        const event = await EventModel.findOne({ _id: createdEvent.id}, "-__v");
        return res.status(201)
        .send({
            success: true,
            message: "Event created successfully",
            event: event
        });
    }

    async getEvents(req: Request, res: Response) {
        try {
            const events = await EventModel.find({ email: req.query.email }, "-__v").sort({ time: 1 });
    
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