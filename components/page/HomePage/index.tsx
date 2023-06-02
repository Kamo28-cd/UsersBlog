import { poster, useGetUser } from "@/utils/functions/fetcher";
import React, { useEffect, useMemo, useState } from "react";
import UserCard from "@/components/page/UserCard";
import FlexContainer from "@/components/common/FlexContainer";
import { Typography } from "@mui/material";
import { StyledPageContainer } from "./styles";
import LoadingComponent from "../LoadingComponent";
import ErrorComponent from "../ErrorComponent";
import useSWR from "swr";
import TextField from "@mui/material/TextField";

interface DataProps {
  items: Record<any, any>[];
}
[];

const HomePage = () => {
  const {
    data: users,
    error: isError,
    isLoading,
  } = useSWR("http://localhost:4001/items");

  // const { users, isError, isLoading } = useGetUser();

  if (isError) return <ErrorComponent />;
  if (isLoading) return <LoadingComponent />;

  let data = users as DataProps["items"];

  // useEffect(() => {

  //   // poster(data.items);
  // }, []);

  let newData: object[] = [];

  const Search = (userData: DataProps["items"]) => {
    const [search, setSearch] = useState("");
    // const [values, setValues] = useState<DataProps["items"]>([]);

    // setValues(userData);

    const filteredUsers = useMemo(() => {
      return Object.values(userData).filter((v) =>
        v.display_name.toLowerCase().includes(search.toLowerCase())
      );
    }, [userData, search]);

    return (
      <FlexContainer flexDirection="column" $width="100%">
        <TextField
          type="text"
          value={search}
          label="Search User"
          onChange={(e) => setSearch(e.target.value)}
          variant="outlined"
          fullWidth={true}
        />

        {filteredUsers.map((users) => (
          <UserCard
            key={users.id}
            account_id={users.account_id}
            display_name={users.display_name}
            link={users.link}
            location={users.location}
            profile_image={users.profile_image}
            reputation={users.reputation}
            is_followed={users.is_followed}
            is_blocked={users.is_blocked}
          />
        ))}
      </FlexContainer>
    );
  };

  // let setUploadData = () => {
  //   for (const i of data.items) {
  //     newData.push({
  //       id: i["account_id"],
  //       account_id: i["account_id"],
  //       display_name: i["display_name"],
  //       link: i["link"],
  //       location: i["location"],
  //       profile_image: i["profile_image"],
  //       reputation: i["reputation"],
  //       is_followed: false,
  //       is_blocked: false,
  //     });
  //   }
  // };

  // console.log(newData);

  // setUploadData();

  return (
    <FlexContainer flexDirection="column">
      <StyledPageContainer>
        <Typography variant="h3" sx={{ padding: 5 }}>
          Stack Overflow Users
        </Typography>
        <Search {...data} />
      </StyledPageContainer>
    </FlexContainer>
  );
};

export default HomePage;
