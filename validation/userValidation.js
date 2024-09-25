import TheAuthAPI from "theauthapi";

import {
  response
} from "../helpers/response.js";

const accessKey = process.env.ACCESSKEY || 'test_access_PLpYjY6e1ubUM1FxOQDbPckLnXRLclde0nCk01wWK2JeRR5cG8hwFg77VuSKUJ0J';
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

export {
  isValidUser
};