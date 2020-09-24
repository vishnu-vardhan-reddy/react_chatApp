import React from 'react'
import {Button} from "@material-ui/core"
import './Login.css'
import { auth } from './firebase'
import { provider } from './firebase'
import { useStateValue } from './StateProvider';
import { actionTypes } from './reducer'
import {useHistory, Link, BrowserRouter} from 'react-router-dom'

function Login() {

    const [{} , dispatch] = useStateValue();
    const signIn = () =>{
            auth
            .signInWithPopup(provider)
            .then(result => {
                 dispatch({
                     type:actionTypes.SET_USER,
                     user : result.user,
                 })
            })
            .catch((error) => alert(error.message)
                );
    }

    return (
        
        <div className='login'>
            <div className='login__container'>
                <img src ="https://www.freepnglogos.com/uploads/whatsapp-logo-image-8.png" alt="Logo"></img>
                <div className="login__text">
                    <h1>SignIn to Jion Chat</h1>
                </div>
                <BrowserRouter>
                <Link to='/'>
                <Button className='login__button' onClick={signIn} type="submit">SignIn With Google</Button>
                </Link>
                </BrowserRouter>
            </div>
        </div>
    )
}

export default Login
