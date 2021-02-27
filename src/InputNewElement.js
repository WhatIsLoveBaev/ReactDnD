import React from 'react'
import { observer } from 'mobx-react'
import WithStore from './Store/StoreHOC'

 const InputNewElement = observer(({ store, groupI }) => {

    const dataBase = store.data

    const addItem = (params) => {
        const getLastItem = dataBase[params.groupI].items.length - 1
        const newList = [...dataBase]
        newList[params.groupI].items = [
          ...newList[params.groupI].items, 
          {
            text: store.newItemValue || `Айтем ${newList[params.groupI].items.length + 1}`, 
            id: newList[params.groupI].items.length ? 
            parseInt( (params.groupI + 1).toString() + (dataBase[params.groupI].items[getLastItem].id + 1).toString() ) :
            parseInt( (params.groupI + 1).toString() )
          }
        ]
    
        store.setData(newList)
        store.setNewItemValue("")
        store.setNewItem(false)
    }

    

    return (
        <div className="dnd-item">
          <input type="text" className="input-accept" onChange={(e) => store.setNewItemValue(e.target.value)} />
          <span className="accept" onClick={() => addItem( {groupI} ) }></span>
          <span className="abort" onClick={() => store.setNewItem(false)}></span>
        </div>
    )
})

export default WithStore(InputNewElement)