import Card from './components/Card';
import './App.css';
import Movies from './data'
import { useState, useEffect } from 'react';

import logo from './assets/images/logo.svg';
import person from './assets/images/person-illustration.svg';
import botaoMenos from './assets/images/minus-icon.svg';
import botaoMais from './assets/images/plus-icon.svg';
import sacolinha from './assets/images/sacolinha.svg';
import searchIcon from './assets/images/search-icon.svg';

function App() {

  const [addFilmeSacola, setAddFilmeSacola] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [suggestionList, setSuggestionList] = useState([]);
  const [valorDoCarrinho, setValorDoCarrinho] = useState([]);

  useEffect(() => {
    const arrayLocal = [...addFilmeSacola];

    if (!arrayLocal.length) {
      return;
    }

    let initialValue = 0;
    const sum = arrayLocal.reduce((accumulator, currentValue) => {
      return accumulator + (currentValue.price * currentValue.quantidade)
    }, initialValue);

    setValorDoCarrinho(sum.toFixed(2));

  }, [addFilmeSacola]);

  const handleChange = event => {
    setSearchText(event.target.value);

    const filteredMovies = Movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchText.toLowerCase())
    );

    if (filteredMovies) {
      setSuggestionList(filteredMovies);
    };
  };


  function AdicionarCard(movieCart) {
    const localArray = [...addFilmeSacola];

    const index = localArray.findIndex(item => item.title === movieCart.title);

    localArray[index].quantidade++;
    setAddFilmeSacola(localArray);
  }


  function RemoverCard(movieCart) {
    const localArray = [...addFilmeSacola];

    const index = localArray.findIndex(item => item.title === movieCart.title);

    if (localArray[index].quantidade <= 1) {
      localArray.splice(index, 1);
    } else {
      localArray[index].quantidade--;
    }
    setAddFilmeSacola(localArray);
  }


  function Sacola(title) {
    const filme = Movies.filter(filme => filme.title === title);

    const indice = addFilmeSacola.indexOf(filme[0]);

    if (indice != -1) {
      addFilmeSacola[indice].quantidade++;

      setAddFilmeSacola([...addFilmeSacola]);
    } else {
      filme[0].quantidade = 1;

      setAddFilmeSacola([...addFilmeSacola, filme[0]]);
    }
  }


  return (
    <div className="App">
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
                      <img src={movie.poster_path} />
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

      <div className="body-wrapper">
        <div className="filmes-body">
          <p>Top Filmes</p>
          <div className="card-topfilmes">
            {Movies.map((Movie, index) => (
              index < 5 &&
              <Card
                key={Movie.id}
                title={Movie.title}
                poster_path={Movie.poster_path}
                vote_average={Movie.vote_average}
                price={Movie.price}
                addCarrinho={Sacola}
              />
            ))}
          </div>

          <p>Filmes</p>
          <div className="card-filmes">
            {Movies.map(Movie => {
              return (
                <Card
                  key={Movie.id}
                  title={Movie.title}
                  poster_path={Movie.poster_path}
                  vote_average={Movie.vote_average}
                  price={Movie.price}
                  addCarrinho={Sacola}
                />
              )
            })}
          </div>
        </div>
        <div className="carrinho">
          <div className="topbar-carrinho">
            <img src={sacolinha} />
            <p>Sacola</p>
          </div>
          <div className="itens-carrinho">
            {addFilmeSacola.length ? (
              <>
                {addFilmeSacola.map((movieCart) => (
                  <>
                    <div className="cards-carrinho" key={movieCart.id}>
                      <div className="cards-carrinho-wrapper">
                        <img src={movieCart.poster_path} />
                        <div className="texto-cards-carrinho">
                          <h4>{movieCart.title}</h4>
                          <p>R$ {movieCart.price.toFixed(2)}</p>
                        </div>
                      </div>
                      <div className="button-cards-carrinho">
                        <button
                          onClick={() => RemoverCard(movieCart)}
                          type="button">
                          <img src={botaoMenos} alt="-" />
                        </button>
                        <p> {movieCart.quantidade}</p>
                        <button
                          onClick={() => AdicionarCard(movieCart)}
                          type="button">
                          <img src={botaoMais} alt="+" />
                        </button>
                      </div>
                    </div>
                  </>
                ))}
                <button className="button-carrinho2">
                  <p>Confirme seus dados</p>
                  <p>R$ {valorDoCarrinho}</p>
                </button>
              </>
            ) :
              <>
                <h3>Sua sacola está vazia</h3>
                <p>Adicione filmes agora</p>
                <img src={person} />
              </>
            }
          </div>
        </div>
      </div >
    </div >
  );
}

export default App;
