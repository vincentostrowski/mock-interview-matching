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
    <div>
      <h1>Login with Discord</h1>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default DiscordLogin;
