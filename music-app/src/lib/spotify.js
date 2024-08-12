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

  async getPopularSong() {
    const urlOfPopularSong =
      "https://api.spotify.com/v1/playlists/37i9dQZF1DX9vYRBO9gjDe";
    const response = await fetch(urlOfPopularSong, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + this.token,
      },
    });
    const data = await response.json();

    return data.tracks;
  }
}

const spotify = await SpoitifyClient.initilaize();
export default spotify;
