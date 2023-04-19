import storage from './ulti/storage.js'

const init = {
    todos: storage.get(),
    filter: 'all',
    filters: {
        all: () => true,
        active: todo => !todo.completed,
        completed: todo => todo.completed
    },
    editIndex: null
}

const actions = {
    add: ({ todos },title) => {
        if(title) {
            todos.push({
                id: todos.length,
                title,
                completed: false
            })
            storage.set(todos)
        }
    },

    toggle: ({ todos }, index) => {
        todos[index].completed = !todos[index].completed
        storage.set(todos)
    },

    toggleAll: ({ todos }, completed) => {
        todos.forEach(todo => {
            todo.completed = completed
        });
        storage.set(todos)
    },

    destroy: ({ todos }, id) => {
        todos.splice(id,1)
        if(todos[0]){
            todos.forEach((todo,index) => todo.id = index)

            // var fakeTodo = todos[0]
            // if(fakeTodo.id ===1){
            //     fakeTodo.id = 0;
            // }
            // todos.forEach(todo => {
            //    if(todo.id - fakeTodo.id === 2){
            //     todo.id = todo.id -1;
            //    }
            //    fakeTodo = todo
            // })
        }
        storage.set(todos)
    },

    filterHandle: (state, loc) => { //chu y: tham bien tham tri truyen state la tham bien.
        state.filter = loc
    },

    clearCompleted(state){
        state.todos = state.todos.filter(todo => todo.completed === false)
    },

    startEdit: (state, id) => {
        state.editIndex = id
    },

    endEdit(state, title, id){
        if(title){
            state.todos[state.editIndex].title = title
            state.editIndex = null
        } else {
            this.destroy(state,id)
            state.editIndex = null
        }
        storage.set(state.todos)
    },

    cancleEdit: (state) => {
        state.editIndex = null
    }

}

export default function reducer(state = init, action, args){
    actions[action] && actions[action](state,...args)
    return state
}
