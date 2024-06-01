import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import React from "react";

function App() {
  const [characters, setCharacter] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const limit = 15;

  useEffect(() => {
    fetchCharacters();
  }, []);
  const fetchCharacters = async (page) => {
    setIsLoading(true);
    const apiUrl = "https://narutodb.xyz/api/character";
    const result = await axios.get(apiUrl, { params: { page, limit } });
    setCharacter(result.data.characters);
    setIsLoading(false);
  };
  const handleClickPageMinus = () => {
    const beforePage = page - 1;
    fetchCharacters(beforePage);
    setPage(beforePage);
  };
  const handleClickPagePlus = () => {
    const nextPage = page + 1;
    fetchCharacters(nextPage);
    setPage(nextPage);
  };
  return (
    <div className="container">
      {isLoading ? (
        <div>Now Loading...</div>
      ) : (
        <main>
          <div className="cards-container">
            {characters.map((character) => {
              return (
                <div className="card" key={character.id}>
                  <img src={character.images[0] != null ? character.images[0] : "dummy.png"} alt="" className="card-image" />
                  <div className="card-content">
                    <h3 className="card-title">{character.name}</h3>
                    <div className="card-description">{character.debut?.appearsIn ?? "なし"}</div>
                    <div className="card-footer">
                      <span className="affiliation">{character.personal?.affiliation ?? "なし"}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="pager">
            <button className="prev" disabled={page === 1} onClick={handleClickPageMinus}>
              Previous
            </button>
            <span className="page-number">{page}</span>
            <button className="next" disabled={limit > characters.length} onClick={handleClickPagePlus}>
              Next
            </button>
          </div>
        </main>
      )}
    </div>
  );
}

export default App;
