import AlertCard from "@/components/common/AlertCard";
import CardComponent from "@/components/common/CardComponent";
import StatusModal from "@/components/common/StatusModal";
import React from "react";

interface ILoadingComponent {}
const LoadingComponent: React.FC<ILoadingComponent> = () => (
  <StatusModal toggleModal={true}>
    <CardComponent>
      <AlertCard
        type={"loading"}
        heading={"Loading, Please wait a moment"}
        messages={["Your data is loading..."]}
        feedback={" "}
      />
    </CardComponent>
  </StatusModal>
);

export default LoadingComponent;
