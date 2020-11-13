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

export const UserCommentBar = styled.div`
  display: flex;
  font-size: 10px;
`

export const CommentBorders = styled.div`
  text-indent: 5px;
  margin: 5px;
`