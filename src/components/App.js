import React from "react";
import {Route, Switch, Redirect, useHistory} from 'react-router-dom';

import "../index.css";
import Header from "./Header";
import Main from "./Main";
import api from "../utils/api";
import EditProfilePopup from "./EditProfilePopup";
import Footer from "./Footer";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditAvatarPopup from "./EditAvatarPopup";
import * as auth from '../utils/auth';
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoToolTip from "./InfoToolTip";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({
    visibility: false
  });
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isLoggedIn, setIsLoggedIn ] = React.useState(false);
  const [userData, setUserData] = React.useState({email: 'email@mail.com'})
  const [isCheckingToken, setIsCheckingToken] = React.useState(true);
  const [isSuccess, setIsSuccess] = React.useState('');
  const history = useHistory();

  //getting info from the server

  React.useEffect(() => {
    api
      .getUserInfo()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(err);
      });

    api
      .getInitialCards()
      .then((items) => {
        setCards(items);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //checking token

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      auth.checkTokenValidity(token)
      .then((res) => {
        if(res) {
          setIsLoggedIn(true);
          setUserData({email: res.data.email});
          history.push('main');
          setIsCheckingToken(false);
        }
        else{
          localStorage.removeItem('token');
        }
      })
      .catch((err) => {
        console.log(err);
        history.push('/signin');
      })
      .finally(() => {
        setIsCheckingToken(false);
      })
    }
  }, []);

  //event handlers

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleImageClick(card) {
    setSelectedCard({
      ...selectedCard,
      visibility: true,
      name: card.name,
      link: card.link,
    });
  }


  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({
      visibility: false
    });
    setIsInfoToolTipOpen(false);
  }

  //like card handler

  function handleCardLike(card) {
    // Check one more time if this card was already liked
    const isLiked = card.likes.some((user) => user._id === currentUser._id);

    // Send a request to the API and getting the updated card data
    api.changeLikeCardStatus(card._id, !isLiked)
    .then((newCard) => {
      setCards((state) =>
        state.map((currentCard) =>
          currentCard._id === card._id ? newCard : currentCard
        )
      );
    })
    .catch((err) => {
      console.log(err);
    });
  }

  //delete card handler

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        const updatedCards = cards.filter((currentCard) => {
          return currentCard._id !== card._id;
        });
        setCards(updatedCards);
        
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //updating user info

  function handleUpdateUser(data) {
    api
      .setUserInfo(data)
      .then((updatedData) => {
        setCurrentUser(updatedData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //updating profile pic

  function handleUpdateAvatar(data) {
    api
      .editProfilePic(data)
      .then((updatedData) => {
        setCurrentUser(updatedData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //uploading a new card

  function handleAddPlaceSubmit(data) {
    api
      .createCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //register a new user

  function handleRegister({email, password}){
    auth.register(email, password)
    .then((res) => {
      if (res){
        setIsSuccess('success');
        history.push('/signin');
      }
      else{
        setIsSuccess('fail');
      }
  })
    .catch((err) => {
      console.log(err);
      setIsSuccess('fail');
    })
    .finally(() => {
      setIsInfoToolTipOpen(true);
    })
  }

  function handleLogin({email, password}){
    auth.login(email, password)
    .then((res) => {
    if (res){
      setIsLoggedIn(true);
      setUserData({email});
      localStorage.setItem('token', res.token);
      history.push('/main');
    }
    else{
      setIsSuccess('fail');
      setIsInfoToolTipOpen(true);
    }
    })
    .catch((err) => {
      console.log(err);
      setIsSuccess('fail');
      setIsInfoToolTipOpen(true);
    })
    .finally(() => {
      setIsCheckingToken(false);
    })
  }

  function signout(){
    setIsLoggedIn(false);
    localStorage.removeItem('token');
    history.push('/signin');
  }

  return (
      <CurrentUserContext.Provider value={currentUser}>
        <Header
        isLoggedIn={isLoggedIn}
        email={userData.email}
        signout={signout} />
        
        <Switch>
          <ProtectedRoute
          exact path='/main'
          isLoggedIn={isLoggedIn}
          isCheckingToken={isCheckingToken}>
        
          <Main
            /*event handlers go here*/
            onEditAvatarClick={handleEditAvatarClick}
            onEditProfileClick={handleEditProfileClick}
            onAddPlaceClick={handleAddPlaceClick}
            onCardClick={handleImageClick}
            onLikeClick={handleCardLike}
            onDeleteClick={handleCardDelete}
            cardsArray={cards}
          >
            <EditAvatarPopup
              /*form parameters*/
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
              onUpdateAvatar={handleUpdateAvatar}
            />

            <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopups}
              onUpdateUser={handleUpdateUser}
            />

            <AddPlacePopup
              isOpen={isAddPlacePopupOpen}
              onClose={closeAllPopups}
              onAddPlaceSubmit={handleAddPlaceSubmit}
            />
            {/* <PopupWithForm
        name="delete"
        title="Are you sure?"
        isOpen={isDeletePopupOpen}
        onClose={closeAllPopups}>
          <fieldset className="form__fieldset">
            <button className="form__button" type="submit" id="submitButton">Yes</button>
          </fieldset>
    </PopupWithForm>*/}
            <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          </Main>
          </ProtectedRoute>
          
          <Route path={'/signup'}>
            <Register handleRegister={handleRegister} />
          </Route>

          <Route path={'/signin'}>
            <Login handleLogin={handleLogin} />
          </Route>

          <Route>
            {isLoggedIn ? (
              <Redirect to={'/main'} />
            ) : (
            <Redirect to={'/signin'} />
            )}
          </Route>
          
        </Switch>
        <InfoToolTip 
          isOpen={isInfoToolTipOpen}
          onClose={closeAllPopups}
          status={isSuccess}
          />
        <Footer />
      </CurrentUserContext.Provider>
  );
}

export default App;
