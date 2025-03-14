import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Artwork = {
  id: number;
  title: string;
  description?: string;
  picture: string;
  category_id: number;
  user_id: number;
};

class ArtworkRepository {
  async create(artwork: Omit<Artwork, "id">) {
    const [result] = await databaseClient.query<Result>(
      "insert into artwork (title, picture, category_id, description, user_id) values (?, ?, ?, ?, ?)",
      [
        artwork.title,
        artwork.picture,
        artwork.category_id,
        artwork.description,
        artwork.user_id,
      ],
    );

    return result.insertId;
  }

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      `
      SELECT
        artwork.*,
        category.name AS category,
        user.username AS username,
        COUNT(likes.artwork_id) AS likeCount
      FROM
        artwork
        JOIN category ON artwork.category_id = category.id
        JOIN user ON artwork.user_id = user.id
        JOIN likes ON artwork.id = likes.artwork_id
      WHERE
        artwork.id = ?
      `,
      [id],
    );

    return rows[0] as Artwork;
  }

  async readAll() {
    const [rows] = await databaseClient.query<Rows>(
      "select artwork.*, category.name as category, user.username as username from artwork join category on artwork.category_id = category.id JOIN user ON artwork.user_id = user.id ORDER BY artwork.created_at DESC",
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

  async update(artwork: Partial<Artwork>) {
    const [result] = await databaseClient.query<Result>(
      "update artwork set title = ?, description = ?, category_id = ? where id = ?",
      [artwork.title, artwork.description, artwork.category_id, artwork.id],
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
      "SELECT artwork.picture, artwork.description, artwork.id FROM artwork JOIN `user` ON `user`.id = artwork.user_id WHERE user_id=?",
      [id],
    );
    return rows;
  }
}

export default new ArtworkRepository();
