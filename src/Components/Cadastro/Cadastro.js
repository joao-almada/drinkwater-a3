import React from 'react'
import styles from './Cadastro.module.css'
import AppRoutes from './../../routes'
import { Link } from 'react-router-dom'

const Cadastro = () => {
    return (
        <section>
            <div className={styles.container}>
            <form>
                <h1>Meu cadastro</h1>
                <div className={styles.input_field}>
                    <input type="text" placeholder="Nome" required></input>
                </div>
                <div className={styles.input_field}>
                    <input type="email" placeholder="E-mail" required></input>
                </div>
                <div className={styles.input_field}>
                    <input type="password" placeholder="Senha" required></input>
                </div>
                <div className={styles.input_field}>
                    <input type="password" placeholder="Confirme sua senha" required></input>
                </div>


                    <button>Cadastrar</button>

                <div className={styles.signup_link}>
                    <p>Possui uma conta? <Link to='/'>Entrar</Link></p>
                </div>
            </form>
            </div>
        </section>
    )
}

export default Cadastro;