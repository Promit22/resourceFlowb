import {
  getLinks,
  createLink,
  getLinkById,
  updateLink,
  deleteLinkById
} from "../controllers/linkController.js";
import {
  response
} from "../helpers/response.js";
import {
  validateLinkData
} from"../validation/linkValidation.js";

const routes = {
  "/": {
    GET: (_req, res, _key) => {
      response(res, {
        data: {
          message: "Request successful! Try some endpoints."
        }
      });
    },
  },
  "/links": {
    GET: getLinks,
    POST: (req, res, key) => {
      validateLinkData(req, res, createLink, key);
    },
  },
  "/links/:id": {
    GET: getLinkById,
    DELETE: deleteLinkById,
    PUT: (req, res, key) => {
      validateLinkData(req, res, updateLink, key);
    },
  },
  notFound: (_req, res, _key) => {
    response(res, {
      status: 404,
      data: {
        message: "requested resource not found!"
      },
    });
  },
};

export {
  routes
};