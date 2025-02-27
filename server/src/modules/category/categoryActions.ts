import type { RequestHandler } from "express";

import categoryRepository from "./categoryRepository";

const browse: RequestHandler = async (req, res, next) => {
  try {
    const category = await categoryRepository.readAll();

    res.json(category);
  } catch (err) {
    next(err);
  }
};

export default { browse };
