import {
  getLinks as getAllLinks,
  getLinkById as getById
} from "../services/linkService.js";
import {
  response
} from "../helpers/response.js";
import {
  writeDataAsync
} from "../helpers/fileHelperAsync.js";

const createLink = async (req, res) => {
  try {
    let body = req.body;
    const links = await getAllLinks();

    const foundLink = links.find((link) => link.link === body.link);

    if (foundLink) {
      return response(res, {
        data: {
          message: `'${body.link}' already exists!`
        },
        status: 409,
      });
    }

    body.id = links.length + 1;
    links.push(body);

    await writeDataAsync(links);

    response(res, {
      data: links, status: 201
    });
  } catch (error) {
    response(res, {
      status: 400, data: {
        message: error.message
      }
    });
  }
};
const getLinks = async (req, res) => {
  try {
    const links = await getAllLinks();

    response(res, {
      data: links
    });
  } catch (error) {
    response(res, {
      status: 400, data: {
        message: error.message
      }
    });
  }
};

const getLinkById = async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const link = await getById(id);

    const data = link ? link: {
      message: `link not found for id '${id}'`
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

const updateLink = async (req, res) => {
  try {
    const {
      id
    } = req.params;
    let links = await getAllLinks();

    const foundLink = links.find((link) => link.id === Number(id));
    if (!foundLink) {
      return response(res, {
        data: {
          message: "Link not found"
        },
        status: 400,
      });
    }

    links = links.map((link) => {
      if (link.id === Number(id)) {
        return {
          ...link,
          ...req.body,
        };
      }
      return link;
    });

    await writeDataAsync(links);

    response(res,
      {
        data: links,
        status: 201,
        message: "link successfully updated",
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

const deleteLinkById = async (req, res) => {
  try {
    const {
      id
    } = req.params;
    let links = await getAllLinks();

    const foundLink = links.find((link) => link.id === Number(id));
    if (!foundLink) {
      return response(res, {
        data: {
          message: "link not found"
        },
        status: 400,
      });
    }

    links = links.filter((link) => link.id !== Number(id));

    await writeDataAsync(links);

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
  getLinks,
  createLink,
  getLinkById,
  updateLink,
  deleteLinkById
};