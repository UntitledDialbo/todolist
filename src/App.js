import React, {useEffect, useState} from "react"
import { v4 as uuidv4 } from 'uuid'
import { randomColor } from 'randomcolor'
import Draggable from "react-draggable"
import './App.css';

function App() {
  const [item, setItem] = useState('')
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem('items')) || []
  )
  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items))
  }, [items])

  const newItem = () => {
    if(item.trim() !== ''){
      const newItem = {
        id: uuidv4(),
        item: item,
        color: randomColor({
          luminosity: "light"
        }),
        defaultPos: {
          x: 500,
          y: -500
        }
      }
      setItems((items) => [...items, newItem])
      setItem('')
    }else{
      alert("Enter your task!")
      setItem('')
    }
  }
  const deleteNode = (id) =>  {
   setItems([...items].filter((item) => item.id !== id))
  }
  const updatePos = (data,index) => {
    let newArray = [...items]
    newArray[index].defaultPos = { x: data.x, y: data.y}
    setItems(newArray)
  }

  return (
    <div className="App">
      <div className="wrapper">
        <input 
        value={item}
        type="text" 
        className="input" 
        placeholder="Enter your task"
        onChange={(e) => setItem(e.target.value)}
        />
        <button 
        className="enter"
        onClick={newItem}
        >Enter</button> 
      </div>
      {
        items.map((item, index) => {
          return (
            <Draggable 
            key={index}
            defaultPosition={item.defaultPos}
            onStop={(_,data) => {
              updatePos(data, index)
            }}
            >
                <div className="todo-item" style={{backgroundColor: item.color}}>
                      {`${item.item}`}
                      <button className="delete" onClick={() => deleteNode(item.id)}>
                        x
                      </button>
                </div>
            </Draggable>
          )
        })
      }
    </div>
  );
}

export default App;
