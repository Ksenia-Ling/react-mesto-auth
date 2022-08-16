export const BASE_URL = 'https://auth.nomoreparties.co';

const checkResponce = (response) =>
    response.ok
        ? response.json()
        : Promise.reject(new Error(`Ошибка ${response.status}: ${response.statusText}`));

const headers = {
    'Content-Type': 'application/json',
}

export const register = (data) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ email: data.email, password: data.password })
    })
        .then(res => checkResponce(res))
};

export const authorize = (data) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ email: data.email, password: data.password})
    })
        .then(res => checkResponce(res))
};

export const checkToken = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            ...headers,
            Authorization : `Bearer ${token}`
        },
    })
        .then(res => checkResponce(res))
};


