export class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    _fetch(url, header) {
        return fetch(url, header)
            .then((res) => res.ok ? res.json() : Promise.reject(`Something went wrong: ${res.status}`)
            );
    }

    getUserInfo() {
        return this._fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers
        })
    }

    setUserInfo(data) {
        return this._fetch(`${this._baseUrl}/users/me`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        });

    }

    editProfilePic(data) {
        return this._fetch(`${this._baseUrl}/users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.avatar
            })
        });
    }

    getInitialCards() {
        return this._fetch(`${this._baseUrl}/cards`, {
            headers: this._headers
        })
    }
    createCard(data) {
        return this._fetch(`${this._baseUrl}/cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name: data.title,
                link: data.link
            })
        });
    }
    changeLikeCardStatus(id, liked) {
        if (!liked) {
            return this._fetch(`${this._baseUrl}/cards/likes/${id}`, {
                method: "DELETE",
                headers: this._headers,
            });
        }

        else {
            return this._fetch(`${this._baseUrl}/cards/likes/${id}`, {
                method: "PUT",
                headers: this._headers,
            });
        }
    }

    deleteCard(id) {
        return this._fetch(`${this._baseUrl}/cards/${id}`, {
            method: "DELETE",
            headers: this._headers,
        });

    }



}

//initializing api

const api = new Api({
    baseUrl: "https://around.nomoreparties.co/v1/cohort-3-en",
    headers: {
        authorization: "b451294b-44d9-464a-8874-2d4137a4eb3c",
        "Content-Type": "application/json"
    }
});

export default api ;
