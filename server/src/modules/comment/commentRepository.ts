import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

type Comment = {
  id: number;
  user_id: number;
  artwork_id: number;
};

class CommentRepository {
  async create(user_id: number, artwork_id: number, comment_text: string) {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO comment (user_id, artwork_id, comment_text) VALUES (?, ?, ?)",
      [user_id, artwork_id, comment_text],
    );
    return result.insertId;
  }

  async readByArtworkId(artworkId: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT comment.*, user.username AS username, user.profile_picture AS user_picture FROM comment JOIN user ON comment.user_id = user.id WHERE comment.artwork_id = ?",
      [artworkId],
    );
    return rows;
  }

  async delete(commentId: number) {
    const [result] = await databaseClient.query<Result>(
      "DELETE FROM comment WHERE id = ?",
      [commentId],
    );
    return result.affectedRows;
  }
}

export default new CommentRepository();
