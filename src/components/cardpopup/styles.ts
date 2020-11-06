import styled from "styled-components";
import styledComponentsTS from "styled-components-ts";

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

export const ColCard = styled.div`
    border-radius: 5px;
    background: white;
    text-align: start;
    width: 100%;
    margin: 5px 0 5px 0;
    text-indent: 10px;
    line-height: 25px;
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

export const NameInput = styled.input`
    width: 190px;
    margin: -25px 0 5px 0;
`

export const CommentsArray = styled.div`
    margin: 10px 0 0 0;
    font-weight: bold;
    line-height: 30px;
`

export const CommentsInputContainer = styled.div`
    display: flex;
`

export const CommentsInput = styled.input`
    width: 220px;
`