class SpoitifyClient {
  static async initilaize() {
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

    let spotify = new SpoitifyClient();
    spotify.token = data.access_token;
    return spotify;
  }
}

const spotify = await SpoitifyClient.initilaize();
export default spotify;
