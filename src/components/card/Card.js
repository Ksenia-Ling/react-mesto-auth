function Card({ card, onCardClick }) {

    function handleClick() {
        onCardClick(card);
    }

    return (
        <li className="cards__element">
            <img
                className="cards__image"
                src={card.link}
                alt={card.name}
                onClick={handleClick}
            />
            <button
                className="cards__remove-button"
                type="button" >
            </button>
            <div className="cards__description">
                <h2 className="cards__heading">{card.name}</h2>
                <div className="cards__likes-container">
                    <button className="cards__like-button" type="button">
                    </button>
                    <p className="cards__like-counter">{card.likes.length}</p>
                </div>
            </div>
        </li>
    )
}

export default Card;