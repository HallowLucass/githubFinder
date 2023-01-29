import { createContext, useReducer } from 'react'
import alertReducer from './AlertReducer'

const AlertContext = createContext()

export const AlertProvider = ({ children }) => {
  const initialState = null

  const [state, dispatch] = useReducer(alertReducer, initialState)


  return (
    <AlertContext.Provider
      value={{
        alertState: state,
        dispatch,
      }}>
      {children}
    </AlertContext.Provider>
  )
}

export default AlertContext
