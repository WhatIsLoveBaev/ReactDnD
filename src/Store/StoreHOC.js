import React, { useContext } from 'react'
import { StoreContext } from './Store'

const WithStore = Component => {
    const ComponentWithStore = props => {
        const store = useContext(StoreContext)

        return <Component {...props} store={store}  />
    }
    return ComponentWithStore    
}

export default WithStore