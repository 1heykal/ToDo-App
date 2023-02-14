import { getTodos, toggleTodo, removeTodo } from "./todos" 
import { getFilters } from "./filters"

// Render application todos based on filters
const renderTodos = () => {
    const todos  = getTodos()
    const {searchText, checked} = getFilters()
    const todoElement = document.querySelector('#todos')
    let filterTodos = todos.filter((todo) => todo.text.toLowerCase().includes(searchText.toLowerCase()))

    filterTodos = filterTodos.filter((todo) => {
        if (checked) {
            return !todo.completed
        }
        else {
            return true
        }
    })

    todoElement.innerHTML = ''
    if(filterTodos.length > 0)
    {
        generateSummaryDOM(filterTodos)
        filterTodos.forEach((todo) => {
            generateTodoDOM(todo)
        })
       
    } else {
        const emptyMessage = document.createElement('p')
        emptyMessage.classList.add('empty-message')
        emptyMessage.textContent = 'No to-dos to show'
        todoElement.appendChild(emptyMessage)
        
    }
   
   
}



// Get the DOM elements fot an individual todo
const generateTodoDOM = (todo) => {
    // Creating the todo elements 
    const filteredTodo = document.createElement('label')
    const containerElement = document.createElement('div')
    const completedCheckbox = document.createElement('input')
    const todoText = document.createElement('span')
    const deleteButton = document.createElement('button')

    // Setup the completed checkbox
    completedCheckbox.setAttribute('type', 'checkbox')
    completedCheckbox.checked = todo.completed
    containerElement.appendChild(completedCheckbox)
    completedCheckbox.addEventListener('change', () => {
        toggleTodo(todo.id)
        renderTodos()
    })

    // Setup the todo text
    if (todo.text.length > 0) {
        todoText.textContent = todo.text
    }
    containerElement.appendChild(todoText)

      // setup container
      filteredTodo.classList.add('list-item')
      containerElement.classList.add('list-item__container')
      filteredTodo.appendChild(containerElement)

    // Setup the delete todo button
    deleteButton.textContent = 'remove'
    deleteButton.classList.add('button', 'button--text')
    filteredTodo.appendChild(deleteButton)
    deleteButton.addEventListener('click', () => {
        removeTodo(todo.id)
        renderTodos()
    })

    // Show the whole todo
    document.querySelector('#todos').appendChild(filteredTodo)
}


// Get the DOM elements for list Summary
const generateSummaryDOM = (filterTodos) => {
    const todosLeft = filterTodos.filter((todo) => !todo.completed)
    const todosLeftNum = todosLeft.length
    const plural =  todosLeftNum === 0 || todosLeftNum > 1 ? 's' : '' 
    const newParagraph = document.createElement('h2')
    newParagraph.classList.add('list-title')  
    newParagraph.textContent = `You have ${todosLeftNum} todo${plural} left`
    document.querySelector('#todos').appendChild(newParagraph)

}

export {renderTodos}