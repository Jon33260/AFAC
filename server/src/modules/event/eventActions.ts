import type { RequestHandler } from "express";

import event_artworkRepository from "../event_artwork/event_artworkRepository";
import eventRepository from "./eventRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const events = await eventRepository.readAll();

    res.json(events);
  } catch (err) {
    next(err);
  }
};

const browseCurrent: RequestHandler = async (req, res, next) => {
  try {
    const events = await eventRepository.readCurrentEvents();
    res.json(events);
  } catch (err) {
    next(err);
  }
};

const browseUpcoming: RequestHandler = async (req, res, next) => {
  try {
    const events = await eventRepository.readUpcomingEvents();
    res.json(events);
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const eventId = Number(req.params.id);
    const event = await eventRepository.read(eventId);

    if (event == null) {
      res.sendStatus(404);
    } else {
      res.json(event);
    }
  } catch (err) {
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const event = {
      id: req.body.id,
      title: req.body.title,
      description: req.body.description,
      start_date: req.body.start_date,
      end_date: req.body.end_date,
      location: req.body.location,
    };

    const affectedRows = await eventRepository.update(event);

    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (error) {
    next(error);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const event = {
      title: req.body.title,
      description: req.body.description,
      start_date: req.body.start_date,
      end_date: req.body.end_date,
      location: req.body.location,
    };

    const insertId = await eventRepository.create(event);

    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const eventId = Number.parseInt(req.params.id);

    await eventRepository.delete(eventId);
    await event_artworkRepository.deleteByEventId(eventId);

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

export default {
  browse,
  browseCurrent,
  browseUpcoming,
  read,
  edit,
  add,
  destroy,
};
