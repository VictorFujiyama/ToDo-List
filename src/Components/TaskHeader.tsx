import styles from './TaskHeader.module.css';

interface TaskHeaderProps {
  taskCount: number;
  completedTasksCount: number;
}

function TaskHeader({ taskCount, completedTasksCount }: TaskHeaderProps) {
  return (
    <header>
      <div className={styles.tasksHeader}>
        <div className={styles.taskCreateds}>
          <strong>Tarefas criadas</strong>
          <p>{taskCount}</p>
        </div>
        <div className={styles.taskConcludes}>
          <strong >Concluídas</strong>
          <p>{completedTasksCount}/{taskCount}</p>
        </div>
      </div>
    </header>
  );
}

export default TaskHeader;
