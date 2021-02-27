import React from 'react'
import WithStore from './Store/StoreHOC'

 const Colors = ({ group, groupI, store }) => {

    const dataBase = store.data

    const changeBackground = (val, params) => {
        let newList = [...dataBase]
        newList[params.groupI].background = val || newList[params.groupI].background
  
        store.setData(newList)
        console.log(val)
    }
    const changeColor = (val, params) => {
        let newList = [...dataBase]
        newList[params.groupI].color = val || newList[params.groupI].color
  
        store.setData(newList)
        
    }

    return (
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
    )
}

export default WithStore(Colors)