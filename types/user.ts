
import { User } from "next-auth";



export interface UserResponse extends User {
  data: {
    id?: string | undefined;
    token?: string | null;
    // exp?: string | null;
    email?: string | null;
    name?: string | null;
    hasApiKey?: boolean ;
  };
};
