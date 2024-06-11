import { Link } from 'react-router-dom';
import styles from './Header.module.css'


function Header(){
    return (
        
    <header className={styles.topo}>
        <div className={styles.logo}>
            <Link to='/home' className={styles.logodrink}><p>Drink Water</p></Link>
        </div>

        <nav className={styles.links}>
            <ul>
                <Link to='/chatgpt'><li className={styles.navegacao}>ChatGPT</li></Link>
                <Link to='/'><li className={styles.navegacao}>Sair</li></Link>
            </ul>
        </nav>
    </header>
    );
}

export default Header;