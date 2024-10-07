import { createContext, useState } from "react";

export const Context = createContext()


export const SingleUserContext = ({children}) => {
    const [singlePerson, setSinglePerson] = useState(JSON.parse(localStorage.getItem('singlePerson')) || null)
    localStorage.setItem('singlePerson', JSON.stringify(singlePerson))
  return (
    <Context.Provider value={{singlePerson, setSinglePerson}}>{children}</Context.Provider>
  )
}


