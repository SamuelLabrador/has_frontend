import React from 'react'
import Todo from './Todo'
export default function TodoList({todos,toggleTodo}) {
    return (
        todos.map(todo =>{
            //Calls Todo component, make sure to have unique key
            return <Todo key={todo.id} todo={todo} toggleTodo={toggleTodo} />
            
        })

    )

}