import useSWR from "swr";

interface IRequestArgs {
  input: string;
  init: RequestInit;
}

// const input =
//     "http://api.stackexchange.com/2.2/users?pagesize=20&order=desc&sort=reputation&site=stackoverflow";
//   let init: RequestInit = {
//     headers: {
//       "Content-Type": "application/json",
//     },
//     method: "GET",
//   };

//   const args: IRequestArgs = {
//     input,
//     init,
//   };

// const fetcher = (args: IRequestArgs) => {
//   fetch(args.input, args.init)
//     .then((res) => {
//       res.json();
//       console.log("[RESPONSE]", res);
//     })
//     .catch((error) => {
//       if (error) throw error;
//     });
// };
// fetcher can also be (using axios):
// (url: string) => axios(url).then(res => res.data)
//then your hook will be
// {data} = useSWR('https://random-url')
// without adding fetcher in above if you add SWRConfig and the fetcher in you _app.tsx

export default async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const res = await fetch(input, init);
  return res.json();
}

export const useGetUser = () => {
  const url =
    "http://api.stackexchange.com/2.2/users?pagesize=20&order=desc&sort=reputation&site=stackoverflow";

  const { data, error, isLoading } = useSWR(url, fetcher);

  return {
    users: data,
    isLoading,
    isError: error,
  };
};

export const poster = (requestBody: object[]) => {
  const input = "http://localhost:4001/items";
  let init: RequestInit = {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(requestBody),
  };

  fetch(input, init)
    .then((res) => {
      res.json();
      console.log("[POSTER RESPONSE]", res);
    })
    .catch((error) => {
      console.log("[POSER ERROR]");
      if (error) throw error;
    });
};
