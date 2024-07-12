import axios from "axios";

const API_URL = `${import.meta.env.VITE_SERVER_URL}/requests`;

const convertToISO8601 = (dayIndex, hourIndex) => {
  // Get today's date
  const today = new Date();

  // Add dayIndex to today's date to get the target date
  const targetDate = new Date(today);
  targetDate.setDate(today.getDate() + dayIndex);

  // Calculate the hour (starting from 6 AM, so add hourIndex to 6)
  const targetHour = 6 + hourIndex;

  // Set the time of targetDate to the calculated hour, with minutes and seconds as 00
  targetDate.setHours(targetHour, 0, 0, 0);

  // Convert to ISO 8601 format
  const isoString = targetDate.toISOString().split(".")[0]; // Remove milliseconds for a cleaner result

  return isoString;
};

const formatDates = (timeSlots) => {
  const formattedSlots = [];

  timeSlots.forEach((slot) => {
    const { day, hour } = JSON.parse(slot);
    const isoString = convertToISO8601(day, hour);
    formattedSlots.push(isoString);
  });

  return formattedSlots;
};

const discordId = localStorage.getItem("discordId");

// Create a new request using the POST method
const createRequest = async (timeSlots, filters) => {
  timeSlots = formatDates(timeSlots);

  if (!discordId) {
    throw new Error("Discord ID not found in local storage");
  }

  try {
    // Construct the request body
    const requestBody = {
      timeSlots, // Array of selected time slots
      topic: filters.topic, // The selected topic filter
      type: filters.type, // The selected guided vs. non-guided filter
      ease: filters.ease, // The selected difficulty level filter
      user: discordId,
    };

    // Make the POST request to the API
    const response = await axios.post(`${API_URL}`, requestBody);

    // Return the response data (optional, handle as per your needs)
    return response.data;
  } catch (error) {
    console.error("Error creating request:", error);
    throw error;
  }
};

const viewMatches = async (timeSlots, filters) => {
  timeSlots = formatDates(timeSlots);
  try {
    if (!discordId) {
      throw new Error("Discord ID not found in local storage");
    }
    // Construct the request body
    const requestBody = {
      timeSlots, // Array of selected time slots
      topic: filters.topic, // The selected topic filter
      type: filters.type, // The selected guided vs. non-guided filter
      ease: filters.ease, // The selected difficulty level filter
      user: discordId,
    };

    // Make the POST request to the API
    const response = await axios.post(`${API_URL}/view_matches`, requestBody);

    // Return the response data (optional, handle as per your needs)
    return response.data;
  } catch (error) {
    console.error("Error creating request:", error);
    throw error;
  }
};

const handleMatch = async (matchId, matchUserDiscordId) => {
  try {
    if (!discordId) {
      throw new Error("Discord ID not found in local storage");
    }

    const requestBody = {
      requestId: matchId,
      user1DiscordId: discordId,
      user2DiscordId: matchUserDiscordId,
    };

    console.log(requestBody);

    const response = await axios.post(`${API_URL}/handle_match`, requestBody);

    return response.data;
  } catch (error) {
    console.error("Error handling match:", error);
    throw error;
  }
};

export default {
  createRequest,
  viewMatches,
  handleMatch,
};
