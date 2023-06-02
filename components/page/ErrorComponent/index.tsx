import AlertCard from "@/components/common/AlertCard";
import CardComponent from "@/components/common/CardComponent";
import StatusModal from "@/components/common/StatusModal";
import React from "react";

const ErrorComponent = () => (
  <StatusModal toggleModal={true}>
    <CardComponent>
      <AlertCard
        type={"error"}
        heading={"Oops, Something went wrong"}
        messages={["Failed load, please try again..."]}
        feedback={" "}
      />
    </CardComponent>
  </StatusModal>
);
export default ErrorComponent;
