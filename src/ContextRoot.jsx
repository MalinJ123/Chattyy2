import { useState, createContext } from "react";

export const UserContext = createContext();

const ContextRoot = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [channels, setChannels] = useState([]);
	const [showLoginForm, setShowLoginForm] = useState(false);
	const [userId, setUserId] = useState("");
	const [currentChannelId, setCurrentChannelId] = useState(null);
	const sessionStorageKey = "jwt-session";

	return (
		<UserContext.Provider
			value={{
				sessionStorageKey,
				isLoggedIn,
				showLoginForm,
				userId,
				currentChannelId,
				channels,
				setUserId,
				setShowLoginForm,
				setIsLoggedIn,
				setCurrentChannelId,
				setChannels,
			}}
		>
			{children}
		</UserContext.Provider>
	);
};

export default ContextRoot;