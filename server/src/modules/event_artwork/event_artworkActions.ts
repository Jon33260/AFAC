import type { RequestHandler } from "express";

import eventArtworkRepository from "./event_artworkRepository";

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

    await eventArtworkRepository.deleteByEventId(eventArtworkId);

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

export default { add, destroy };
