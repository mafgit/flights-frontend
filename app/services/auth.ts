import { API_BASE_URL } from "./endpoints";

const baseUrl = API_BASE_URL + "/auth";

export const fetchMe = async () => {
  const { userId, role } = await fetch(baseUrl + "/me", {
    credentials: "include",
  }).then((res) => res.json());
  return { userId, role };
};

export const logoutUser = async () => {
  await fetch(baseUrl + "/logout", {
    method: "POST",
    credentials: "include",
  }).then((res) => res.json());
};
