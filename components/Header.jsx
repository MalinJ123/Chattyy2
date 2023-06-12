import { useContext, useState } from "react";
import {NavActionBox, NavBody, LoginNavLinkBtn, NavLinkBtn, NavLogo, NavLogoBox, NavMobileBox, NavPlaceholder, NavSideBox, ImposterNavLinkBtn, LoginNavBtn} from "../styles/HeaderStyle";
import LoginForm from "./Login";
import "./Header.css"
import { UserContext } from "../src/ContextRoot";
import SettingsNavBar from "./SettingsNav";

function NavLinks() {
	return (
		<>
			<NavLinkBtn to="/">Hem</NavLinkBtn>
			<NavLinkBtn to="/public">Publik sida</NavLinkBtn>
		</>
	)
}

function Header() {
	const [showMobileNav, setShowMobileNav] = useState(false);
	const [showAdminSettings, setShowAdminSettings] = useState(false);

    const {showLoginForm, setShowLoginForm} = useContext(UserContext);

	const {isLoggedIn} = useContext(UserContext);

	return (
        <div className="header-div">
		<NavPlaceholder>
			<NavBody>
				<NavSideBox>
					<NavLinks />
				</NavSideBox>
				<NavLogoBox>
					<NavLogo to="/">chat app</NavLogo>
				</NavLogoBox>
				<NavActionBox>
					<ImposterNavLinkBtn  onClick={() => setShowMobileNav(!showMobileNav)} title="Meny"><span className="material-symbols-outlined">menu</span></ImposterNavLinkBtn>
					{!isLoggedIn &&
					<LoginNavBtn onClick={() => setShowLoginForm(!showLoginForm)}  ><span className="material-symbols-outlined">login</span></LoginNavBtn>
					
					}
					{
						isLoggedIn && (
							<LoginNavLinkBtn onClick={() => setShowAdminSettings(!showAdminSettings)} >
								<span className="material-symbols-outlined">settings</span>
							</LoginNavLinkBtn>
						)
					}
				</NavActionBox>
			</NavBody>
			{
                showMobileNav &&(
                    <NavMobileBox>
						<NavLinks />
					</NavMobileBox>
				)
			}
		</NavPlaceholder>
        
        {showLoginForm &&  
			<LoginForm/>

        }


        {showAdminSettings && 
        <SettingsNavBar/>
        
        }
            </div>

	);
}

export default Header;
