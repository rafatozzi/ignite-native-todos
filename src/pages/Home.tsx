import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    if (tasks.some((i) => i.title === newTaskTitle)) {
      return Alert.alert(
        "Task já cadastrada",
        "Você não pode cadastrar uma task com o mesmo nome"
      );
    }

    const newTask: Task = {
      id: tasks.length + 1,
      title: newTaskTitle,
      done: false,
    };
    setTasks((oldTasks) => [...oldTasks, newTask]);
  }

  function handleToggleTaskDone(id: number) {
    const newList = tasks.map((item) => {
      if (item.id === id) return { ...item, done: !item.done };
      else return item;
    });
    setTasks(newList);
  }

  function handleEditTask(id: number, taskNewTitle: string) {
    const newList = tasks.map((item) => {
      if (item.id === id) return { ...item, title: taskNewTitle };
      else return item;
    });
    setTasks(newList);
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        {
          text: "Não",
          style: "cancel",
        },
        {
          text: "Sim",
          onPress: () => {
            const newList: Task[] = [];

            tasks.map((item) => {
              if (item.id !== id) newList.push(item);
            });

            setTasks(newList);
          },
        },
      ]
    );
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
});
