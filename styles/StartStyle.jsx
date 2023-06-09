import styled from "styled-components"

import fly from "../images/fly.jpeg"

// Message

export const MessageField = styled.div `
    min-height: 50px;
    background: rgb(208,223,37);
    background: linear-gradient(128deg, rgb(208, 227, 0) 0%, rgb(68, 146, 80) 100%);
    color: #f1f1f1;
    width: 100%;
    font-size: 30px;
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: center;
    border-radius: 6.5px;
`


// Hero Image

export const HeroImage = styled.div `
    width: 100%;
    height: 395px;
    background-size: cover;
    background-image: url('${fly}');
    background-repeat: no-repeat;
    border-radius: 6.5px;
    display: grid;
    justify-content: right;
    align-items: center;
`

export const HeroImageText = styled.p `
    font-size: 32px;
    font-weight: 500;
    margin-right: 1.25em;
    margin-top: 7em;
    color: black;
`

// Title & Texts

export const TitleContainer = styled.div `
    width: 100%;
    min-height: 46px;
    display: grid;
    place-content: center;
`

