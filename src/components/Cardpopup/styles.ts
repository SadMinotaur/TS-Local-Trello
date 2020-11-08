import styled from "styled-components";

export const PopupContent = styled.div`
    width: 100%;
    height: 100%; 
    padding: 30px
`

export const PopupText = styled.div`
    margin: 5px 0 0 0;
    font-weight: bold;
    line-height: 20px;
`

export const PopupDesc = styled.textarea`
    height: 50px;
    width: 85.5%;
    margin: 10px 0 10px 0px;
    border-radius: 2px;
    border: 0.2px solid grey;
    overflow-wrap: break-word;
    resize: none;
    overflow: hidden;
`

export const ColCard = styled.div`
    border-radius: 5px;
    background: white;
    text-align: start;
    width: 100%;
    margin: 5px 0 5px 0;
    text-indent: 10px;
    line-height: 25px;
`
export const CardName = styled.div`
    margin: 0 0 10px 0;
    font-size: 22px;
    line-height: 15px;
`

export const NameInput = styled.input`
    width: 190px;
    margin: -25px 0 5px 0;
`

export const CommentsInput = styled.textarea`
    width: 90%;
    margin: 5px;
    border-radius: 2px;
    border: 0;
    overflow-wrap: break-word;
    resize: none;
    overflow: hidden;
`

export const CommentsBorder = styled.div`
    width: 86%;
    border: 0.2px grey solid;
    border-radius: 2px
`

export const CommentsInputButton = styled.button`
    height: 30px;
    color: grey;
    background-color: white;
    border-radius: 2px;
    width: 100px;
    border: 0;
`

export const CommentsArray = styled.div`
    margin: 10px 0 0 0;
    width: 85%;
    font-weight: bold;
`