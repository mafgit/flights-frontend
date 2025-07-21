export const API_BASE_URL = "http://localhost:5000/api";

export const fetchMe = async () => {
  const { userId, role } = await fetch(API_BASE_URL + "/me", {
    credentials: "include",
  }).then((res) => res.json());
  return { userId, role };
};

export const logoutUser = async () => {
  await fetch(API_BASE_URL + "/logout", {
    method: "POST",
    credentials: "include",
  }).then((res) => res.json());
};
