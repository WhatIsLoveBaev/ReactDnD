import React, { createContext } from 'react';
import { useLocalStore, useObserver } from "mobx-react"

export const StoreContext = createContext()

const StoreProvider = ({ children }) => {
    const store = useLocalStore(() => ({
        data: [
            {title: 'Сделать', color: '#000000', background: '#d3a1a1',  id: 'do', items: [{text: 'Понять', id: 1}, {text: 'Купить хлеб', id: 2}, {text: 'Поработать', id: 3}]},
            {title: 'Вылоняется', color: '#000000', background: '#d5d2af', id: 'process', items: [{text: 'Подумать', id: 4}, {text: 'Разобрать', id: 5}]},
            {title: 'Готово', color: '#000000', background: '#add7a7', id: 'finish', items: [{text: 'Написать код', id: 6}]}
        ],
        dragging: false,
        draggingCard: false,
        newItem: { open: false, groupI: 0 },
        newCard: false,
        newItemValue: '',
        newCardValue: '',

        setDragging: bool => { store.dragging = bool },
        setDraggingCard: bool => { store.draggingCard = bool },
        setNewItem: (bool, groupI) => {  store.newItem = { open: bool, groupI: groupI || 0 } },
        setNewCard: bool => { store.newCard = bool },
    
        setData: data => { store.data = data },

        setNewItemValue: value => { store.newItemValue = value },
        setNewCardValue: value => { store.newCardValue = value },

        get getData() {
            return store.data
        }
    }))
    return (
        <StoreContext.Provider value={store} >{children}</StoreContext.Provider>
    )
}

export default StoreProvider