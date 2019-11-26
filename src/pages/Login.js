import React, { useEffect, useState } from 'react';
import {
  usePost
} from '../utils/rest';
import { Redirect } from 'react-router-dom';

const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDZ6ZYCHYjOK19oB_vMueIaVbriPszHERQ'

const Login = () => {
  const [postData, signIn] = usePost(url)
  const [logado, setLogado] = useState(false)
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  useEffect(() => {
    // console.log('PostData mudou', postData.data.idToken)
    if (Object.keys(postData.data).length > 0) {
      localStorage.setItem('token', postData.data.idToken)
      window.location.reload()
    }
  }, [postData])
  useEffect(() => {
    const token = localStorage.getItem('token')
    if(token) {
      setLogado(true)
    }
  })
  const login = async () => {
    await signIn({
      email: email,
      password: senha,
      returnSecureToken: true
    })
  }
  const onChangeEmail = evt => {
    setEmail(evt.target.value)
  }
  const onChangeSenha = evt => {
    setSenha(evt.target.value)
  }
  if (logado) {
    return <Redirect to='/' />
  }
  return (
    <div>
      <h1>Login</h1>
      {
        postData.error && postData.error.length > 0 &&
        <p>E-mail e/ou senha inválidos.</p>
      }
      <button onClick={login}>Login</button>
      <input type='text' value={email} onChange={onChangeEmail} placeholder='Seu email'></input>
      <input type='password' value={senha} onChange={onChangeSenha} placeholder='Sua senha'></input>
    </div>
  )
}

export default Login;