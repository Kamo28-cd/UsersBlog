import AlertCard from "@/components/common/AlertCard";
import CardComponent from "@/components/common/CardComponent";
import CustomButton from "@/components/common/CustomButton";
import FlexContainer from "@/components/common/FlexContainer";
import StatusModal from "@/components/common/StatusModal";
import { IFilteredData } from "@/utils/types";
import React, { useState } from "react";
import useSWRMutation from "swr/mutation";

const Block: React.FC<IFilteredData> = ({
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
  const block = async (url: any, { arg }: { arg: string }) => {
    const requestData = {
      account_id,
      display_name,
      link,
      location,
      profile_image,
      reputation,
    };
    const followUser = () => {
      if (is_followed === true && is_blocked === false) {
        return false;
      }

      return;
    };
    const values = {
      id: account_id,
      ...requestData,
      is_followed: followUser(),
      is_blocked: !is_blocked,
    };

    await fetch(`${url}/${arg}`, {
      method: "PUT",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const { trigger } = useSWRMutation("http://localhost:4001/items", block);

  return (
    <FlexContainer flexDirection="row">
      <CustomButton
        $buttonType={"secondary"}
        onClick={() =>
          !is_blocked ? setToggleModal(true) : trigger(`${account_id}`)
        }
      >
        {is_blocked ? "unblock" : "block"}
      </CustomButton>

      {!is_blocked ? (
        <StatusModal
          toggleModal={toggleModal}
          handleClose={() => setToggleModal}
        >
          <CardComponent>
            <AlertCard
              type={"warning"}
              heading={"Are you sure?"}
              messages={
                is_followed
                  ? [`Blocking ${display_name} will also unfollow them...`]
                  : [
                      `You won't be able to interact with ${display_name} if you continue...`,
                    ]
              }
              feedback={" "}
            />
            <CustomButton
              $buttonType={"primary"}
              onClick={() => {
                trigger(`${account_id}`);
                setToggleModal(false);
              }}
            >
              Continue?
            </CustomButton>
            <CustomButton
              $buttonType={"secondary"}
              onClick={() => {
                setToggleModal(false);
              }}
            >
              Cancel?
            </CustomButton>
          </CardComponent>
        </StatusModal>
      ) : null}
    </FlexContainer>
  );
};

export default Block;
