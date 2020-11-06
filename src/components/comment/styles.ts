import styled from "styled-components";

export const UserComment = styled.div`
    margin: 3px;
    width: 220px;
    border: grey 1px solid;
    border-radius: 2px;
    &:hover {
      background: #cbcaca;
    }
`

export const UserCommentDelete = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    margin: -30px 0 0 200px;
    background: #cbcaca;
    height: 20px;
    width: 20px;
    border-radius: 2px;
    &:hover {
      background: white;
    }
`