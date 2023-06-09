import { createBrowserRouter } from "react-router-dom";

// Routes
import Root from "../routes/Root";
import Start from "../routes/Start";
import Public from "../routes/Public";

import Users, {loader as userLoader} from "../routes/Users";
// import ToUpdateProduct from "../components/UpdateProduct";
import PostUser from "../components/AddUser";
// import AddProduct from "../routes/AddProduct";


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
        ]
    }
])

export { router }