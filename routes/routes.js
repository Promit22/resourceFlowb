import {
  getLinks,
  createLink,
  getLinkById,
  updateLink
} from "../controllers/linkController.js";
import {
  response
} from "../helpers/response.js";
import {
  validateLinkData
} from"../validation/linkValidation.js";

import {
  generateKey
} from"../validation/userValidation.js";


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
    PUT: (req, res, key) => {
      validateLinkData(req, res, updateLink, key);
    },
  },
  "/keys": {
    POST: generateKey
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