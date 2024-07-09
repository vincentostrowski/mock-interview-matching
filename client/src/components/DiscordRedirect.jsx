import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const DiscordRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    //code refers to an authorization code that is passed as a query parameter in the URL
    //This line uses the URLSearchParams API to parse the query parameters from the current URL (window.location.search).
    const code = new URLSearchParams(window.location.search).get("code");

    if (code) {
      let accessToken;
      // Send the code to the backend for token exchange
      axios
        .post(
          `${import.meta.env.VITE_SERVER_URL}/auth/discord/token`,
          new URLSearchParams({
            code,
          })
        )
        .then((response) => {
          accessToken = response.data.access_token;

          // Store the access token
          localStorage.setItem("discordAccessToken", accessToken);

          // Fetch user's guilds to verify membership
          return axios.get("https://discord.com/api/users/@me/guilds", {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
        })
        .then((response) => {
          const guilds = response.data;
          const serverId = `${import.meta.env.VITE_DISCORD_SERVER_ID}`; // Replace with your Discord server's ID
          const isMember = guilds.some((guild) => guild.id === serverId);

          if (isMember) {
            // Fetch user's information to get the user ID
            return axios.get("https://discord.com/api/users/@me", {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            });
          } else {
            throw new Error("User is not a member of the Discord server");
          }
        })
        .then((response) => {
          const user = response.data;
          const discordId = user.id;

          // Store the user ID
          localStorage.setItem("discordId", discordId);

          // Check if the user exists in the database and create if not
          return axios.post(`${import.meta.env.VITE_SERVER_URL}/users`, {
            discordId,
          });
        })
        .then(() => {
          // User is a member of the Discord server and exists in the database, navigate to the protected page
          navigate("/protected");
        })
        .catch((error) => {
          console.error("Error during Discord OAuth2 flow:", error);
          navigate("/error");
        });
    }
  }, [navigate]);

  return (
    <div>
      <h1>Authenticating...</h1>
    </div>
  );
};

export default DiscordRedirect;
