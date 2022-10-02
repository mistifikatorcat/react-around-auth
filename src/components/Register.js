import React, { useState } from 'react';
import { Link } from 'react-router-dom';


 function Register({handleRegister}) {
    
    const [data, setData] = useState({
        email: '', password: ''
    })
    

const handleChange = (e) => {
    const {name, value} = e.target;
    setData({...data, [name]: value});
}

    const handleSubmit = (e) => {
        e.preventDefault();
        const {email, password } = data;
        handleRegister({email, password})
        }
    

return(
    <div className='register'>
        <h2 className='register__title'>Sign Up</h2>
        <form className='register__form' onSubmit={handleSubmit}>
            <input
            type='email'
            name='email'
            className='register__input'
            placeholder='Email'
            value={data.email}
            onChange={handleChange}/>
            
            <input
            type='password'
            name='password'
            className='register__input'
            placeholder='Password'
            value={data.password}
            onChange={handleChange}/>

            <div className='register__footer'>
                <div className='register__footer-wrapper'>
                    <button type='submit' className='register__submit'>Sign Up</button>
                    <p className='register__footer-text'>Already a member?
                    <Link to='/login' className='register__link'>Log in here!</Link>
                    </p>
                </div>
            </div>
        </form>
    </div>
);
}

export default Register;