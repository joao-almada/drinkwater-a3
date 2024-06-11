import React, { useState } from "react";
import styles from './Cadastro.module.css'
import AppRoutes from './../../routes'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from "../../hooks/useAuth";

const Cadastro = () => {
    const [email, setEmail] = useState("");
    const [emailConf, setEmailConf] = useState("");
    const [senha, setSenha] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const { signup } = useAuth();

    const handleSignup = () => {
      if (!email | !emailConf | !senha) {
        setError("Preencha todos os campos");
        return;
      } else if (email !== emailConf) {
        setError("Os e-mails não são iguais");
        return;
      }
  
      const res = signup(email, senha);
  
      if (res) {
        setError(res);
        return;
      }
  
      alert("Usuário cadatrado com sucesso!");
      navigate("/");
    };  

    return (
        <section>
            <div className={styles.container}>
            <form>
                <h1>Meu cadastro</h1>
                <div className={styles.input_field}>
                    <input type="email" placeholder="E-mail" required value={email} onChange={(e) => [setEmail(e.target.value), setError("")]}></input>
                </div>
                <div className={styles.input_field}>
                    <input type="email" placeholder="Confirme seu E-mail" required value={emailConf} onChange={(e) => [setEmailConf(e.target.value), setError("")]}></input>
                </div>
                <div className={styles.input_field}>
                    <input type="password" placeholder="Digite sua senha" required value={senha} onChange={(e) => [setSenha(e.target.value), setError("")]}></input>
                </div>


                    <button onClick={handleSignup}>Cadastrar</button>

                <div className={styles.signup_link}>
                    <p>Possui uma conta? <Link to='/'>Entrar</Link></p>
                </div>
            </form>
            </div>
        </section>
    )
}

export default Cadastro;