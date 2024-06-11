import styles from './Chatgpt.module.css'

function IA(){
    return (
        
    <header className={styles.topo}>
        <div className={styles.logo}>
            <a href='' className={styles.logodrink}><p>Drink Water</p></a>
        </div>

        <nav className={styles.links}>
            <ul>
                <a href=""><li className={styles.navegacao}>ChatGPT</li></a>
                <a href=""><li className={styles.navegacao}>Sair</li></a>
            </ul>
        </nav>
    </header>
    );
}

export default IA;