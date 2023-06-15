import { NavLink } from "react-router-dom"
import {useContext} from "react"
import { UserContext } from "../src/ContextRoot";

const SettingsNavBar = () =>{
    const {isLoggedIn, setIsLoggedIn} = useContext(UserContext);
	const { userId, setUserId } = useContext(UserContext);
    function logOut() {
setUserId(null)
setIsLoggedIn(false)
    }
    return(
        <>
        {isLoggedIn &&
        <div className="settings-navbar">
            <div className="navlink-div">
            <NavLink to="/users"> <button className="login-btn"> Användare </button>  </NavLink>
            <NavLink to="/public"> <button className="login-btn"> Publik sida </button>  </NavLink>
            <hr />
            <NavLink to="/"> <button onClick={() => logOut()} className="login-btn"> Logga ut  </button> </NavLink>
            </div>
        </div>
        }
        
        </>
    )
}

export default SettingsNavBar