import type { RequestHandler } from "express";
import commentRepository from "./commentRepository";

const readByArtwork: RequestHandler = async (req, res, next) => {
  try {
    const artworkId = Number(req.params.id);

    const comments = await commentRepository.readByArtworkId(artworkId);
    res.json(comments);
  } catch (err) {
    next(err);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const artwork_id = Number(req.body.artwork_id);
    const user_id = req.user.id;
    const comment_text = req.body.comment_text;

    if (!artwork_id) {
      res.status(400).json({ error: "artwork_id is required" });
    }

    if (!comment_text) {
      res.status(400).json({ error: "Comment content is required" });
    }

    await commentRepository.create(user_id, artwork_id, comment_text);
    res.status(201).json({ message: "Comment added successfully." });
  } catch (err) {
    next(err);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const commentId = Number(req.params.id);

    const userIdOfComment = Number(req.body.user_id);
    if (Number(req.user.id) === Number(userIdOfComment)) {
      await commentRepository.delete(commentId);

      res.sendStatus(204);
    } else {
      res.sendStatus(403);
    }
  } catch (error) {
    next(error);
  }
};
export default { readByArtwork, add, destroy };
