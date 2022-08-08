import React, { useState, useEffect } from 'react';
import Header from '../header/Header.js';
import Main from '../main/Main.js';
import Footer from '../footer/Footer.js';
import PopupWithForm from '../popupWithForm/PopupWithForm.js';
import ImagePopup from '../imagePopup/ImagePopup.js';
import EditProfilePopup from '../editProfilePopup/EditProfilePopup.js';
import EditAvatarPopup from '../editAvatarPopup/EditAvatarPopup.js';
import AddPlacePopup from '../addPlacePopup/AddPlacePopup.js';
import { api } from '../../utils/Api.js';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';

function App() {

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({ name: '', link: '' });
    const [cards, setCards] = useState([]);

    const [currentUser, setCurrentUser] = useState({ name: '', about: '' });

    useEffect(() => {
        api.getUserInfo()
            .then(setCurrentUser)
            .catch(console.log)
    }
        , [])

    useEffect(() => {
        api.getInitialCards()
            .then(setCards)
            .catch(console.log)
    }
        , [])


    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleCardClick(card) {
        setSelectedCard(card);
        setIsImagePopupOpen(true);
    }


    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        api
            .changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            })
            .catch(console.log);
    };

    function handleCardDelete(card) {
        api
            .deleteCard(card._id)
            .then(() => {
                setCards((state) => state.filter((c) => c._id !== card._id));
                closeAllPopups();
            })
            .catch(console.log);

    };

    function handleUpdateUser(userInfo) {
        api
            .editProfile(userInfo.name, userInfo.about)
            .then((newInfo) => {
                setCurrentUser(newInfo);
                closeAllPopups();
            })
            .catch(console.log);
    };

    function handleUpdateAvatar(userAvatar) {
        api
            .editAvatar(userAvatar)
            .then((newAvatar) => {
                setCurrentUser(newAvatar);
                closeAllPopups();
            })
            .catch(console.log);
    };

    function handleAddPlaceSubmit(cardInfo) {
        api
            .addCard(cardInfo.name, cardInfo.link)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch(console.log);
    };

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setSelectedCard({});
        setIsImagePopupOpen(false);
    };

    return (
        <CurrentUserContext.Provider value={currentUser}>

            <div className="page">
                <Header />
                <Main
                    cards={cards}
                    onEditProfile={handleEditProfileClick}
                    onEditAvatar={handleEditAvatarClick}
                    onAddPlace={handleAddPlaceClick}
                    onCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                />
                <Footer />

                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                />

                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                />

                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddPlace={handleAddPlaceSubmit}
                />

                <PopupWithForm
                    title="Вы уверены?"
                    name="delete-confirmation"
                    submitText="Да"
                    onClose={closeAllPopups}>

                    <div
                        className="popup__delete-container">
                        <button
                            type="submit"
                            className="popup__submit-button popup__submit-button_place_card">Да</button>
                    </div>
                </PopupWithForm>

                <ImagePopup
                    card={selectedCard}
                    isOpen={isImagePopupOpen}
                    onClose={closeAllPopups}
                >
                </ImagePopup>

            </div>
        </CurrentUserContext.Provider>
    );

}

export default App;
