import type { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import userRepository from "./userRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const users = await userRepository.readAll();

    res.json(users);
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number(req.params.id);
    const user = await userRepository.read(userId);

    if (user == null) {
      res.sendStatus(404);
    } else {
      res.json(user);
    }
  } catch (err) {
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const user = {
      id: req.user.id,
      username: req.body.username,
      profile_picture: req.body.profile_picture || null,
      bio: req.body.bio || null,
      portfolio: req.body.portfolio || null,
      website: req.body.website || null,
    };

    const affectedRows = await userRepository.update(user);

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
    const user = {
      username: req.body.username,
      email: req.body.email,
      hashed_password: req.body.hashed_password,
      is_admin: false,
    };

    const userExist = await userRepository.readByEmailWithPassword(user.email);

    if (userExist) {
      res.status(422).json({ message: "Email déjà utilisé" });
    }

    const insertId = await userRepository.create(user);

    const payload = {
      id: insertId,
      email: user.email,
      is_admin: user.is_admin,
      username: user.username,
    };

    if (!process.env.APP_SECRET) {
      throw new Error(
        "Vous n'avez pas configuré votre APP SECRET dans le .env",
      );
    }

    const token = jwt.sign(payload, process.env.APP_SECRET, {
      expiresIn: "1y",
    });

    res.cookie("auth", token).json({
      message: "Connexion réussie",
      is_admin: payload.is_admin,
      user_id: payload.id,
      username: payload.username,
    });
  } catch (err) {
    next(err);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number.parseInt(req.params.id);

    await userRepository.delete(userId);

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

export default { browse, read, edit, add, destroy };
