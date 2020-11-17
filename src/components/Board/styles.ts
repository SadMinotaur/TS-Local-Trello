import styled from "styled-components";

export const ColumnsContainer = styled.div`
  padding: 10px 0 10px 0;
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  background-color: #adadbd;
  @media (max-width: 1100px) {
    justify-content: start;
  }
`;
