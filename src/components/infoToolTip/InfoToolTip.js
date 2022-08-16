// import checkMarkPic from "../../images/popup/checkMark.svg";
// import crossPic from "../../images/popup/cross.svg";

function InfoToolTip({ isOpen, onClose, isCheckInSuccessful }) {
    return (
        <div className={`popup popup_type_tooltip" ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container popup__container_place_tooltip">
                <button
                    type="button"
                    className="popup__close-button"
                    onClick={onClose}>
                </button>
                <img
                    className="popup__checkin-pic"
                    // src={isCheckInSuccessful ? checkMarkPic : crossPic}
                    alt="Индикатор регистрации" />
                <h3
                    className="popup__checkin-tooltip">
                    {isCheckInSuccessful ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз"}
                </h3>
            </div>
        </div>
    )
}

export default InfoToolTip;