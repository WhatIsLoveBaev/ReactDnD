import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import './index.css';
import App from "./App"
import { observable, makeObservable, action, computed } from 'mobx'
import { observer } from 'mobx-react'

/* class StoreDND {
    data = [
      {title: 'Сделать', color: '#000000', background: '#d3a1a1',  id: 'do', items: [{text: 'Понять', id: 1}, {text: 'Купить хлеб', id: 2}, {text: 'Поработать', id: 3}]},
      {title: 'Вылоняется', color: '#000000', background: '#d5d2af', id: 'process', items: [{text: 'Подумать', id: 4}, {text: 'Разобрать', id: 5}]},
      {title: 'Готово', color: '#000000', background: '#add7a7', id: 'finish', items: [{text: 'Написать код', id: 6}]}
    ]
    dragging = false
    draggingCard = false
    newItem = { open: false, groupI: 0 }
    newCard = false
    newItemValue = ''
    newCardValue = ''
  
    setDragging(bool) { this.dragging = bool }
    setDraggingCard(bool) { this.draggingCard = bool }
    setNewItem(bool, groupI) {  this.newItem = { open: bool, groupI: groupI || 0 } }
    setNewCard(bool) {  this.newCard = bool }
  
    setData(data) { this.data = data }

    setNewItemValue(value) { this.newItemValue = value }
    setNewCardValue(value) { this.newCardValue = value }
  
    get getData() {
        return this.data
    }


    constructor() {
      makeObservable(this, {
        data: observable,
        setData: action,

        dragging: observable,
        draggingCard: observable,
        setDragging: action,
        setDraggingCard: action,

        newItemValue: observable,
        newItem: observable,
        setNewItemValue: action,
        setNewItem: action,

        newCardValue: observable,
        newCard: observable,
        setNewCardValue: action,
        setNewCard: action,
        
        getData: computed
      })
    }
  }
  
  const store = new StoreDND() */


ReactDOM.render(<App />, document.getElementById('root'));