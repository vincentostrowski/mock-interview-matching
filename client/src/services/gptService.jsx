import axios from "axios";

const API_URL = `${import.meta.env.VITE_SERVER_URL}/gpt`;

const fetchGptResponse = async (prompt) => {
  try {
    const response = await axios.post(API_URL, {
      prompt: prompt, // Send the prompt in the body
    });
    return response.data; // Return the response data
  } catch (error) {
    console.error("Error fetching GPT response:", error);
    throw error;
  }
};

export default { fetchGptResponse };
