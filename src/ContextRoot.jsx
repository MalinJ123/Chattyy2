import {useState, createContext} from "react"


export const UserContext = createContext()

const ContextRoot = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const [showLoginForm, setShowLoginForm] = useState(false);
    const [userId, setUserId] = useState ("")

    const sessionStorageKey = 'jwt-session'
    
    
    return (
        <UserContext.Provider value={{sessionStorageKey, isLoggedIn, showLoginForm, userId, setUserId, setShowLoginForm, setIsLoggedIn}}>
            {children}
        </UserContext.Provider>
    )
}

export default ContextRoot