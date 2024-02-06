import styled from "styled-components";
import { IconButton } from "@mui/material";

export const Wrapper = styled.div`
  margin: 40px;
`;

export const StyledButton = styled(IconButton)`
  position: fixed;
  z-index: 100px;
  right: 20px;
  top: 20px;
  &:hover {
    transform: scale(2);
    transition: all 0.3s ease-out;
  }
`;
