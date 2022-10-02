import React from "react";
import tick from '../images/Tick.svg';
import cross from '../images/Cross.svg';

export default function InfoToolTip(props){
    const enable = `${props.isOpen ? 'popup_enabled' : ''}`;
    return(
        <section
      className={`${props.name} popup ${enable}`}
      id={`${props.name}`}
    >
        {props.isSuccess === 'success' ? (
            <div className="popup__icon-wrapper">
                <img className="popup__icon" src={tick} alt='success' />
                <p className="popup__message">Success! You have been registered.
                </p>
            </div>
        ):(
            <div className="popup__icon-wrapper">
                <img className="popup__icon" src={cross} alt='fail' />
                <p className="popup__message">Oops, something went wrong. Please try again.
                </p>
            </div>
        )}
    
        <button className={`popup__close ${props.name}__close`} onClick={props.onClose}>
        </button>
        </section>
    )
}