import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

type Like = {
  id: number;
  user_id: number;
  artwork_id: number;
};

class LikeRepository {
  async create(user_id: number, artwork_id: number) {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO likes (user_id, artwork_id) VALUES (?, ?)",
      [user_id, artwork_id],
    );
    return result.insertId;
  }

  async readByCount(artworkId: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT Count(*) FROM likes where artwork_id = ?",
      [artworkId],
    );
    return rows as Like[];
  }

  async delete(likeData: Omit<Like, "id">) {
    const [result] = await databaseClient.query<Result>(
      "DELETE FROM likes WHERE user_id = ? AND artwork_id = ?",
      [likeData.user_id, likeData.artwork_id],
    );
    return result.affectedRows;
  }
}

export default new LikeRepository();
