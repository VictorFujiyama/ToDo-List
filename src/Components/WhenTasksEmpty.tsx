import listIcon from '../assets/Clipboard.png'
import styles from './WhenTasksEmpty.module.css'

function WhenTasksEmpty() {
    return(
        <div className={styles.tasks}>
            <img src={listIcon} alt="" />
            <strong>Você ainda não tem tarefas cadastradas</strong>
            <p>Crie tarefas e organize seus itens a fazer</p>
      </div>
    );
}

export default WhenTasksEmpty;

