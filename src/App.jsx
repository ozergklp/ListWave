import React, { useState, useEffect, useReducer } from 'react'
import { v4 as uuidv4 } from 'uuid'
import './App.css'
import ToDoList from './components/ToDoList'
import ToDoForm from './components/ToDoForm'
// reducers
import todoReducer from './ToDoReducer'
import ListReducer from './ListReducer'
import List from './components/List'
import ListForm from './components/ListForm'

function App () {
  const [todos, toDoDispatch] = useReducer(todoReducer, [])
  const [lists, listDispatch] = useReducer(ListReducer, getItems())
  const [name, setName] = useState('')
  const [currentId, setCurrentId] = useState(0)

  useEffect(() => console.log('todos:',todos), [todos])
  useEffect(() => console.log('lists:',lists), [lists])
  useEffect(() => console.log('name:',name), [name])
  useEffect(() => console.log('currentId:',currentId), [currentId])

  const handleSubmit = (newTask) => {
    toDoDispatch({
      type: 'added',
      id: uuidv4(),
      task: newTask
    })
  }

  const handleDelete = (id) => {
    toDoDispatch({
      type: 'deleted',
      id
    })
  }

  const handleSaveList = () => {
    if (currentId) { 
      listDispatch({
        type: 'changedList',
        id: currentId,
        list: todos,
        name
      })
    } else {
      const newId = uuidv4();
      setCurrentId(newId)
      listDispatch({
        type: 'addedList',
        id: newId,
        list: todos,
        name
      })
    }
  }

  useEffect(() => {
    listDispatch({
      type: 'changedList',
      id: currentId,
      list: todos,
      name
    })

  }, [name])
  
  const handleNameChange = (e) => {
    const event = e.target.value
    setName(event);

    
  }

  useEffect(() => {
    localStorage.setItem('lists', JSON.stringify(lists))
  }, [lists])

  const handleCreateList = () => {
    listDispatch({
      type: 'changedList',
      id: currentId,
      list: todos,
      name
    })

    toDoDispatch({
      type: 'create'
    })
    const newId = uuidv4();
    setCurrentId(newId)
    listDispatch({
      type: 'addedList',
      id: newId,
      list: todos,
      name: 'Untitled'
    })
    setName('')

  }

  const handleSetCurrentList = (tlist) => {
    listDispatch({
      type: 'changedList',
      id: currentId,
      list: todos,
      name
    })

    toDoDispatch({
      type: 'set',
      list: tlist.list
    })

    setCurrentId(tlist.id);
    setName(tlist.name);
  }

  const handleDeleteList = (id) => {
    listDispatch({
      type: 'deletedList',
      id
    })
    if(id === currentId){
      toDoDispatch({
        type: 'create'
      })
      setCurrentId(0);  
    }

  }


  return (
    <section id='all' > 
      <section id='all-1'>
      <section id='list-section' >
      <h1>ListWave</h1>
        <button onClick={handleCreateList}
            id='create-button' >create list
        </button>
      </section>
        <List lists={lists} 
              handleSetCurrentList={handleSetCurrentList} 
              handleDeleteList={handleDeleteList}
              handleSaveList={handleSaveList}
              />
      </section>
      {currentId !== 0 &&
        <section id='all-2'>
          <aside id='forms'>
        <ListForm name={name} 
                  handleNameChange={handleNameChange}
                  handleSaveList={handleSaveList}
                  />
        <ToDoForm handleSubmit={handleSubmit} currentId={currentId}/>
        </aside>
        <ToDoList toDoList={todos} 
                  handleDelete={handleDelete} 
                  dispatch = {toDoDispatch}
                  currentId={currentId} />
      </section>

      
      }
    </section>
  )
}

const getItems = () => {
  const storedToDoList = localStorage.getItem('lists')
  return storedToDoList ? JSON.parse(storedToDoList) : []
}


export default App
