import React from 'react'
import { observer } from 'mobx-react'
import InputNewElement from './InputNewElement'
import WithStore from './Store/StoreHOC'

 const Items = observer(({ group, groupI, store, handleDragEnter, dragItem, dragNode }) => {

    const dataBase = store.data

    const handleDragStart = (e, params) => {
        if (e.target.classList[0].includes('item')) {
          dragItem.current = params
          dragNode.current = e.target
          dragNode.current.addEventListener('dragend', handleDragEnd)
          setTimeout(() => {
            store.setDragging(true)
          }, 0)
        }
        
    }
    const handleDragEnd = () => {
        store.setDragging(false)
        dragNode.current.removeEventListener('dragend', handleDragEnd)
        dragItem.current = null
        dragNode.current = null
      }

    const getStyles = (params) => {
        const currentItem = dragItem.current
        if (currentItem.groupI === params.groupI && currentItem.itemI === params.itemI) {
          return 'current dnd-item'
        }
        return 'dnd-item'
     }

    const removeItem = (params) => {
      let newList = JSON.parse(JSON.stringify(dataBase))

      newList[params.groupI].items.splice(params.itemI, 1)

      store.setData(newList)
    }

     

    return (
        <>
        {group.items.map((item, itemI) => {
            const id = item.id
            const text = item.text
            return (
              <div 
                  key={id} 
                  className={store.dragging ? getStyles({groupI, itemI}) : "dnd-item"}
                  style={{ background: group.background, color: group.color }}
                  draggable
                  onDragStart={(e) => handleDragStart(e, {groupI, itemI})}
                  onDragEnter={store.dragging ? (e) => handleDragEnter(e, {groupI, itemI}) : null}
              >
                  {text}
                  <span className="remove" onClick={() => removeItem({groupI, itemI})}></span>
              </div>
            )
        })}
        {
          store.newItem.open && groupI === store.newItem.groupI ? 
          <InputNewElement store={store} groupI={groupI} /> :
          <div className="dnd-item add-item" onClick={() => { store.setNewItem(true, groupI); store.setNewCard(false) }}>&nbsp;</div>
        }
        
        
        </>
    )
})

export default WithStore(Items)
