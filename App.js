import { useEffect, useState } from "react";
import { Text, FlatList, SafeAreaView, StyleSheet } from "react-native";
import InputTask from "./components/InpuTask";
import Task from "./components/Task";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { StatusBar } from "expo-status-bar";

export default function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    const response = await fetch("https://tasklistback-end0.onrender.com/todos/1", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Origin': '*'
      },
    });
    const data = await response.json();
    setTodos(data);
  }

  function clearTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  function toggleTodo(id) {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: todo.completed === 1 ? 0 : 1 }
          : todo
      )
    );
  }

  return (
    <BottomSheetModalProvider>
      <StatusBar />
      <SafeAreaView style={styles.container}>
        <FlatList
          data={todos}
          contentContainerStyle={styles.contentContainerStyle}
          keyExtractor={(todo) => todo.id}
          renderItem={({ item }) => (
            <Task {...item} toggleTodo={toggleTodo} clearTodo={clearTodo} />
          )}
          ListHeaderComponent={() => <Text style={styles.title}>Task list</Text>}
        />
        <InputTask todos={todos} setTodos={setTodos} />
      </SafeAreaView>
    </BottomSheetModalProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E9E9EF",
  },
  contentContainerStyle: {
    padding: 15,
  },
  title: {
    fontWeight: "800",
    fontSize: 28,
    marginBottom: 15,
  },
});