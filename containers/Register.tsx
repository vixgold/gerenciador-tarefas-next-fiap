import type { NextPage } from 'next'
import { useState } from 'react'
import { executeRequest } from '../services/api';
import { AccessTokenProps } from '../types/AccessTokenProps';

type LoginProps = {
  doLogin(e:any, login: string, password: string) : void
  setRegister(b:boolean) : void
}

const Register: NextPage<LoginProps> = ({
  doLogin,
  setRegister
}) => {

    const [name, setName] = useState('');
    const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msgErro, setMsgErro] = useState('');
  const [isLoading, setLoading] = useState(false);

  const doRegister = async (e : any) =>{
    try{
      setLoading(true);
      e.preventDefault();
      
      if(!name || !email || !password){
        setMsgErro('Dados incompletos!');
          setLoading(false);
        return;
      }

      const body = {
        name,
        email,
        password
      }

      const result = await executeRequest('user', 'POST', body);
      
      setMsgErro('');
      if(result && result.status == 200){
        setLogin(email);
        setRegister(false);
        doLogin(e, email, password);
        return;
      }else{
        if(result?.data?.error){
            setMsgErro(result?.data?.error);
        }else{
        setMsgErro('Nao foi possivel processar seu registro tente novamente!');
        }
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
    <div className="container-login">
      <img src="/images/logo.svg" alt="Logo Fiap" className="logo"/>
      <form>
        <div className="titles">
          <h1 className="primary-title">Registro de usuário</h1>
          <h2 className="secondary-title">Insira seus dados abaixo</h2>
        </div>
        {msgErro && <p>{msgErro}</p>}
        <div className="input">
          <img src="/images/not-finished.svg" alt="profile icon"/>
          <input type="text" placeholder="Nome"
            value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div className="input">
          <img src="/images/mail.svg" alt="mail icon"/>
          <input type="text" placeholder="Insira seu email"
            value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div className="input">
          <img src="/images/lock.svg" alt="padlock icon"/>
          <input type="password" placeholder="Insira sua senha"
            value={password} onChange={e => setPassword(e.target.value)}/>
        </div>
        <button className={isLoading ? "disabled" : ""} type="button" onClick={doRegister} disabled={isLoading}>{isLoading ? "...Carregando" : "Confirmar"}</button>
        <button className={isLoading ? "disabled" : "cancel-button"} type="button" onClick={e => setRegister(false)} disabled={isLoading}>Cancelar</button>
      </form>
    </div>
  )
}

export { Register }