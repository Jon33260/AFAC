import databaseClient from "../../../../database/client";

import type { Result, Rows } from "../../../../database/client";

type User = {
  id: number;
  username: string;
  email: string;
  password: string;
  profile_picture?: string;
  bio?: string;
};

class UsersRepository {
  async create(user: Omit<User, "id">) {
    const [result] = await databaseClient.query<Result>(
      "insert into users (username, email, password) values (?, ?, ?)",
      [user.username, user.email, user.password],
    );

    return result.insertId;
  }

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      "select * from users where id = ?",
      [id],
    );

    return rows[0] as User;
  }

  async readAll() {
    const [rows] = await databaseClient.query<Rows>("select * from users");

    return rows as User[];
  }

  async update(user: User) {
    const [result] = await databaseClient.query<Result>(
      "update users set username = ?, email = ?, password = ?, bio = ?, profile_picture = ? where id = ?",
      [
        user.username,
        user.email,
        user.password,
        user.profile_picture,
        user.bio,
        user.id,
      ],
    );
    return result.affectedRows;
  }

  async delete(id: number) {
    const [result] = await databaseClient.query<Result>(
      "delete from users where id = ?",
      [id],
    );
    return result.affectedRows;
  }
}

export default new UsersRepository();
