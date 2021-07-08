import goldenstar from '../../assets/images/golden-star.svg';

function Card({ allowBuy, poster_path, title, addCarrinho, vote_average, price }) {
  return (
    <div className="card-wrapper" style={{
      backgroundImage: `url(${poster_path})`
    }}>
      <div className="card-info">
        <div className="card-texto">
          {title}
        </div>
        <div className="card-nota">
          <img src={goldenstar} alt="goldenstar" />
          <p>{vote_average}</p>
        </div>
      </div>
      {allowBuy &&
        <button onClick={() => addCarrinho(title)} className="button-carrinho">
          <p>Sacola</p>
          <p>R${price.toFixed(2)}</p>
        </button>
      }
    </div >
  )
}

export default Card;


