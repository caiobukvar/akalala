{/* IMAGES */ }
import goldenstar from '../assets/images/golden-star.svg';
import botaoMenos from '../assets/images/minus-icon.svg';
import botaoMais from '../assets/images/plus-icon.svg';




function Card(Movie) {
    return (
        <div className="card-wrapper" style={{
            backgroundImage: `url(${Movie.poster_path})`
        }}>
            <div className="card-info">
                <div className="card-texto">
                    {Movie.title}
                </div>
                <div className="card-nota">
                    <img src={goldenstar} alt="goldenstar" />
                    <p>{Movie.vote_average}</p>
                </div>
            </div>
            <button onClick={() => Movie.addCarrinho(Movie.title)} className="button-carrinho">
                <p>Sacola</p>
                <p>R${Movie.price.toFixed(2)}</p>
            </button>
        </div >
    )
}

export default Card;


