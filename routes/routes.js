import {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUserById
} from "../controllers/userController.js";
import {
  response
} from "../helpers/response.js";
import {
  validateUserData
} from"../validation/userValidation.js";

const routes = {
  "/": {
    GET: (_req, res) => {
      response(res, {
        data: {
          message: "running nodejs api"
        }
      });
    },
  },
  "/users": {
    GET: getUsers,
    POST: (req, res) => {
      validateUserData(req, res, createUser);
    },
  },
  "/users/:id": {
    GET: getUserById,
    DELETE: deleteUserById,
    PUT: (req, res) => {
      validateUserData(req, res, updateUser);
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