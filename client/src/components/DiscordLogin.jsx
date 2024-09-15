import TMACC from "../assets/Tmacc.png";

const DiscordLogin = () => {
  const clientId = `${import.meta.env.VITE_DISCORD_CLIENT_ID}`;
  const redirectUri = `${
    import.meta.env.VITE_CLIENT_URL
  }/auth/discord/callback`;
  const authUrl = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=identify%20guilds`;

  const handleLogin = () => {
    window.location.href = authUrl; // Redirect to Discord's OAuth2 flow
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <img src={TMACC} alt="TMACC Logo" className="w-20 h-20" />
      <h1 className="text-3xl font-bold mb-4">Login with Discord</h1>
      <button
        onClick={handleLogin}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Login
      </button>
    </div>
  );
};

export default DiscordLogin;
