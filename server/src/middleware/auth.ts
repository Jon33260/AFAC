import argon2 from "argon2";
import type { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import userRepository from "../modules/user/userRepository";

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 19 * 2 ** 10,
  timeCost: 2,
  parallelism: 1,
};

const hashPassword: RequestHandler = async (req, res, next) => {
  try {
    const { password } = req.body;

    const hashedPassword = await argon2.hash(password, hashingOptions);

    req.body.hashed_password = hashedPassword;

    req.body.password = undefined;

    next();
  } catch (err) {
    next(err);
  }
};

const login: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userRepository.readByEmailWithPassword(email);

    if (!user) {
      res.status(422).json({ message: "Email incorrect" });
    }

    const verified = await argon2.verify(user.hashed_password, password);

    if (!verified) {
      res.status(422).json({ message: "Mot de passe incorrect" });
    } else {
      // JWT
      const payload = {
        id: user.id,
        email: user.email,
      };

      if (!process.env.APP_SECRET) {
        throw new Error(
          "Vous n'avez pas configuré votre APP SECRET dans le .env",
        );
      }

      const token = await jwt.sign(payload, process.env.APP_SECRET, {
        expiresIn: "1y",
      });

      res.cookie("auth", token).send("Utilisateur connecté");
    }
  } catch (error) {
    next(error);
  }
};

const verify: RequestHandler = async (req, res, next) => {
  if (!process.env.APP_SECRET) {
    throw new Error("Vous n'avez pas configuré votre APP SECRET dans le .env");
  }

  try {
    const { auth } = req.cookies;

    if (!auth) {
      res.sendStatus(403);
    }

    const resultPayload = jwt.verify(auth, process.env.APP_SECRET);

    if (typeof resultPayload !== "object") {
      throw new Error("Token invalid");
    }

    req.user = {
      id: resultPayload.id,
      email: resultPayload.email,
    };

    next();
  } catch (error) {
    next(error);
  }
};

export default { hashPassword, login, verify };
