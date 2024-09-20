import {
  getUsers as getAllUsers,
  getUserById as getById
} from "../services/userSevice.js";
import {
  response
} from "../helpers/response.js";
import {
  writeDataAsync
} from "../helpers/fileHelperAsync.js";

const createUser = async (req, res) => {
  try {
    let body = req.body;
    const users = await getAllUsers();

    const foundUser = users.find((user) => user.name === body.name);

    if (foundUser) {
      return response(res, {
        data: {
          message: `'${body.name}' already exists!`
        },
        status: 409,
      });
    }

    body.id = users.length + 1;
    users.push(body);

    await writeDataAsync(users);

    response(res, {
      data: users, status: 201
    });
  } catch (error) {
    response(res, {
      status: 400, data: {
        message: error.message
      }
    });
  }
};
const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers();

    response(res, {
      data: users
    });
  } catch (error) {
    response(res, {
      status: 400, data: {
        message: error.message
      }
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const {
      id
    } = req.params;

    const user = await getById(id);

    const data = user ? user: {
      message: `user not found for id '${id}'`
    };
    response(res, {
      data
    });
  } catch (error) {
    response(res, {
      status: 400, data: {
        message: error.message
      }
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const {
      id
    } = req.params;
    let users = await getAllUsers();

    const foundUser = users.find((user) => user.id === Number(id));
    if (!foundUser) {
      return response(res, {
        data: {
          message: "user not found"
        },
        status: 400,
      });
    }

    users = users.map((user) => {
      if (user.id === Number(id)) {
        return {
          ...user,
          ...req.body,
        };
      }
      return user;
    });

    await writeDataAsync(users);

    response(res,
      {
        data: users,
        status: 201,
        message: "user successfully updated",
      });
  } catch (error) {
    response(res,
      {
        status: 400,
        data: {
          message: error.message
        }
      });
  }
};

const deleteUserById = async (req, res) => {
  try {
    const {
      id
    } = req.params;
    let users = await getAllUsers();

    const foundUser = users.find((user) => user.id === Number(id));
    if (!foundUser) {
      return response(res, {
        data: {
          message: "user not found"
        },
        status: 400,
      });
    }

    users = users.filter((user) => user.id !== Number(id));

    await writeDataAsync(users);

    response(res, {
      status: 204
    });
  } catch (error) {
    response(res, {
      status: 400, data: {
        message: error.message
      }
    });
  }
};

export {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUserById
};