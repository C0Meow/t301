import styled from "styled-components";
import { IconButton } from "@mui/material";

export const Wrapper = styled.div`
  margin: 40px;
`;

export const StyledButton = styled(IconButton)`
  position: fixed;
  z-index: 100px;
  &:hover {
    transform: scale(1.1);
    transition: all 0.3s ease-out;
  }
  color: var(white);
`;
