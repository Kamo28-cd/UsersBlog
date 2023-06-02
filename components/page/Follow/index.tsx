import AlertCard from "@/components/common/AlertCard";
import CardComponent from "@/components/common/CardComponent";
import CustomButton from "@/components/common/CustomButton";
import FlexContainer from "@/components/common/FlexContainer";
import StatusModal from "@/components/common/StatusModal";
import { IFilteredData } from "@/utils/types";
import React, { useState } from "react";
import useSWR, { mutate } from "swr";
import useSWRMutation from "swr/mutation";

interface IAction {
  url?: string;
  type?: "follow" | "block";
  id?: number;
}

const Follow: React.FC<IFilteredData> = ({
  account_id,
  display_name,
  link,
  location,
  profile_image,
  reputation,
  is_followed,
  is_blocked,
}) => {
  const [toggleModal, setToggleModal] = useState(false);
  const follow = async (url: any, { arg }: { arg: string }) => {
    const requestData = {
      account_id,
      display_name,
      link,
      location,
      profile_image,
      reputation,
      is_blocked,
    };
    const values = {
      id: account_id,
      ...requestData,
      is_followed: !is_followed,
    };

    await fetch(`${url}/${arg}`, {
      method: "PUT",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const { trigger } = useSWRMutation("http://localhost:4001/items", follow);

  return (
    <FlexContainer flexDirection="row">
      <CustomButton
        $buttonType={"primary"}
        onClick={() => {
          is_blocked ? setToggleModal(true) : trigger(`${account_id}`);
        }}
      >
        {is_followed ? "unfollow" : "follow"}
      </CustomButton>

      {is_blocked ? (
        <StatusModal
          toggleModal={toggleModal}
          handleClose={() => setToggleModal}
        >
          <CardComponent>
            <AlertCard
              type={"warning"}
              heading={"Ooops..."}
              messages={[
                `${display_name} is blocked, Please unblock them before following...`,
              ]}
              feedback={" "}
            />
            <CustomButton
              $buttonType={"primary"}
              onClick={() => {
                setToggleModal(false);
              }}
            >
              Cancel
            </CustomButton>
          </CardComponent>
        </StatusModal>
      ) : null}
    </FlexContainer>
  );
};

export default Follow;
