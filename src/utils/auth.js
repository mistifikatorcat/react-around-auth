export const BASE_URL = "https://register.nomoreparties.co/";

const fetcher = (url, header) => {
    return  fetch(url, header)
    .then((res) => res.ok ? res.json() : Promise.reject(`Something went wrong: ${res.status}`)
); }

export const register = (email, password) => {
    return (fetcher(`${BASE_URL}/signup`), {
        method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email, password}),
        })
        .then((res) => {
            if (res.status === 201){
                return res.json();
            }
        })
        .then((res) => {
            return res;
        })
        
}

export const login = (email, password) => {
    return (fetcher(`${BASE_URL}/signin`), {
        method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email, password}),
        })
        .then((res) => {
                return res.json();
            
        })
        .then((data) => {
            localStorage.setItem("jwt", data.jwt);
            localStorage.setItem("email", data.email);
            return data;
        })
}

export const checkTokenValidity = (jwt) => {
    return (fetcher(`${BASE_URL}/users/me`), {
        method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${jwt}`
            }
        })
        .then((res) => {
            if (res.status === 200){
                return res.json();
            }
        })
        .then((res) => {
            return res;
        })
}