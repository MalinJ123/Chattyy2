import {useState, createContext} from "react"

export const LoginContext = createContext()

const ContextRoot = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const [showLoginForm, setShowLoginForm] = useState(false);

    
    
    return (
        <LoginContext.Provider value={{isLoggedIn, showLoginForm, setShowLoginForm, setIsLoggedIn}}>
            {children}
        </LoginContext.Provider>
    )
}

export default ContextRoot