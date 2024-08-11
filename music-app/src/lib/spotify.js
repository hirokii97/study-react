export const getSpotifyToken = async () => {
  const url = "https://accounts.spotify.com/api/token";
  const body = new URLSearchParams({
    grant_type: "client_credentials",
    client_id: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
    client_secret: process.env.REACT_APP_SPOTIFY_CLIENT_SECRET,
  });
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body.toString(),
  });
  const data = await response.json();
  console.log(data);
};
