import styled from "styled-components";

export const HeaderBackground = styled.div`
  top: 0;
  position: fixed;
  width: 100%;
  text-align: center;
  color: white;
  line-height: 20px;
  background-color: grey;
  z-index: -1;
`;

export const LogoutButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  font-size: 10px;
  width: 50px;
  height: 20px;
  background-color: grey;
  color: white;
  border: 0;
  border-bottom-left-radius: 2px;
  &:hover {
    background-color: lightslategrey;
  }
`;
