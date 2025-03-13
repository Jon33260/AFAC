import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type EventArtwork = {
  id: number;
  event_id: number;
  artwork_id: number;
};

class EventArtworkRepository {
  async create(eventArtwork: Omit<EventArtwork, "id">) {
    const [result] = await databaseClient.query<Result>(
      "insert into event_artwork (event_id, artwork_id) values (?, ?)",
      [eventArtwork.event_id, eventArtwork.artwork_id],
    );

    return result.insertId;
  }

  async deleteByEventId(eventId: number) {
    const [result] = await databaseClient.query<Result>(
      "delete from event_artwork where event_id = ?",
      [eventId],
    );

    return result.affectedRows;
  }
}

export default new EventArtworkRepository();
