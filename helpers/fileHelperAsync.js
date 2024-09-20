import * as fs from "node:fs/promises";

const writeDataAsync = (data) => {
  return fs.writeFile(filePath, JSON.stringify(data));
};
const filePath = "./db/db.json";
const readDataAsync = async () => {
  const rawJson = await fs.readFile(filePath);
  const data = JSON.parse(rawJson) || [];

  return data;
};

export {
  writeDataAsync,
  readDataAsync
};