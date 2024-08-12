import { useEffect, useRef, useState } from "react";
import { SongList } from "./components/songList";
import spotify from "./lib/spotify";
import { Player } from "./components/player";

export default function App() {
  const [isLoading, setIsloading] = useState(false);
  const [songs, setSongs] = useState([]);
  const [isPlay, setIsPlay] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);

  const audioRef = useRef();

  useEffect(() => {
    fetchPopularSong();
  }, []);

  const fetchPopularSong = async () => {
    setIsloading(true);
    const result = await spotify.getPopularSong();
    const popularSongs = result.items.map((item) => item.track);
    setSongs(popularSongs);
    setIsloading(false);
  };

  const handleSongSelected = (song) => {
    setSelectedSong(song);
    audioRef.current.src = song.preview_url;
    playSong();
  };

  const playSong = () => {
    audioRef.current.play();
    setIsPlay(true);
  };
  const pauseSong = () => {
    audioRef.current.pause();
    setIsPlay(false);
  };
  const togglePlaySong = () => {
    isPlay ? pauseSong() : playSong();
  };
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <main className="flex-1 p-8 mb-20">
        <header className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold">Music App</h1>
        </header>
        <section>
          <h2 className="text-2xl font-semibold mb-5">Popular Songs</h2>
          <SongList
            songs={songs}
            isLoading={isLoading}
            handleSongSelected={handleSongSelected}
          />
        </section>
      </main>
      {selectedSong != null && (
        <Player
          isPlay={isPlay}
          song={selectedSong}
          togglePlaySong={togglePlaySong}
        />
      )}
      <audio ref={audioRef} />
    </div>
  );
}
