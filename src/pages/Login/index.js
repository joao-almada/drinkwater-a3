import React, { useState } from "react";
import styles from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";


const Login = () => {
    const { signin } = useAuth();
    const navigate = useNavigate();
    
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [error, setError] = useState("");
    

    const handleLogin = () => {
        if (!email || !senha) {
            setError("Preencha todos os campos");
            return;
        }
    
        const res = signin(email, senha);
    
        if (res) {
            setError("Email ou senha incorretos"); // Defina a mensagem de erro aqui
            return;
        }
    
        navigate("/home");
    };

    return (
    <main>
        <div className={styles.container}>
        <form>
            <h1>Acesse o sistema</h1>
            <div className={styles.input_field}>
                <input type="email" placeholder="E-mail" required value={email} onChange={(e) =>[setEmail(e.target.value), setError("")]}></input>
            </div>
            <div className={styles.input_field}>
                <input type="password" placeholder="Senha" required value={senha} onChange={(e) => [setSenha(e.target.value), setError("")]}></input>
            </div>

            <div className={styles.recall_forget}>
                <label >
                    <input type="checkbox" />
                    Lembre de mim
                </label>
                {error && <p style={{ color: "red" }}>{error}</p>}

            </div>
                <button type="button" onClick={handleLogin}>Entrar</button>

            <div className={styles.signup_link}>
                <p>Não tem uma conta? <Link to='/cadastro'>Registrar</Link></p>
            </div>
        </form>
        </div>
    </main>
    )
}

export default Login;