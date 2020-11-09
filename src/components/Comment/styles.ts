import styled from "styled-components";

export const UserComment = styled.div`
  box-sizing: border-box;
  word-wrap: break-word;
  line-height: 30px;
  padding: 5px;
  margin: 3px 0 0 0;
  width: 100%;
  border: grey 1px solid;
  border-radius: 2px;
  &:hover {
    background: #cbcaca;
  }
`

export const CommentEdit = styled.div`
  border: grey 1px solid;
  border-radius: 2px;
`

export const CommentInput = styled.textarea`
  margin: 3px 0 0 3px ;
  border: 0;
  line-height: 30px;
  width: 95%;
  resize: none;
`

export const UserCommentDelete = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #cbcaca;
  height: 20px;
  width: 20px;
  border-radius: 2px;
  &:hover {
    background: white;
  }
`