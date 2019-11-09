import React, { useEffect } from 'react';
import {
  usePost
} from '../utils/rest';

const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDZ6ZYCHYjOK19oB_vMueIaVbriPszHERQ'

const Login = () => {

  const [postData, signIn] = usePost(url)
  useEffect(() => {
    // console.log('PostData mudou', postData.data.idToken)
    if(Object.keys(postData.data).length >0) {
      localStorage.setItem('token', postData.data.idToken)
    }
  }, [postData])
  const login = async() => {
    await signIn({
      email: 'vini.parizoto@live.com',
      password: 'abc1231',
      returnSecureToken: true
    })
  }

  return( 
    <div>
      <h1>Login</h1>
      <button onClick={login}>Login</button>
      <pre>{JSON.stringify(postData)}</pre>
    </div>
  )
}

export default Login;