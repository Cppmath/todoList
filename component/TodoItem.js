import html from '../core.js'
import { connect } from '../store.js'


function TodoItem({ todo , editIndex}) {
    return html`
    <li class="${todo.completed && 'completed'} ${editIndex === todo.id && 'editing'}">
        <div class="view">
            <input 
                class="toggle" 
                type="checkbox" 
                ${todo.completed && 'checked'}
                onchange = dispatch('toggle',${todo.id})
            >
            <label ondblclick = "dispatch('startEdit', ${todo.id})">
                ${todo.title}
            </label>
            <button class="destroy" onclick = "dispatch('destroy',${todo.id})"></button>
        </div>
        <input 
            class="edit" 
            value="${todo.title}"
            onkeyup = "event.keyCode === 13 && dispatch('endEdit', this.value.trim(), ${todo.id}) || 
                event.keyCode === 27 && dispatch('cancleEdit')"
            onblur = "event.keyCode === 13 && dispatch('endEdit', this.value.trim(), ${todo.id})"
        >
    </li>
    `
}

export default connect()(TodoItem)