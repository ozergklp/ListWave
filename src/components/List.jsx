import React, { useEffect } from 'react'
import { FiTrash } from "react-icons/fi";

export default function List({lists, handleSetCurrentList, handleDeleteList,handleCreateList}) {
  return (
    <>
    <ul id='list'>
    {lists.map(tlist => (
      <li key={tlist.id} >
        <input  id='list-input'
                type="text"  
                value={tlist.name} 
                placeholder='Untitled'  
                onClick={() => handleSetCurrentList(tlist)} readOnly />
        <button onClick={() => handleDeleteList(tlist.id)}><FiTrash /></button>
      </li>
    ))}
  </ul>
  </>
  )
}
