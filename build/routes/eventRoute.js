"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const event_controller_1 = __importDefault(require("../controllers/event.controller"));
const router = (0, express_1.Router)();
const { createEvent, getEvents } = new event_controller_1.default();
//create an event
router.post("/", createEvent);
//get all events
router.get("/", getEvents);
exports.default = router;
//# sourceMappingURL=eventRoute.js.map