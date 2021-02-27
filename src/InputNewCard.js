import React from 'react'
import { observer } from 'mobx-react'
import WithStore from './Store/StoreHOC'

 const InputNewCard = observer(({ store }) => {

    const dataBase = store.data

    const addCard = () => {
        const newList = [...dataBase, 
          {
            title: store.newCardValue || `Карточка №${dataBase.length + 1}`, 
            id: dataBase.length + 99, 
            items: [], 
            background: '#fff', 
            color: '#000000'
          }]
    
        store.setData(newList)
        store.setNewCardValue("")
        setTimeout(() => store.setNewCard(false), 0)
    }

    return (
        <div className="dnd-group add-new-card" onClick={() => store.setNewCard(true)}>
            <div className="group-title">
                <input type="text" className="input-accept" onChange={(e) => store.setNewCardValue(e.target.value)} />
                <span className="accept" onClick={() => addCard() }></span>
                <span className="abort" onClick={() => setTimeout(() => store.setNewCard(false), 0)}></span>
            </div>
        </div>
    )
})
export default WithStore(InputNewCard)
