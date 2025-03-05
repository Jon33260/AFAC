import type { RequestHandler } from "express";

import userRepository from "../user/userRepository";
import artworkRepository from "./artworkRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const artworks = await artworkRepository.readAll();

    res.json(artworks);
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const artworkId = Number(req.params.id);
    const artwork = await artworkRepository.read(artworkId);

    if (artwork == null) {
      res.sendStatus(404);
    } else {
      res.json(artwork);
    }
  } catch (err) {
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const artwork = {
      id: req.body.id,
      title: req.body.title,
      description: req.body.description,
      picture: req.body.picture,
      category: req.body.category,
      user_id: req.body.user_id,
    };

    const affectedRows = await artworkRepository.update(artwork);

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
    const artwork = {
      id: req.body.id,
      title: req.body.title,
      description: req.body.description,
      picture: req.body.picture,
      category: req.body.category,
      user_id: req.body.user_id,
    };

    const insertId = await artworkRepository.create(artwork);

    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const artworkId = Number.parseInt(req.params.id);

    await artworkRepository.delete(artworkId);

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

const readByUserId: RequestHandler = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const user = await userRepository.read(id);
    const artworks = await artworkRepository.readByUserId(id);
    res.json({ user: user, artworks: artworks });
  } catch (error) {
    next(error);
  }
};

export default { browse, read, edit, add, destroy, readByUserId };
