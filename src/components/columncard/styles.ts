import styledComponentsTS from 'styled-components-ts'
import styled from "styled-components";

export const CardContainer = styled.div`
    width: 100%;
    height: 100%;
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

export const CardComments = styled.div`
    margin: 0 0 0 2px;
    font-size: 7px;
`

interface CardContentProps {
  empty: boolean;
}

export const CardContent = styledComponentsTS<CardContentProps>(styled.div)`
    text-indent: 10px;
    padding: ${props => props.empty ? '7px 0 7px 0' : '7px 0 0 0'};
    font-size: 15px;
    line-height: 15px;
`

export const EditCardButton = styledComponentsTS<CardContentProps>(styled.div)`
    margin: ${props => props.empty ? '-28px  0 0 200px' : '-20px  0 0 200px'};
`

export const NameInput = styled.input`
    width: 190px;
    margin: -25px 0 5px 0;
`

export const PopupContent = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
`

export const PopupTitle = styled.div`
    margin: 5px 0 0 0;
    font-weight: bold;
    line-height: 20px;
`

export const PopupDesc = styled.input`
    height: 50px;
    width: 200px;
    margin: 10px 0 10px 0;
`

export const Comments = styled.div`
    margin: 10px 0 0 0;
    font-weight: bold;
    line-height: 30px;
`

export const CommentsInput = styled.input`
    width: 220px;
`

export const UserComment = styled.div`
    width: 220px;
    border: grey 1px solid;
`