import TheAuthAPI from "theauthapi";

import {
  response
} from "../helpers/response.js";
import {
  getPostBodyAsync
} from "../helpers/getPostBodyAsync.js";

const accessKey = process.env.ACCESSKEY;
const projectId = process.env.PROJECTID;
const theAuthAPI = new TheAuthAPI.default(accessKey, {
  retryCount: 2,
});

async function isValidUser(Xkey) {
  try {
    const isValidKey = await theAuthAPI.apiKeys.isValidKey(Xkey);
    if (isValidKey) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error.message);
    return false;
  }
}
async function generateKey(req, res, _key) {
  try {
    const body = await getPostBodyAsync(req);
    const key = await theAuthAPI.apiKeys.createKey({
      projectId: projectId,
      customMetaData: {
        metadata_val: body['name']
      },
      name: body['name'],
    });
    //console.log("Key created > ", key);
    response(res, {
      status: 200, data: {
        apiKey: key.key
      }});
  } catch (error) {
    console.log("Couldn't make the key ", error);
    response(res, {
      status: 500, data: {
        message: 'could not generate key.'
      }});
  }
}

export {
  isValidUser,
  generateKey
};
