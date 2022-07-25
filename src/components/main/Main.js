import React, { useState, useEffect } from 'react';
import { api } from '../../utils/Api.js';
import Card from '../card/Card.js';

function Main({ onEditAvatar, onAddPlace, onEditProfile, onCardClick }) {

    const [userName, setUserName] = useState("");
    const [userDescription, setUserDescription] = useState("");
    const [userAvatar, setUserAvatar] = useState("");
    const [cards, setCards] = useState([]);

    useEffect(() => {
        api.getUserInfo()
            .then((userInfo) => {
                setUserName(userInfo.name);
                setUserDescription(userInfo.about);
                setUserAvatar(userInfo.avatar);
            })
            .catch((err) => {
                console.log(err)
            })

        api.getInitialCards()
            .then((card) => {
                setCards(card)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    return (
        <main className="content">
            <section className="profile">
                
                <div className="profile__avatar-container">
                    <img
                        className="profile__avatar"
                        src={userAvatar}
                        alt="аватар пользователя" />
                    <button
                        className="profile__avatar-overlay"
                        onClick={onEditAvatar} />
                </div>

                <div className="profile__info">
                    <div className="profile__user-edit">
                        <div className="profile__user-data">
                            <h1 className="profile__heading">{userName}</h1>
                            <p className="profile__subheading">{userDescription}</p>
                        </div>
                        <button
                            className="profile__edit-button"
                            type="button"
                            aria-label="Кнопка редактирования профиля"
                            onClick={onEditProfile} />
                    </div>
                    <button
                        className="profile__add-button"
                        type="button"
                        aria-label="Кнопка добавления карточек"
                        onClick={onAddPlace} />
                </div>
            </section>
            
            <section className="elements">
                <ul className="cards">
                    {cards.map((card) => {
                        return (
                            <Card
                                card={card}
                                key={card._id}
                                onCardClick={onCardClick} />
                        )
                    })
                    }
                </ul>
            </section>
        </main>
    );
}

export default Main;