import {
  readDataAsync
} from "../helpers/fileHelperAsync.js";

const getLinks = () => {
  return readDataAsync();
};

const getLinkById = async (id) => {
  const links = await getLinks();

  return links.find((link) => link.id === Number(id));
};

export {
  getLinks,
  getLinkById
};