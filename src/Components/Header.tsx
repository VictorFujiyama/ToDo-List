import styles from './Header.module.css'
import rocketIcon from '../assets/rocket.svg'

function Header() {
    return(
        <header className={styles.header}>
            <div>
                <img className={styles.rocketIcon} src={rocketIcon} alt="" />
                    <div>
                        <strong className={styles.toLogo}>to</strong>
                        <strong className={styles.doLogo}>do</strong>
                    </div>
            </div>
        </header>
    );
}

export default Header;
