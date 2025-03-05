import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL;

const getAllArtwork = async () => {
  try {
    const response = await axios.get(`${baseUrl}/api/artworks`);

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch artworks");
  }
};

const getArtworkById = async (id: number) => {
  try {
    const response = await axios.get(`${baseUrl}/api/artworks/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch artwork");
  }
};

const getUserById = async (id: number) => {
  try {
    const response = await axios.get(`${baseUrl}/api/users/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch users");
  }
};

const postCreateUser = async (userData: UserTypes) => {
  try {
    const response = await axios.post(`${baseUrl}/api/users`, userData);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create user");
  }
};

const getCurrentEvents = async () => {
  try {
    const response = await axios.get(`${baseUrl}/api/events/current`);

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch current events");
  }
};

const getUpcomingEvents = async () => {
  try {
    const response = await axios.get(`${baseUrl}/api/events/upcoming`);

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch upcoming events");
  }
};

const postLogin = async (credentials: CredentialsTypes) => {
  try {
    const response = await axios.post(`${baseUrl}/api/login`, credentials, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error();
  }
};

export {
  getAllArtwork,
  postCreateUser,
  getUserById,
  getCurrentEvents,
  getUpcomingEvents,
  getArtworkById,
  postLogin,
};
