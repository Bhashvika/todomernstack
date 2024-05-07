import React from 'react'
import { BiEdit } from "react-icons/bi"
import { AiFillDelete } from "react-icons/ai";

const Todo = ({ id, text, deletetodo, updatetodo }) => {
  return (
    <div className='todo'>
      <div className='text'>{text}</div>
      <div className='icons'>
        <BiEdit className="icon" onClick={() => updatetodo(id)} />
        <AiFillDelete className="icon" onClick={deletetodo} />
      </div>
    </div>
  )
}

export default Todo;
