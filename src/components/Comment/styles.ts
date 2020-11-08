import styled from "styled-components";

export const UserComment = styled.div`
  text-indent: 10px;
  margin: 3px;
  width: 350px;
  border: grey 1px solid;
  border-radius: 2px;
  &:hover {
    background: #cbcaca;
  }
`

export const CommentInput = styled.input`
  margin: 3px;
  height: 30px;
  width: 345px;
`

export const UserCommentDelete = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  margin: -28px 0 0 325px;
  background: #cbcaca;
  height: 20px;
  width: 20px;
  border-radius: 2px;
  &:hover {
    background: white;
  }
`