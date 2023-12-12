export const useGetUserInfo = () => {
  const { name, profilePhoto, userID, isAuth } =
    JSON.parse(localStorage.getItem("auth")) || {}; // Lo contrario al stringify
  return { name, profilePhoto, userID, isAuth };
};
