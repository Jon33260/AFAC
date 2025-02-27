import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Category = {
  id: number;
  name: string;
};

class CategoryRepository {
  async create(category: Omit<Category, "id">) {
    const [result] = await databaseClient.query<Result>(
      "insert into category (name) values (?)",
      [category.name],
    );

    return result.insertId;
  }

  async readAll() {
    const [rows] = await databaseClient.query<Rows>("select * from category");

    return rows as Category[];
  }
}

export default new CategoryRepository();
