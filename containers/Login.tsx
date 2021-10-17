import type { NextPage } from 'next'
import { useState } from 'react'
import { executeRequest } from '../services/api';
import { AccessTokenProps } from '../types/AccessTokenProps';
import { Register } from './Register'

const Login: NextPage<AccessTokenProps> = ({
  setAccessToken,
}) => {

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [msgErro, setMsgErro] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [isRegistering, setRegister] = useState(false);

  const doLogin = async (e : any, login? : string, password? : string) =>{
    try{
      setLoading(true);
      e.preventDefault();
      
      if(!login || !password){
        console.log("login: " + login);
        console.log("Pass.: " + password);
        setMsgErro('Parâmetros de entrada inválidos');
          setLoading(false);
        return;
      }

      const body = {
        login,
        password
      }

      const result = await executeRequest('login', 'POST', body);
      
      setMsgErro('');
      if(result && result.data){
        localStorage.setItem('accessToken', result.data.token);
        localStorage.setItem('userName', result.data.name);
        localStorage.setItem('userEmail', result.data.email);
        setAccessToken(result.data.token);
      }else{
        setMsgErro('Nao foi possivel processar login tente novamente!');
      }
    }catch(e : any){
      console.log(e);
      if(e?.response?.data?.error){
        setMsgErro(e?.response?.data?.error);
      }else{
        setMsgErro('Ocorreu erro ao processar login tente novamente!');
      }
    }

    setLoading(false);
  }

  return (
    !isRegistering ? 
    <>
      <div className="container-login">
        <img src="/images/logo.svg" alt="Logo Fiap" className="logo"/>
        <form>
          {msgErro && <p>{msgErro}</p>}
          <div className="input">
            <img src="/images/mail.svg" alt="mail icon"/>
            <input type="text" placeholder="Informe seu email"
              value={login} onChange={e => setLogin(e.target.value)} />
          </div>
          <div className="input">
            <img src="/images/lock.svg" alt="padlock icon"/>
            <input type="password" placeholder="Informe sua senha"
              value={password} onChange={e => setPassword(e.target.value)}/>
          </div>
          <div className="container-buttons">
            <button className={isLoading ? "disabled" : ""} type="button" onClick={doLogin} disabled={isLoading}>{isLoading ? "...Carregando" : "Login"}</button>
            <button className={isLoading ? "disabled" : "register-button"} type="button" onClick={e => setRegister(!isRegistering)} disabled={isLoading}>{isLoading ? "...Carregando" : "Registre-se"}</button>
          </div>
        </form>
      </div>
    </> :
    < Register doLogin={doLogin} setRegister={setRegister}/>
  )
}

export { Login }