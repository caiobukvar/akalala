import { useState } from 'react';
import './App.css';
import Card from './components/Card';
import Header from './components/Header';
import Cart from './components/Cart';
import moviesData from './data';

function App() {

  const [addFilmeSacola, setAddFilmeSacola] = useState([]);

  function Sacola(title) {
    const filme = moviesData.filter(filme => filme.title === title);

    const indice = addFilmeSacola.indexOf(filme[0]);


    if (indice !== -1) {
      addFilmeSacola[indice].quantidade++;

      setAddFilmeSacola([...addFilmeSacola]);
    } else {
      filme[0].quantidade = 1;

      setAddFilmeSacola([...addFilmeSacola, filme[0]]);
    }
  }

  return (
    <div className="App">
      <Header moviesData={moviesData} />
      <div className="body-wrapper">
        <div className="filmes-body">
          <p>Top Filmes</p>
          <div className="card-topfilmes">
            {moviesData.map((movie, index) => (
              index < 5 &&
              <Card
                key={movie.id}
                title={movie.title}
                poster_path={movie.poster_path}
                vote_average={movie.vote_average}
                price={movie.price}
                addCarrinho={Sacola}
                allowBuy={false}
              />
            ))}
          </div>

          <p>Filmes</p>
          <div className="card-filmes">
            {moviesData.map(movie => {
              return (
                <Card
                  key={movie.id}
                  title={movie.title}
                  poster_path={movie.poster_path}
                  vote_average={movie.vote_average}
                  price={movie.price}
                  addCarrinho={Sacola}
                  allowBuy={true}
                />
              )
            })}
          </div>
        </div>
        <Cart addFilmeSacola={addFilmeSacola} setAddFilmeSacola={setAddFilmeSacola} />
      </div >
    </div >
  );
}

export default App;
