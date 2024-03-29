import { renderTodos } from './views'
import {setFilters} from './filters'
import {createTodo, loadTodos} from './todos'

renderTodos()



document.querySelector('#search-text').addEventListener('input', (e) => {
    setFilters({
        searchText: e.target.value
    })
    renderTodos()
})

document.querySelector('#new-todo').addEventListener('submit', (e) => {
    e.preventDefault()
    const text = e.target.elements.newTodo.value.trim()
    if(text.length > 0)
    {
        createTodo(text)
        renderTodos()
        e.target.elements.newTodo.value = ''
    }
    
})

document.querySelector('#hide-completed').addEventListener('change', (e) => {
    setFilters({
        checked: e.target.checked
    })
    renderTodos()
})



window.addEventListener('storage', (e) => {
    if(e.key === 'todos')
    {
        loadTodos()
        renderTodos()
    }
    
})