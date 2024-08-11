import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function SongList(props) {
  if (props.isLoading)
    return (
      <div className="inset-0 flex justify-center items-center">
        <FontAwesomeIcon icon={faSpinner} spin size="3x" />
      </div>
    );

  return (
    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
      {props.songs.map((song) => {
        return (
          <div className="flex-none cursor-pointer" key={song.track.id}>
            <img
              alt="thumbnail"
              src={
                song.track.album.images[0].url
              }
              className="mb-2 rounded"
            />
            <h3 className="text-lg font-semibold">{song.track.name}</h3>
            <p className="text-gray-400">By {song.track.album.artists[0].name}</p>
          </div>
        );
      })}
    </div>
  );
}
