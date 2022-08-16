export const BASE_URL = 'https://api.nomoreparties.co';

const checkResponce = (response) =>
    response.ok
        ? response.json()
        : Promise.reject(new Error(`Ошибка ${response.status}: ${response.statusText}`));

const headers = {
    'Content-Type': 'application/json',
}

export const register = ({ password, email }) => {
    return fetch(`${BASE_URL}/sign-up`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ password, email })
    })
        .then(res => checkResponce(res))
};

export const authorize = ({ password, email }) => {
    return fetch(`${BASE_URL}/sign-in`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ password, email })
    })
        .then(res => checkResponce(res))
};

export const checkToken = ({token}) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            ...headers,
            "Authorization" : `Bearer ${token}`
        },
    })
        .then(res => checkResponce(res))
};


