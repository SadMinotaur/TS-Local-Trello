import styled from "styled-components";

export const UserComment = styled.div`
  padding: 2%;
  word-wrap: break-word;
  text-indent: 10px;
  margin: 3px 0 0 0;
  line-height: 30px;
  width: 97%;
  border: grey 1px solid;
  border-radius: 2px;
  &:hover {
    background: #cbcaca;
  }
`

export const CommentInput = styled.input`
  margin: 3px;
  line-height: 30px;
  width: 98%;
`

export const UserCommentDelete = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  margin: -28px 0 0 79%;
  background: #cbcaca;
  height: 20px;
  width: 20px;
  border-radius: 2px;
  &:hover {
    background: white;
  }
`