import { Outlet } from "react-router-dom"
import styled from "styled-components"

const MainBody = styled.main`
    height: 100%;
    width: 100%;
    float: left;
    display: grid;
    place-content: center;
`

function Main() {
    return (
        <MainBody>
            <Outlet />
        </MainBody>
    )
}

export default Main