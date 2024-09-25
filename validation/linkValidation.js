import {
  getPostBodyAsync
} from "../helpers/getPostBodyAsync.js";
import {
  response
} from "../helpers/response.js";
import {
  isValidUser
} from "./userValidation.js";

const validateLinkData = async (req, res, next, Ukey) => {
  try {
    const validUser = await isValidUser(Ukey);
    console.log(validUser);
    if (validUser) {
      const body = await getPostBodyAsync(req);
      if (!body.type || !body.link) {
        return response(res, {
          status: 400,
          data: {
            message: "Type and Link are required"
          },
        });
      }

      body.sharedBy = body.sharedBy || 'unknown user';
      body.description = body.description || 'Unavailable';

      req.body = body;

      next(req, res);
    } else {
      response(res, {
        status: 403, data: {
          message: 'Invalid api key!'
        }
      });
    }
  } catch (error) {
    console.log(error);
    response(res, {
      status: 400, data: {
        message: error.message
      }
    });
  }
};

export {
  validateLinkData
};