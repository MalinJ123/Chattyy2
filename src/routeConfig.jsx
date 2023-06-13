import { createBrowserRouter } from "react-router-dom";

// Routes
import Root from "../routes/Root";
import Start from "../routes/Start";
import Public from "../routes/Public";

import Users, {loader as userLoader} from "../routes/Users";
import PostUser from "../components/AddUser";
import DmMessages from "../routes/DmMessages";
import OpenChat from "../routes/OpenChat";
import Unlocked from "../routes/UnLocked";



const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            {
                path: '',
                element: <Start />
            },
            {
                path: '/public',
                element: <Public />,
            },
            {
                path: '/users',
                element: <Users />,
                loader: userLoader
            },
            {
                path: '/user/add',
                element: <PostUser />,
            },
            {
                path: '/messages',
                element: <DmMessages username="PratgladPelle" />,
              },
              {
                path: '/openchat',
                element: <OpenChat/>,
              }, {
                path: '/unlocked',
                element: <Unlocked/>,
              },

        ]
    }
])

export { router }