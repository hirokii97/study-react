import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

export function SearchInput(props) {
  const { page, fetchSearchSongs } = props;
  useEffect(() => {
    fetchSearchSongs(searchWord, page);
    // eslint-disable-next-line
  }, [page]);
  const [searchWord, setSearchWord] = useState("");

  return (
    <section className="mb-10">
      <input
        className="bg-gray-700 w-1/3 p-2 rounded-l-lg focus:outline-none"
        placeholder="探したい曲を入力してください"
        value={searchWord}
        onChange={(e) => setSearchWord(e.target.value)}
      />
      <button
        onClick={() => fetchSearchSongs(searchWord, page)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-lg"
      >
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </section>
  );
}
