import React, { useEffect } from 'react'

export default function ListForm({name, handleNameChange}) {
    return (
        <section id='list-form'>
            <input  
                    id='list-form-input'
                    type="text" 
                    value={name} 
                    onChange={handleNameChange} 
                    placeholder='Untitled'
                    autoFocus 
                    />
        </section>
    )
}
