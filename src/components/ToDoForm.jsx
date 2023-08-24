import React, { useEffect, useState } from 'react';

export default function ToDoForm({ handleSubmit, currentId}) {
    const [toDo, setToDo] = useState('');

    const handleToDoChange = (e) => setToDo(e.target.value);

    const submitHandler = (e) => {
        e.preventDefault();
        if(toDo !== ''){
            handleSubmit(toDo);
            setToDo('');
        }
    };
    return (
        <section id='todo-form' >
            
            <form onSubmit={submitHandler}>
            <input
                type="text"
                id="todoInput"
                value={toDo}
                onChange={handleToDoChange}
                placeholder="Enter a New Task"
            />
            <button type="submit">Add Task</button>
        </form>

        </section>
    )
}
