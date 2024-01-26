import Header from "./Components/Header";
import styles from './App.module.css';
import TaskHeader from "./Components/TaskHeader";
import Task from "./Components/Task";
import plustIcon from './assets/plus.svg';
import React, { useState, useEffect, useRef } from "react";
import WhenTasksEmpty from "./Components/WhenTasksEmpty";

function App() {
  const [tasks, setTasks] = useState<{ id: number; content: string; isChecked: boolean }[]>([]);
  const [newTaskText, setNewTaskText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [textareaHeight, setTextareaHeight] = useState<number | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // Definir altura mínima no início
    if (textareaRef.current) {
      setTextareaHeight(textareaRef.current.scrollHeight);
    }
  }, []);

  function handleCreateNewTask(event: React.FormEvent) {
    event?.preventDefault();

    if (newTaskText.trim() === '') {
      handleNewCommentInvalid(event as React.FormEvent<HTMLTextAreaElement>);
      return;
    }

    const newTask = { id: Date.now(), content: newTaskText, isChecked: false };
    setTasks((prevTasks) => [...prevTasks, newTask]);
    setNewTaskText('');
    setTextareaHeight(null);
  }

  function handleNewTaskChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setNewTaskText(event.target.value);
    setIsTyping(true);
    event?.target.setCustomValidity('');

    // Ajustar a altura do textarea dinamicamente
    setTextareaHeight(event.target.scrollHeight);
  }

  function handleNewCommentInvalid(event: React.FormEvent<HTMLTextAreaElement>) {
    const target = event.target as HTMLTextAreaElement;

    if (target) {
      target.setCustomValidity('Esse campo é obrigatório!');
    }
  }

  function handleToggleCheck(taskToToggle: number) {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskToToggle ? { ...task, isChecked: !task.isChecked } : task
      )
    );
  }

  function deleteTasks(taskToDelete: number) {
    const tasksWithoutDeletedOne = tasks.filter((task) => task.id !== taskToDelete);
    setTasks(tasksWithoutDeletedOne);
  }

  function handleKeyPress(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleCreateNewTask(event);
    }
  }

  function handleTextareaBlur() {
    // Verificar se o conteúdo foi apagado
    if (newTaskText.trim() === '') {
      setTextareaHeight(null);
    }
  }

  return (
    <div>
      <Header />
      <form onSubmit={handleCreateNewTask} className={styles.input}>
        <textarea
          ref={textareaRef}
          required
          onInvalid={handleNewCommentInvalid}
          name="input"
          placeholder="Adicione uma nova tarefa"
          onChange={handleNewTaskChange}
          onBlur={handleTextareaBlur}
          onKeyPress={handleKeyPress}
          value={newTaskText}
          style={{ height: textareaHeight ? `${textareaHeight}px` : '3.375rem' }}
          className={`${styles.textArea} ${isTyping ? styles.typing : ''}`}
        ></textarea>
        <button className={styles.submitButton} type="submit">
          Criar <img src={plustIcon} alt="" />
        </button>
      </form>
      <main className={styles.container}>
        <TaskHeader taskCount={tasks.length} completedTasksCount={tasks.filter(task => task.isChecked).length} />
        {tasks.length === 0 ? (
          <WhenTasksEmpty />
        ) : (
          tasks.map(task => (
            <Task
              key={task.id.toString()}
              id={task.id}
              onDeleteTasks={() => deleteTasks(task.id)}
              onToggleCheck={() => handleToggleCheck(task.id)}
              content={task.content}
              isChecked={task.isChecked}
            />
          ))
        )}
      </main>
    </div>
  );
}

export default App;
