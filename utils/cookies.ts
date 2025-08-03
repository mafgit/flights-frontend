export const getCookie = (cookieName: string) => {
  if (typeof document === "undefined") return undefined;

  try {
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim();
      if (!cookie) continue;

      const equal = cookie.indexOf("=");

      if (equal === -1) continue;

      const [name, value] = [
        cookie.substring(0, equal),
        cookie.substring(equal + 1),
      ];

      if (name === cookieName) {
        if (value === "undefined" || value === "null" || value === "")
          return undefined;
        else return decodeURIComponent(value);
      }
    }

    return undefined;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};
