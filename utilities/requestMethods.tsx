import axios, { AxiosInstance } from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { getTokenCookie } from "@/app/utils/cookieCutter";

const BASE_URL: string | undefined = process.env.NEXT_PUBLIC_API_BASE_URL;

export const publicRequest: AxiosInstance = axios.create({
  baseURL: BASE_URL,
});

export const useUserRequest = (): AxiosInstance | null => {
  const [token, setToken] = useState<any>(null);

  const handleGetToken = async () => {
    try {
      const result: any = await getTokenCookie();
      setToken(result);
      //console.log("res", result);
    } catch (error) {
      console.error("Failed to get token:", error);
    } finally {
      console.log("token>>", token);
    }
  };

  useEffect(() => {
    handleGetToken();
  }, []);

  //const TOKEN: string | undefined = ""; //get token cookie

  if (token) {
    return axios.create({
      baseURL: BASE_URL,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  } else {
    return null;
  }
};

// export const useUserRequest = (): AxiosInstance | null => {
//   const [axiosInstance, setAxiosInstance] = useState<AxiosInstance | null>(null);

//   useEffect(() => {
//     getTokenCookie().then((result) => {
//       const token = result;

//       if (token) {
//         setAxiosInstance(
//           axios.create({
//             baseURL: BASE_URL,
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "application/json",
//             },
//           })
//         );
//       }
//     });
//   }, []);

//   return axiosInstance;
// };

export const useFileRequest = (): AxiosInstance | null => {
  const [authState] = useContext<any>(AuthContext);
  const TOKEN: string | undefined = authState?.user?.token;

  if (TOKEN) {
    return axios.create({
      baseURL: BASE_URL,
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "multipart/form-data",
      },
    });
  } else {
    return null;
  }
};
