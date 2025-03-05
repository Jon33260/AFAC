import argon2 from "argon2";
import type { RequestHandler } from "express";
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
      // JWT ?
      res.json({
        user: { id: user.id, email: user.email, username: user.username },
      });
    }
  } catch (err) {
    next(err);
  }
};

export default { hashPassword, login };
