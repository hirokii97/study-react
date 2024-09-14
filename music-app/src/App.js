import { useEffect, useRef, useState } from "react";
import { SongList } from "./components/songList";
import spotify from "./lib/spotify";
import { Player } from "./components/player";
import { SearchInput } from "./components/search";
import { Pagination } from "./components/pagination";

export default function App() {
  const [isLoading, setIsloading] = useState(false);
  const [songs, setSongs] = useState([]);
  const [isPlay, setIsPlay] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);
  const [isSearched, setIsSearched] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 20;

  const audioRef = useRef();

  useEffect(() => {
    fetchPopularSong();
  }, []);

  const fetchPopularSong = async () => {
    setIsloading(true);
    const result = await spotify.getPopularSong();
    const popularSongs = result.items.map((item) => item.track);
    console.log(popularSongs);
    setSongs(popularSongs);
    setIsloading(false);
  };

  const fetchSearchSongs = async (keyword, page) => {
    const offset = Number(page) ? Number(page - 1) * limit : null;
    setIsloading(true);
    if (keyword === "") {
      fetchPopularSong();
      setIsSearched(false);
      return;
    } else {
      const result = await spotify.searchSongs(keyword, limit, offset);
      console.log(result);
      setSongs(result);
      setIsSearched(true);
    }
    setIsloading(false);
  };
  const handleSongSelected = (song) => {
    setSelectedSong(song);
    if (song.preview_url != null) {
      audioRef.current.src = song.preview_url;
      playSong();
    } else {
      pauseSong();
    }
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
        <SearchInput fetchSearchSongs={fetchSearchSongs} page={page} />
        <section>
          <h2 className="text-2xl font-semibold mb-5">
            {isSearched ? "Searched Songs" : "Popular Songs"}
          </h2>
          <SongList
            songs={songs}
            isLoading={isLoading}
            handleSongSelected={handleSongSelected}
          />
          {isSearched ? <Pagination page={page} setPage={setPage} /> : ""}
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
