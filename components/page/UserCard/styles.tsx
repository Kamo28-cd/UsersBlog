"use client";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import styled, { css } from "styled-components";
import FlexContainer from "../../common/FlexContainer";

interface IStyledContainer {
  $width?: string;
}

export const StyledImage = styled.img`
  height: 65px;
  width: 65px;
  border-radius: 100px;
  border: 3px solid transparent;
  background: radial-gradient(
      circle at 30% 107%,
      #fdf497 0%,
      #fdf497 5%,
      #fd5949 45%,
      #d6249f 60%,
      #285aeb 90%
    )
    border-box;
`;

export const StyledButton = styled(Button)`
  background-color: green;
  border-radios: 100px;
`;

export const StyledContainer = styled.div<IStyledContainer>(({ $width }) => {
  return css`
    .MuiTypography-body1 {
      font-weight: 600;
      font-size: 20px;
    }

    .MuiTypography-body2 {
      font-size: 14px;
      font-style: italic;
    }

    .MuiTypography-caption {
      font-size: 14px;
      font-style: italic;
      color: green;
    }

    position: relative;
    width: ${$width ? $width + "px" : "auto"};
  `;
});

export const StyledFlexContainer = styled(FlexContainer)`
  margin: 10px;
`;

export const StyledIconContainer = styled.div`
  position: absolute;
  top: 0;
  left: -40px;

  .MuiSvgIcon-root {
    position: relative;
  }
`;
