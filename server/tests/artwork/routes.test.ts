// Import the supertest library for making HTTP requests
import supertest from "supertest";

// Import the Express application
import app from "../../src/app";

// Import databaseClient
import databaseClient from "../../database/client";

import type { Rows } from "../../database/client";

afterEach(() => {
  jest.restoreAllMocks();
});

describe("GET /api/artworks", () => {
  it("should fetch artworks successfully", async () => {
    // Mock empty rows returned from the database
    const mockArtworks = {} as Rows;
    // const rows = [] as Rows;

    // Mock the implementation of the database query method
    jest
      .spyOn(databaseClient, "query")
      .mockImplementation(async () => [mockArtworks, []]);

    // Send a GET request to the /api/items endpoint
    const response = await supertest(app).get("/api/artworks");

    // Assertions
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual(mockArtworks);
  });
});

// Test suite for the GET /api/items/:id route
describe("GET /api/artworks/:id", () => {
  it("should fetch a single artwork successfully", async () => {
    // Mock rows returned from the database
    const rows = [{}] as Rows;

    // Mock the implementation of the database query method
    jest
      .spyOn(databaseClient, "query")
      .mockImplementation(async () => [rows, []]);

    // Send a GET request to the /api/items/:id endpoint
    const response = await supertest(app).get("/api/artworks/1");

    // Assertions
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual(rows[0]);
  });

  it("should fail on invalid id", async () => {
    // Mock empty rows returned from the database
    const rows = [] as Rows;

    // Mock the implementation of the database query method
    jest
      .spyOn(databaseClient, "query")
      .mockImplementation(async () => [rows, []]);

    // Send a GET request to the /api/items/:id endpoint with an invalid ID
    const response = await supertest(app).get("/api/artworks/0");

    // Assertions
    expect(response.status).toBe(404);
    expect(response.body).toEqual({});
  });
});
