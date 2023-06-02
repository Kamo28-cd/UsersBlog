import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import React, { useState } from "react";
import {
  StyledImage,
  StyledButton,
  StyledContainer,
  StyledIconContainer,
  ChevronContainer,
} from "./styles";
import FlexContainer from "../../common/FlexContainer";
import CustomButton from "../../common/CustomButton";
import LinkIcon from "@mui/icons-material/Link";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import Follow from "@/components/page/Follow";
import Block from "../Block";
import GroupIcon from "@mui/icons-material/Group";
import CheckIcon from "@mui/icons-material/Check";

interface IUserCard {
  account_id: number;
  display_name: string;
  link: string;
  location: string;
  profile_image: string;
  reputation: number;
  is_followed: boolean;
  is_blocked: boolean;
}

const UserCard: React.FC<IUserCard> = ({
  account_id,
  display_name,
  link,
  location,
  profile_image,
  reputation,
  is_followed,
  is_blocked,
}) => {
  const [height, setHeight] = useState<string>();

  const requestData = {
    account_id,
    display_name,
    link,
    location,
    profile_image,
    reputation,
    is_followed,
    is_blocked,
  };

  const handleHeight = () => {
    setHeight((val) => (!val ? "200" : undefined));
  };
  return (
    <FlexContainer
      $width="650"
      $color={is_blocked ? "#e2e2e2" : "#cde7ff"}
      $height={height}
      flexDirection="column"
    >
      <FlexContainer $width="650">
        <ChevronContainer>
          {height ? (
            <ExpandLessIcon onClick={handleHeight} />
          ) : (
            <ExpandMoreIcon onClick={handleHeight} />
          )}
        </ChevronContainer>
        <div style={{ position: "relative" }}>
          <StyledImage src={profile_image} />

          {is_followed ? (
            <StyledIconContainer>
              <GroupIcon color="success" sx={{ position: "relative" }} />
              <CheckIcon color="success" sx={{ position: "relative" }} />
            </StyledIconContainer>
          ) : null}
        </div>

        <StyledContainer $width="175" className="details">
          <Typography variant="body1">{display_name}</Typography>
          <Typography variant="body2">
            {is_blocked ? "Unblock to see" : location}
          </Typography>
        </StyledContainer>
        <StyledContainer>
          <Typography variant="body2">Reputation:</Typography>
          <Typography variant="caption">
            {is_blocked ? "Unblock to see" : reputation}
          </Typography>
        </StyledContainer>
        <Link href={link}>
          <Typography variant="body2">
            <CustomButton $buttonType={"primary"}>
              <LinkIcon />
            </CustomButton>
          </Typography>
        </Link>
      </FlexContainer>
      {height ? (
        <FlexContainer flexDirection="row">
          <Follow {...requestData} />
          <Block {...requestData} />
        </FlexContainer>
      ) : null}
    </FlexContainer>
  );
};

export default UserCard;
