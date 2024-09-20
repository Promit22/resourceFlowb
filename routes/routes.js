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
    GET: (_req, res) => {
      response(res, {
        data: {
          message: "Request successful! Try some endpoints."
        }
      });
    },
  },
  "/links": {
    GET: getLinks,
    POST: (req, res) => {
      validateLinkData(req, res, createLink);
    },
  },
  "/links/:id": {
    GET: getLinkById,
    DELETE: deleteLinkById,
    PUT: (req, res) => {
      validateUserData(req, res, updateLink);
    },
  },
  notFound: (_req, res) => {
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