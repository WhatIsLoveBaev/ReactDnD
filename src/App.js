import React, {useState, useRef, useEffect} from 'react';
import './App.css';


const data = [
  {title: 'Сделать', color: '#000000', background: '#d3a1a1',  id: 'do', items: [{text: 'Понять', id: 1}, {text: 'Купить хлеб', id: 2}, {text: 'Поработать', id: 3}]},
  {title: 'Вылоняется', color: '#000000', background: '#d5d2af', id: 'process', items: [{text: 'Подумать', id: 4}, {text: 'Разобрать', id: 5}]},
  {title: 'Готово', color: '#000000', background: '#add7a7', id: 'finish', items: [{text: 'Написать код', id: 6}]}
]

const App = () => {

  const local = JSON.parse(localStorage.getItem('trello'))

  const [list, setList] = useState(local || data)
  const [dragging, setDragging] = useState(false)
  const [draggingCard, setDraggingCard] = useState(false)

  const dragItem = useRef()
  const dragNode = useRef()

  const dragItemCard = useRef()
  const dragNodeCard = useRef()

  useEffect(() => {
    localStorage.setItem('trello', JSON.stringify(list));
  }, [list])


  const handleDragStart = (e, params) => {
    if (e.target.classList[0].includes('item')) {
      dragItem.current = params
      dragNode.current = e.target
      dragNode.current.addEventListener('dragend', handleDragEnd)
      setTimeout(() => {
        setDragging(true)
      }, 0)
    }
  }
  const dragStartCard = (e, params) => {
    if (!e.target.classList[0].includes('item')) {
      dragItemCard.current = params
      dragNodeCard.current = e.target
      dragNodeCard.current.addEventListener('dragend', dragEndCard)
      setTimeout(() => {
        setDraggingCard(true)
      }, 0)
    }
  }

  const handleDragEnter = (e, params) => {
    const currentItem = dragItem.current
    if (e.target !== dragNode.current) {
      setList(oldList => {
        let newList = JSON.parse(JSON.stringify(oldList)) /* [...oldList] */
        newList[params.groupI].items
          .splice(params.itemI, 0, newList[currentItem.groupI].items.splice(currentItem.itemI, 1)[0])
        dragItem.current = params
        return newList
      })
    }
  }

  const dragEnterCard = (e, params) => {
    const currentCard = dragItemCard.current
    console.log(e.target.classList[0]);
    const target = e.target.classList[0].includes("dnd-group") ? e.target : undefined
    if (target !== undefined && target !== dragNodeCard.current) {
      setList(oldList => {
        let newList = JSON.parse(JSON.stringify(oldList))
        newList
          .splice(params.groupI, 0, newList.splice(currentCard.groupI, 1)[0] )
          dragItemCard.current = params
        return newList
      })
    }
  }


  const handleDragEnd = () => {
    setDragging(false)
    dragNode.current.removeEventListener('dragend', handleDragEnd)
    dragItem.current = null
    dragNode.current = null
  }
  const dragEndCard = () => {
    setDraggingCard(false)
    dragNodeCard.current.removeEventListener('dragend', dragEndCard)
    dragItemCard.current = null
    dragNodeCard.current = null
  }

  const getStyles = (params) => {
    const currentItem = dragItem.current
    if (currentItem.groupI === params.groupI && currentItem.itemI === params.itemI) {
      return 'current dnd-item'
    }
    return 'dnd-item'
  }

  const addCard = () => {
    setList(oldList => {
      const newList = [...oldList, {title: `Карточка №${oldList.length + 1}`, id: oldList.length + 99, items: [], background: '#fff', color: '#000000'}]
      return newList
    })
  }

  const addItem = (e, params) => {
    setList(oldList => {
      const getLastItem = oldList[params.groupI].items.length - 1
      const newList = [...oldList]
      newList[params.groupI].items = [
        ...newList[params.groupI].items, 
        {
          text: `Айтем ${newList[params.groupI].items.length + 1}`, 
          id: newList[params.groupI].items.length ? 
          parseInt( (params.groupI + 1).toString() + (oldList[params.groupI].items[getLastItem].id + 1).toString() ) :
          parseInt( (params.groupI + 1).toString() )
        }
      ]
      return newList
    })
  }

  const changeBackground = (val, params) => {
    setList(oldList => {
      let newList = [...oldList]
      newList[params.groupI].background = val || newList[params.groupI].background
      return newList
    })
  }
  const changeColor = (val, params) => {
    setList(oldList => {
      let newList = [...oldList]
      newList[params.groupI].color = val || newList[params.groupI].color
      return newList
    })
  }
  
  return (
    <div className="App">
      <div className="App-body">
        <div className="drag-n-drop">
          {list.map((group, groupI) => (
            <div 
              key={group.title} 
              className={`dnd-group ${
                group.id === 'do' ? 'do' : 
                group.id === 'process' ? 'process' : 
                group.id === 'finish' ? 'finish' : ''}`}
              draggable
              
              onDragStart={(e) => dragStartCard(e, {groupI})}
              onDragEnter={dragging && !group.items.length ? 
                (e) => handleDragEnter(e, {groupI, itemI: 0}) : 
                draggingCard ? (e) => dragEnterCard(e, {groupI}) : null}
            >

              <div className="group-title">
                <div className="title">{group.title} </div>
                <div className="colors">
                  <input 
                    type="color" 
                    className="input-color"
                    value={group.color}
                    onChange={(e) => changeColor(e.target.value, {groupI})}
                  />
                  <input 
                    type="color" 
                    className="input-background"
                    value={group.background}
                    onChange={(e) => changeBackground(e.target.value, {groupI})}
                  />
                </div>

              </div>

                {group.items.map((item, itemI) => {
                  const id = item.id
                  const text = item.text
                  return (
                    <div 
                      key={id} 
                      className={dragging ? getStyles({groupI, itemI}) : "dnd-item"}
                      style={{ background: group.background, color: group.color }}
                      draggable
                      onDragStart={(e) => handleDragStart(e, {groupI, itemI})}
                      onDragEnter={dragging ? (e) => handleDragEnter(e, {groupI, itemI}) : null}
                    >
                      {text}
                    </div>
                  )
                  
                })}
                <div className="dnd-item add-item" onClick={(e) => addItem(e, {groupI})}>&nbsp;</div>
            </div>
          ))}
          <div className="dnd-group add-card" onClick={() => addCard()}>
            <div className="group-title" >&nbsp;</div>
          </div>
        </div>

      </div>
      
    </div>

  );
}

export default App;

