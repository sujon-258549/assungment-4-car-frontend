import { jwtDecode } from "jwt-decode";

export const varyFyToken = (token: string) => {
  return jwtDecode(token);
};
