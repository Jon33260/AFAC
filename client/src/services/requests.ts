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

const getUserById = async (id: number) => {
  try {
    const response = await axios.get(`${baseUrl}/api/user/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch users");
  }
};

export { getAllArtwork, getUserById };
