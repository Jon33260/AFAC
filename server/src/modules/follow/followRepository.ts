import type { Result, Rows } from "../../../database/client";
import databaseClient from "../../../database/client";

type Follow = {
  id: number;
  follower_id: number;
  following_id: number;
  created_at: Date;
};

class FollowRepository {
  async create(follower_id: number, following_id: number) {
    try {
      const [result] = await databaseClient.query<Result>(
        "INSERT INTO follows (follower_id, following_id) VALUES (?, ?)",
        [follower_id, following_id],
      );

      if (result) {
        await databaseClient.query(
          "UPDATE user SET following = following + 1 WHERE id = ?",
          [follower_id],
        );
        await databaseClient.query(
          "UPDATE user SET followers = followers + 1 WHERE id = ?",
          [following_id],
        );
      }
      return result.insertId;
    } catch (error) {
      console.error("Error creating follow relationship:", error);
      throw error;
    }
  }

  async delete(follower_id: number, following_id: number) {
    const [result] = await databaseClient.query<Result>(
      "DELETE FROM follows WHERE follower_id = ? AND following_id = ?",
      [follower_id, following_id],
    );
    if (result.affectedRows > 0) {
      await databaseClient.query(
        "UPDATE user SET following = GREATEST(following - 1, 0) WHERE id = ?",
        [follower_id],
      );
      await databaseClient.query(
        "UPDATE user SET followers = GREATEST(followers - 1, 0) WHERE id = ?",
        [following_id],
      );
    }
    return result.affectedRows;
  }

  async checkFollow(follower_id: number, following_id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT 1 FROM follows WHERE follower_id = ? AND following_id = ?",
      [follower_id, following_id],
    );
    return rows[0] as Follow;
  }

  // async getFollowers(user_id: number) {
  //   const [rows] = await databaseClient.query<Rows>(
  //     "SELECT * FROM follows WHERE following_id = ?",
  //     [user_id],
  //   );
  //   return rows as Follow[];
  // }

  // async getFollowing(user_id: number) {
  //   const [rows] = await databaseClient.query<Rows>(
  //     "SELECT * FROM follows WHERE follower_id = ?",
  //     [user_id],
  //   );
  //   return rows as Follow[];
  // }
}

export default new FollowRepository();
