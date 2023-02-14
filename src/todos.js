import {v4 as uuidv4} from 'uuid'

let todos = []

// Get the todos from localStorage
const loadTodos = () => {
    const userJSON = localStorage.getItem('todos')
    try {
        todos = userJSON ? JSON.parse(userJSON) : []
    } catch (e) {
        todos = []
    }
}

loadTodos()

// Save the todos to localStorage
const saveTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos))
}

const getTodos = () => todos


const createTodo = (text) => {
    if(text.length > 0)
    {
        const newTodo = {
            id: uuidv4(),
            text,
            completed: false
        }
        todos.push(newTodo)
        saveTodos()
}
}

// Remove todo from the todos list
const removeTodo = (id) => {
    const todoIndex = todos.findIndex((todo) => todo.id === id)

    if (todoIndex > -1) {
        todos.splice(todoIndex, 1)
        saveTodos()
    }
    
}

// Change the status of the checkbox (completed or not)
const toggleTodo = (id) => {
    const todo = todos.find((todo) => todo.id === id)
    if (todo) {
        todo.completed = !todo.completed
        saveTodos()

    }
}


export {getTodos, removeTodo, toggleTodo, createTodo, loadTodos}