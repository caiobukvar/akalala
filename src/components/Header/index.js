import { useState } from 'react';
import logo from '../../assets/images/logo.svg';
import searchIcon from '../../assets/images/search-icon.svg';

function Header({ moviesData }) {

  const [searchText, setSearchText] = useState("");
  const [suggestionList, setSuggestionList] = useState([]);

  const handleChange = event => {
    setSearchText(event.target.value);

    const filteredMovies = moviesData.filter((movie) =>
      movie.title.toLowerCase().includes(searchText.toLowerCase())
    );

    if (filteredMovies) {
      setSuggestionList(filteredMovies);
    };
  };

  return (
    <header>
      <div className="filterHeader">
        <img src={logo} alt="Logo" />
        <div className="inputHeader">
          <input
            id="input1"
            type="text"
            placeholder="Procure um filme..."
            onChange={(event) => handleChange(event)}
            onBlur={() => setSuggestionList(null)} />
          {suggestionList && (
            <ul>
              {
                suggestionList.map((movie) =>
                  <li key={movie.id}>
                    <img src={movie.poster_path} alt="Capa" />
                    {movie.title}
                  </li>
                )
              }
            </ul>
          )}
          <button> <img src={searchIcon} alt="lupinha" /> </button>
        </div>
      </div>
      <div className="profile">
        <p>Bem vindo, Borba! </p>
        <img alt="Profile Pic" />
      </div>
    </header>
  );
}


export default Header;