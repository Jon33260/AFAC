import axios from "axios";

const getAllArtowrk = async () => {
  const response = await axios.get("http://localhost:3310/api/artworks");
  return response.data;
};

export { getAllArtowrk };
