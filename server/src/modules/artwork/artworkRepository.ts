import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Artwork = {
  id: number;
  title: string;
  description?: string;
  picture: string;
  category: string;
  user_id: number;
};

class ArtworkRepository {
  async create(artwork: Omit<Artwork, "id">) {
    const [result] = await databaseClient.query<Result>(
      "insert into artwork (title, picture, category, description, user_id) values (?, ?, ?, ?, ?)",
      [
        artwork.title,
        artwork.picture,
        artwork.category,
        artwork.description,
        artwork.user_id,
      ],
    );

    return result.insertId;
  }

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "select artwork.*, category.name as category, user.username as username from artwork join category on artwork.category_id = category.id JOIN user ON artwork.user_id = user.id where artwork.id = ?",

      [id],
    );

    return rows[0] as Artwork;
  }

  async readAll() {
    const [rows] = await databaseClient.query<Rows>(
      "select artwork.*, category.name as category, user.username as username from artwork join category on artwork.category_id = category.id JOIN user ON artwork.user_id = user.id",
    );

    return rows as Artwork[];
  }

  async readBySearch(search: string) {
    const [rows] = await databaseClient.query<Rows>(
      "select artwork.*, category.name as category, user.username as username from artwork join category on artwork.category_id = category.id JOIN user ON artwork.user_id = user.id WHERE artwork.title LIKE ?",
      [`%${search}%`],
    );
    return rows;
  }

  async update(artwork: Artwork) {
    const [result] = await databaseClient.query<Result>(
      "update artwork set title = ?, picture = ?, category = ?, description = ?, user_id = ? where id = ?",
      [
        artwork.title,
        artwork.picture,
        artwork.category,
        artwork.description,
        artwork.user_id,
        artwork.id,
      ],
    );
    return result.affectedRows;
  }

  async delete(id: number) {
    const [result] = await databaseClient.query<Result>(
      "delete from artwork where id = ?",
      [id],
    );
    return result.affectedRows;
  }

  async readByUserId(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT artwork.picture, artwork.description FROM artwork JOIN `user` ON `user`.id = artwork.user_id WHERE user_id=?",
      [id],
    );
    return rows;
  }
}

export default new ArtworkRepository();
