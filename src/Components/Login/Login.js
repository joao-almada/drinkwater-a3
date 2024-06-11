import React from "react";
import styles from "./Login.module.css";
import { Link } from "react-router-dom";

const Login = () => {
    return (
        <div className={styles.container}>
        <form>
            <h1>Acesse o sistema</h1>
            <div className={styles.input_field}>
                <input type="email" placeholder="E-mail" required></input>
            </div>
            <div className={styles.input_field}>
                <input type="password" placeholder="Senha" required></input>
            </div>

            <div className={styles.recall_forget}>
                <label >
                    <input type="checkbox" />
                    Lembre de mim
                </label>
                <a href="">Esqueceu a senha?</a>
            </div>
                <button>Entrar</button>

            <div className={styles.signup_link}>
                <p>Não tem uma conta? <Link to='/cadastro'>Registrar</Link></p>
            </div>
        </form>
    </div>
    )
}

export default Login;