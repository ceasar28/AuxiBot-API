import { Router } from "express";
import EventController from "../controllers/event.controller";
const router = Router();
const {
    createEvent,
    getEvents
} = new EventController();

//create an event
router.post("/", createEvent);
//get all events
router.get("/", getEvents);

export default router;