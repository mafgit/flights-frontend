import { AUTH_BASE_URL } from "./endpoints";

export const fetchMe = async () => {
  const res = await fetch(AUTH_BASE_URL + "/me", {
    credentials: "include",
  });
  const { userId, role } = await res.json();
  return { userId, role };
};

export const logoutUser = async () => {
  try {
    const res = await fetch(AUTH_BASE_URL + "/logout", {
      method: "POST",
      credentials: "include",
    });
    const { success } = await res.json();
    return success;
  } catch (e) {
    console.log(e);
    return false;
  }
};
