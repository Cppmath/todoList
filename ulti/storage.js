const TODOS_KEY = 'TODOSs'
export default {
    get: () => { 
        return JSON.parse(localStorage.getItem(TODOS_KEY)) || []
    },
    set: (todos) => localStorage.setItem(TODOS_KEY, JSON.stringify(todos))
}