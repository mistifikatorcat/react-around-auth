export const BASE_URL = "https://register.nomoreparties.co/";

const fetcher = (url, headers) => {
    return fetch(url, headers).then((res) =>
    res.ok ? res.json() : Promise.reject(res.StatusText)
    )
  }

  export const register = (email, password) => { 
    return fetcher(`${BASE_URL}/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password }),
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
    return fetcher(`${BASE_URL}/signin`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password }),
      })
        .then((res) => {
                return res.json();
            
        })
        .then((data) => {
            localStorage.setItem("jwt", data.jwt);
            localStorage.setItem("email", email);
            return data;
        })
}

export const checkTokenValidity = (token) => {
    return (fetcher(`${BASE_URL}/users/me`), {
        method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${token}`
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