import React, { useRef } from 'react'
import InputNewCard from './InputNewCard'

import Colors from './Colors'
import Items from './Items'
import { observer } from 'mobx-react'

import WithStore from './Store/StoreHOC'

const Cards = observer(({ store }) => {

    const dataBase = store.data

    const dragItem = useRef()
    const dragNode = useRef()

    const dragItemCard = useRef()
    const dragNodeCard = useRef()

    const dragStartCard = (e, params) => {
        if (!e.target.classList[0].includes('item')) {
          dragItemCard.current = params
          dragNodeCard.current = e.target
          dragNodeCard.current.addEventListener('dragend', dragEndCard)
          setTimeout(() => {
            store.setDraggingCard(true)
          }, 0)
        }
    }

      const dragEndCard = () => {
          
        store.setDraggingCard(false)
        dragNodeCard.current.removeEventListener('dragend', dragEndCard)
        dragItemCard.current = null
        dragNodeCard.current = null
      }
    
      const handleDragEnter = (e, params) => {
        const currentItem = dragItem.current
        if (e.target !== dragNode.current) {
            let newList = JSON.parse(JSON.stringify(dataBase)) /* [...oldList] */
            newList[params.groupI].items
              .splice(params.itemI, 0, newList[currentItem.groupI].items.splice(currentItem.itemI, 1)[0])
            dragItem.current = params
    
            store.setData(newList)
        }
      }
    
      const dragEnterCard = (e, params) => {
        const currentCard = dragItemCard.current
        const target = e.target.classList[0].includes("dnd-group") ? e.target : undefined
        if (target !== undefined && target !== dragNodeCard.current) {
            let newList = JSON.parse(JSON.stringify(dataBase))
            newList
              .splice(params.groupI, 0, newList.splice(currentCard.groupI, 1)[0] )
              dragItemCard.current = params
    
            store.setData(newList)
        }
      }

    const removeCard = (params) => {
      let newList = JSON.parse(JSON.stringify(dataBase))
      newList.splice(params.groupI, 1)

      store.setData(newList)
    }

    return (
        <>
        {dataBase.map((group, groupI) => (
        <div 
            key={group.title} 
            className={`dnd-group ${
            group.id === 'do' ? 'do' : 
            group.id === 'process' ? 'process' : 
            group.id === 'finish' ? 'finish' : ''}`}
            draggable
            
            onDragStart={(e) => dragStartCard(e, {groupI})}
            onDragEnter={store.dragging && !group.items.length ? 
            (e) => handleDragEnter(e, {groupI, itemI: 0}) : 
            store.draggingCard ? (e) => dragEnterCard(e, {groupI}) : null}
        >
            <div className="group-title">
            <div className="title">{group.title}</div>
            <div className="settings-group">
              <Colors 
                  group={group} 
                  groupI={groupI}
              />
              <span className="remove" onClick={() => removeCard({groupI})}> </span>
            </div>
            
            </div>
            <Items 
                group={group} 
                groupI={groupI} 
                dragItem={dragItem} 
                dragNode={dragNode} 
                handleDragEnter={handleDragEnter} 
            />
        </div>
        ))}
        {
          store.newCard ? 
          <InputNewCard /> :
          <div className="dnd-group add-card" onClick={() => { store.setNewCard(true); store.setNewItem(false) }}>
            <div className="group-title" >&nbsp;</div>
          </div>
        }
        
        </>
    )
})

export default WithStore(Cards)