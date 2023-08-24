import { useEffect } from "react";
import { FiTrash ,FiEdit3, FiSave } from "react-icons/fi";

export default function ToDoList({ toDoList, handleDelete, dispatch, currentId }) {

    //change
    const handleEditChange = (event, id, isEdit) => {
        let temp;
        if (event.target === undefined ) temp = event;
        else temp = event.target.value;

        dispatch({
            type: 'changed',
            id: id,
            event: temp,
            isEdit: isEdit
        })

        
    };
    return (
        <ul id="todo-list">
        {toDoList.map((todo) => (
            
            <li key={todo.id}>
                <input type="checkbox" />
                {todo.isEdit ? (
                    <input
                        id="todo-input"
                        type='text'
                        value={todo.task}
                        onChange={(e) => handleEditChange(e, todo.id ,todo.isEdit)} 
                        autoFocus
                    />
                ) : (
                    <p id="todo-p">{todo.task}</p>
                )}
                {!todo.isEdit ?                     
                (<section>
                    <button onClick={() => handleEditChange(todo.task, todo.id,!todo.isEdit)} >
                        <FiEdit3 />
                    </button>
                    <button onClick={() => handleDelete(todo.id)}>
                        <FiTrash />
                    </button> 
                </section>
                ) : (
                    <button onClick={() => handleEditChange(todo.task, todo.id,!todo.isEdit)}><FiSave /></button>
                )}
            </li>
        ))}
    </ul>
    )
}