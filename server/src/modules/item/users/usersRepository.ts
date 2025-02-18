import databaseClient from "../../../../database/client";

import type { Result, Rows } from "../../../../database/client";

type Users = {
  id: number;
  username: string;
  email: string;
  password: string;
  profile_picture?: string;
  bio?: string;
};

class UsersRepository {
  async create(user: Omit<Users, "id">) {
    const [result] = await databaseClient.query<Result>(
      "insert into users (username, email, password) values (?, ?, ?)",
      [user.username, user.email, user.password],
    );

    return result.insertId;
  }

  async read(id: number) {
    // Execute the SQL SELECT query to retrieve a specific item by its ID
    const [rows] = await databaseClient.query<Rows>(
      "select * from users where id = ?",
      [id],
    );

    // Return the first row of the result, which represents the item
    return rows[0] as Users;
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all items from the "item" table
    const [rows] = await databaseClient.query<Rows>("select * from users");

    // Return the array of items
    return rows as Users[];
  }

  async update(user: Users) {
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
