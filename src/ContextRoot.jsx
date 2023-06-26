import { useState, createContext } from "react";

export const UserContext = createContext();
export const sessionStorageKey = "jwt-session";
const ContextRoot = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [channels, setChannels] = useState([]);
	const [showLoginForm, setShowLoginForm] = useState(false);
	const [userId, setUserId] = useState("");
	const [userName, setUserName] = useState("");
	const [currentChannelId, setCurrentChannelId] = useState(null);

	return (
		<UserContext.Provider
			value={{
				sessionStorage,
				sessionStorageKey,
				isLoggedIn,
				showLoginForm,
				userId,
				currentChannelId,
				channels,
				userName,
				setUserId,
				setShowLoginForm,
				setIsLoggedIn,
				setCurrentChannelId,
				setChannels,
				setUserName,
			}}
		>
			{children}
		</UserContext.Provider>
	);
};

export default ContextRoot;