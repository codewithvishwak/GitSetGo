"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Todo {
  id: string
  text: string
  completed: boolean
}

interface TodoAppProps {
  theme: "light" | "dark" | "neon"
}

export function TodoApp({ theme }: TodoAppProps) {
  const [todos, setTodos] = useState<Todo[]>([
    { id: "1", text: "Welcome to MiniOS Todo!", completed: false },
    { id: "2", text: "Try adding a new task", completed: false },
  ])
  const [newTodo, setNewTodo] = useState("")

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([
        ...todos,
        {
          id: Date.now().toString(),
          text: newTodo.trim(),
          completed: false,
        },
      ])
      setNewTodo("")
    }
  }

  const toggleTodo = (id: string) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
  }

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addTodo()
    }
  }

  const themeStyles = {
    light: {
      bg: "bg-white",
      text: "text-gray-800",
      input: "bg-gray-50 border-gray-200 text-gray-800",
      button: "bg-blue-500 hover:bg-blue-600 text-white",
      todoItem: "bg-gray-50 hover:bg-gray-100",
      completed: "text-gray-500 line-through",
      deleteBtn: "text-red-500 hover:text-red-700",
    },
    dark: {
      bg: "bg-gray-800",
      text: "text-white",
      input: "bg-gray-700 border-gray-600 text-white",
      button: "bg-blue-600 hover:bg-blue-700 text-white",
      todoItem: "bg-gray-700 hover:bg-gray-600",
      completed: "text-gray-400 line-through",
      deleteBtn: "text-red-400 hover:text-red-300",
    },
    neon: {
      bg: "bg-purple-900",
      text: "text-cyan-300",
      input: "bg-purple-800 border-cyan-500/30 text-cyan-300",
      button: "bg-cyan-500 hover:bg-cyan-400 text-purple-900",
      todoItem: "bg-purple-800/50 hover:bg-purple-700/50 border border-cyan-500/20",
      completed: "text-cyan-500/50 line-through",
      deleteBtn: "text-pink-400 hover:text-pink-300",
    },
  }

  const styles = themeStyles[theme]

  return (
    <div className={`h-full ${styles.bg} ${styles.text} rounded-lg overflow-hidden`}>
      {/* Add Todo Section */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex gap-2">
          <Input
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Add a new task..."
            className={`flex-1 ${styles.input}`}
          />
          <Button onClick={addTodo} className={styles.button} size="sm">
            Add
          </Button>
        </div>
      </div>

      {/* Todo List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        <AnimatePresence>
          {todos.map((todo) => (
            <motion.div
              key={todo.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className={`
                flex items-center gap-3 p-3 rounded-lg transition-colors
                ${styles.todoItem}
              `}
            >
              <button
                onClick={() => toggleTodo(todo.id)}
                className={`
                  w-5 h-5 rounded border-2 flex items-center justify-center transition-colors
                  ${
                    todo.completed
                      ? theme === "neon"
                        ? "bg-cyan-500 border-cyan-500"
                        : "bg-green-500 border-green-500"
                      : theme === "light"
                        ? "border-gray-300 hover:border-gray-400"
                        : theme === "dark"
                          ? "border-gray-500 hover:border-gray-400"
                          : "border-cyan-500/50 hover:border-cyan-500"
                  }
                `}
              >
                {todo.completed && (
                  <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-white text-xs">
                    ✓
                  </motion.span>
                )}
              </button>

              <span className={`flex-1 ${todo.completed ? styles.completed : ""}`}>{todo.text}</span>

              <button
                onClick={() => deleteTodo(todo.id)}
                className={`${styles.deleteBtn} hover:scale-110 transition-transform`}
              >
                ×
              </button>
            </motion.div>
          ))}
        </AnimatePresence>

        {todos.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`text-center py-8 ${theme === "neon" ? "text-cyan-500/70" : "text-gray-500"}`}
          >
            No tasks yet. Add one above!
          </motion.div>
        )}
      </div>

      {/* Stats */}
      <div className={`p-4 border-t ${theme === "light" ? "border-gray-200" : "border-gray-700"}`}>
        <div className="flex justify-between text-sm">
          <span>Total: {todos.length}</span>
          <span>Completed: {todos.filter((t) => t.completed).length}</span>
          <span>Remaining: {todos.filter((t) => !t.completed).length}</span>
        </div>
      </div>
    </div>
  )
}
