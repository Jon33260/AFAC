import type { RequestHandler } from "express";
import followRepository from "./followRepository";

const follow: RequestHandler = async (req, res, next) => {
  try {
    const { following_id } = req.body;
    const follower_id = req.user.id;

    if (!follower_id) {
      res.status(401).json({ message: "User must be logged in" });
      return;
    }

    if (!following_id) {
      res.status(400).json({ message: "Missing following_id" });
      return;
    }

    if (follower_id === following_id) {
      res.status(400).json({ message: "You cannot follow yourself." });
      return;
    }

    const insertId = await followRepository.create(follower_id, following_id);

    res.status(201).json({ insertId });
  } catch (err) {
    console.error("Erreur backend détaillée:", err);
    if (err instanceof Error) {
      console.error("Message d'erreur:", err.message);
    }
    next(err);
  }
};

const unfollow: RequestHandler = async (req, res, next) => {
  try {
    const { following_id } = req.body;
    const follower_id = req.user.id;

    const affectedRows = await followRepository.delete(
      follower_id,
      following_id,
    );

    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    next(err);
  }
};

const checkFollow: RequestHandler = async (req, res, next) => {
  try {
    const { following_id } = req.params;
    const follower_id = req.user.id;

    const follow = await followRepository.checkFollow(
      follower_id,
      Number(following_id),
    );

    res.json({ isFollowing: !!follow });
  } catch (err) {
    next(err);
  }
};

export default { follow, unfollow, checkFollow };
