import React, { useState } from 'react';
import Header from '../header/Header';
import Main from '../main/Main';
import Footer from '../footer/Footer';
import PopupWithForm from '../popupWithForm/PopupWithForm';
import ImagePopup from '../imagePopup/ImagePopup';

function App() {

    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState();
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState();
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState();
    const [isImagePopupOpen, setImagePopupOpen] = React.useState();
    const [selectedCard, setSelectedCard] = React.useState({});

    function handleEditProfileClick() {
        setEditProfilePopupOpen(true);
    }

    function handleEditAvatarClick() {
        setEditAvatarPopupOpen(true);
    }

    function handleAddPlaceClick() {
        setAddPlacePopupOpen(true);
    }

    function handleCardClick(card) {
        setSelectedCard(card);
        setImagePopupOpen(true);
    }

    function closeAllPopups() {
        setEditProfilePopupOpen();
        setEditAvatarPopupOpen();
        setAddPlacePopupOpen();
        setSelectedCard({});
        setImagePopupOpen();
    }


    return (

        <body className="page">
            <Header />
            <Main
                onEditProfile={handleEditProfileClick}
                onEditAvatar={handleEditAvatarClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
            />
            <Footer />
            <PopupWithForm
                title="Редактировать профиль"
                name="profile-edit"
                submitText="Сохранить"
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}>
                <input type="text" className="popup__input popup__input_type_name" name="name-input" id="name-input"
                    value="" placeholder="Имя" required minlength="2" maxlength="40" />
                <span className="popup__input-error popup__input-error_place_up" id="name-input-error"></span>
                <input type="text" className="popup__input popup__input_type_job" name="job-input" id="job-input" value=""
                    placeholder="О себе" required minlength="2" maxlength="200" />
                <span className="popup__input-error popup__input-error_place_down" id="job-input-error"></span>
            </PopupWithForm>

            <PopupWithForm
                title="Обновить аватар"
                name="avatar-edit"
                isOpen={isEditAvatarPopupOpen}
                submitText="Сохранить"
                onClose={closeAllPopups}>
                <input type="url" className="popup__input popup__input_type_avatar-link" name="avatar-link-input"
                    id="avatar-link-input" value="" placeholder="Ссылка на картинку" required />
                <span className="popup__input-error popup__input-error_place_up" id="avatar-link-input-error"></span>
            </PopupWithForm>

            <PopupWithForm
                title="Новое место"
                name="new-place"
                submitText="Создать"
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}>
                <input type="text" className="popup__input popup__input_type_title" name="title-input" id="title-input"
                    value="" placeholder="Название" required minlength="2" maxlength="30" />
                <span className="popup__input-error popup__input-error_place_up" id="title-input-error"></span>
                <input type="url" className="popup__input popup__input_type_link" name="link-input" id="link-input" value=""
                    placeholder="Ссылка на картинку" required />
                <span className="popup__input-error popup__input-error_place_down" id="link-input-error"></span>
            </PopupWithForm>

            <PopupWithForm
                title="Вы уверены?"
                name="delete-confirmation"
                submitText="Да"
                onClose={closeAllPopups}>
                <form className="popup__delete-container">
                    <button type="submit" className="popup__submit-button popup__submit-button_place_card">Да</button>
                </form>
            </PopupWithForm>

            <ImagePopup
                card={selectedCard}
                isOpen={isImagePopupOpen}
                onClose={closeAllPopups}
            >
            </ImagePopup>

        </body>
    );
}

export default App;
