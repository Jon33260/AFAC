import type { RequestHandler } from "express";
import likeRepository from "./likeRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const likes = await likeRepository.readAll();
    res.json(likes);
  } catch (err) {
    next(err);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const artwork_id = Number(req.params.id);
    const user_id = req.user.id;

    if (!artwork_id) {
      res.status(400).json({ error: "artwork_id is required" });
    }

    await likeRepository.create(user_id, artwork_id);
    res.status(201).json({ message: "Like added successfully." });
  } catch (err) {
    next(err);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const likeData = {
      user_id: req.user.id,
      artwork_id: Number(req.params.id),
    };
    await likeRepository.delete(likeData);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
export default { browse, add, destroy };
