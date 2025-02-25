import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Event = {
  id: number;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  location: string;
};

class EventRepository {
  async create(event: Omit<Event, "id">) {
    const [result] = await databaseClient.query<Result>(
      "insert into event (title, description, start_date, end_date, location) values (?, ?, ?, ?, ?)",
      [
        event.title,
        event.description,
        event.start_date,
        event.end_date,
        event.location,
      ],
    );

    return result.insertId;
  }

  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT 
        e.id as event_id,
        e.title as event_title,
        e.description as event_description,
        e.start_date,
        e.end_date,
        e.location,
        a.id as artwork_id,
        a.title as artwork_title,
        a.description as artwork_description,
        a.picture,
        a.category,
        u.username as artist_name
      FROM Event e
      LEFT JOIN Event_artwork ea ON e.id = ea.event_id 
      LEFT JOIN artwork a ON ea.artwork_id = a.id
      LEFT JOIN user u ON a.user_id = u.id
      WHERE e.id = ?`,
      [id],
    );

    return rows as Event[];
  }

  async readAll() {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT 
        e.id as event_id,
        e.title as event_title,
        e.description as event_description,
        e.start_date,
        e.end_date,
        e.location,
        a.id as artwork_id,
        a.title as artwork_title,
        a.description as artwork_description,
        a.picture,
        a.category,
        u.username as artist_name
      FROM Event e
      LEFT JOIN Event_artwork ea ON e.id = ea.event_id 
      LEFT JOIN artwork a ON ea.artwork_id = a.id
      LEFT JOIN user u ON a.user_id = u.id`,
    );

    return rows as Event[];
  }

  async update(event: Event) {
    const [result] = await databaseClient.query<Result>(
      "update event set title = ?, description = ?, start_date = ?, end_date = ?, location = ? where id = ?",
      [
        event.title,
        event.description,
        event.start_date,
        event.end_date,
        event.location,
        event.id,
      ],
    );

    return result.affectedRows;
  }

  async delete(id: number) {
    const [result] = await databaseClient.query<Result>(
      "delete from event where id = ?",
      [id],
    );

    return result.affectedRows;
  }
}

export default new EventRepository();
