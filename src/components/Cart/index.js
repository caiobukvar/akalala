
import { useState, useEffect } from 'react';
import person from '../../assets/images/person-illustration.svg';
import botaoMenos from '../../assets/images/minus-icon.svg';
import botaoMais from '../../assets/images/plus-icon.svg';
import sacolinha from '../../assets/images/sacolinha.svg';

function Cart({ addFilmeSacola, setAddFilmeSacola }) {

  function AdicionarCard(movieCart) {
    const localArray = [...addFilmeSacola];

    const index = localArray.findIndex(item => item.title === movieCart.title);

    localArray[index].quantidade++;
    setAddFilmeSacola(localArray);
  }

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


  return (
    <div className="carrinho">
      <div className="topbar-carrinho">
        <img src={sacolinha} alt="sacola" />
        <p>Sacola</p>
      </div>
      <div className="itens-carrinho">
        {addFilmeSacola.length ? (
          <>
            {addFilmeSacola.map((movieCart) => (
              <>
                <div className="cards-carrinho" key={movieCart.id}>
                  <div className="cards-carrinho-wrapper">
                    <img src={movieCart.poster_path} alt="capa" />
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
            <img src={person} alt="perfil" />
          </>
        }
      </div>
    </div>
  );
}

export default Cart;