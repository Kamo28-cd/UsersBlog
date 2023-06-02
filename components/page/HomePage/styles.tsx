import { StyledWrapper } from "@/components/common/FlexContainer/styles";
import styled from "styled-components";

export const StyledPageContainer = styled.div`
  width: 70vw;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  ${StyledWrapper} {
    margin: 5px;
  }
`;
