import {
  getPostBodyAsync
} from "../helpers/getPostBodyAsync.js";
import {
  response
} from "../helpers/response.js";

const validateLinkData = async (req, res, next) => {
  try {
    const body = await getPostBodyAsync(req);

    if (!body.type || !body.link) {
      return response(res, {
        status: 400,
        data: {
          message: "Type and Link are required"
        },
      });
    }

    req.body = body;

    next(req, res);
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