import type { RequestHandler } from "express";

import eventArtworkRepository from "./event_artworkRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const eventArtworks = await eventArtworkRepository.readAll();

    res.json(eventArtworks);
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const eventArtworkId = Number(req.params.id);
    const eventArtwork = await eventArtworkRepository.read(eventArtworkId);

    if (eventArtwork == null) {
      res.sendStatus(404);
    } else {
      res.json(eventArtwork);
    }
  } catch (err) {
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const eventArtwork = {
      id: req.body.id,
      event_id: req.body.event_id,
      artwork_id: req.body.artwork_id,
    };

    const affectedRows = await eventArtworkRepository.update(eventArtwork);

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
    const eventArtwork = {
      event_id: req.body.event_id,
      artwork_id: req.body.artwork_id,
    };

    const insertId = await eventArtworkRepository.create(eventArtwork);

    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const eventArtworkId = Number.parseInt(req.params.id);

    await eventArtworkRepository.delete(eventArtworkId);

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

export default { browse, read, edit, add, destroy };
