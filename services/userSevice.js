import { readDataAsync } from "../helpers/fileHelperAsync.js";

const getUsers = () => {
  return readDataAsync();
};

const getUserById = async (id) => {
  const users = await getUsers();

  return users.find((user) => user.id === Number(id));
};

export { getUsers, getUserById };