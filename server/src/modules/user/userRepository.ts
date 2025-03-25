import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type User = {
  id: number;
  username: string;
  email: string;
  hashed_password: string;
  picture?: string;
  bio?: string;
  portfolio?: string | null;
  website?: string | null;
  is_admin: boolean;
};

class UserRepository {
  async create(user: Omit<User, "id">) {
    const [result] = await databaseClient.query<Result>(
      "insert into user (username, email, hashed_password, is_admin) values (?, ?, ?, ?)",
      [user.username, user.email, user.hashed_password, user.is_admin],
    );

    return result.insertId;
  }

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "select * from user where id = ?",
      [id],
    );

    return rows[0] as User;
  }

  async readByEmailWithPassword(email: string) {
    const [rows] = await databaseClient.query<Rows>(
      "select * from user where email = ?",
      [email],
    );
    return rows[0] as User;
  }

  async readAll() {
    const [rows] = await databaseClient.query<Rows>("select * from user");

    return rows as User[];
  }

  async update(user: Omit<User, "email" | "hashed_password" | "is_admin">) {
    const [result] = await databaseClient.query<Result>(
      "update user set username = ?, bio = ?, picture = ?, portfolio = ?, website = ? where id = ?",
      [
        user.username,
        user.bio,
        user.picture,
        user.portfolio,
        user.website,
        user.id,
      ],
    );
    return result.affectedRows;
  }

  async delete(id: number) {
    const [result] = await databaseClient.query<Result>(
      "delete from user where id = ?",
      [id],
    );
    return result.affectedRows;
  }
}

export default new UserRepository();
