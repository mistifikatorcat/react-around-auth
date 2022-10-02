import React, { useState } from 'react';
import { Link } from 'react-router-dom';


 function Login({handleLogin}){
    
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
        handleLogin({email, password})
        };
        return(
            <div className='login'>
        <h2 className='login__title'>Sign Up</h2>
        <form className='login__form' onSubmit={handleSubmit}>
            <input
            type='email'
            name='email'
            className='login__input'
            placeholder='Email'
            value={data.email}
            onChange={handleChange}/>
            
            <input
            type='password'
            name='password'
            className='login__input'
            placeholder='Password'
            value={data.password}
            onChange={handleChange}/>

            <div className='login__footer'>
                <div className='login__footer-wrapper'>
                    <button type='submit' className='login__submit'>Sign Up</button>
                    <p className='register__footer-text'>Not a member yet?
                    <Link to='/register' className='login__link'>Log in here!</Link>
                    </p>
                </div>
            </div>
        </form>
    </div>
)}

 export default Login;