import React from 'react';
import './App.css';
import { observer } from 'mobx-react'
import StoreProvider from './Store/Store'
import Cards from './Cards'

const App = observer(() => {
  return (
    <StoreProvider>
      <div className="App">
        <div className="App-body">
          <div className="drag-n-drop">
            <Cards />
          </div>
        </div>
      </div>
    </StoreProvider>
  );
})

export default App;