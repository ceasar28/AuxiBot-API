import { Request, Response } from "express";
import EventModel from "../models/event.model";

export default class EventController {
    async createEvent(req: Request, res: Response) {
        const createdEvent = await EventModel.create(req.body);
        const event = await EventModel.findOne({ _id: createdEvent.id}, "-__v");
        return res.status(201)
        .send({
            success: true,
            message: "Event created successfully",
            event: event
        });
    }

    async getEvents(req: Request, res: Response) {
        const events = await EventModel.find({email: req.query.email}, "-__v");
        return res.status(201)
        .send({
            success: true,
            message: "Events fetched successfully",
            event: events
        });
    }
}