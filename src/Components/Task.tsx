import { FaRegTrashAlt } from 'react-icons/fa';
import styles from './Task.module.css';
import checkIcon from '../assets/completed.svg'
import uncheckIcon from '../assets/notCompleted.svg'
import checkIconHover from '../assets/completedHover.svg'
import uncheckIconHover from '../assets/notCompletedHover.svg'
import { useState } from 'react';

interface TaskProps {
  id: number;
  content: string;
  isChecked: boolean;
  onDeleteTasks: (id: number) => void;
  onToggleCheck: (id: number) => void;
}

function Task({ id, content, isChecked, onDeleteTasks, onToggleCheck }: TaskProps) {
  
  const [isHovered, setIsHovered] = useState(false);

  function handleDeleteTask() {
    onDeleteTasks(id);
  }

  function handleToggleCheck() {
    onToggleCheck(id);
  }

  return (
    <main className={styles.taskContainer}>
      
      <button 
        className={styles.checkButton}
        type="button"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleToggleCheck}>
        
        <img
          src={isChecked ? (isHovered ? checkIconHover : checkIcon) : (isHovered ? uncheckIconHover : uncheckIcon)}
          alt=""
        />
      
      </button>

      <p className={`${isChecked ? styles.completedTask : styles.notCompletedTask}`}>{content}</p>
      <button onClick={handleDeleteTask} className={styles.trashIconButton}>
        <FaRegTrashAlt />
      </button>
    </main>
  );
}

export default Task;
