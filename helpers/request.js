import { JWT_SECRET } from '../config.js';
import { ERROR_TYPES } from '../enums/errorTypes.js';
import jwt from "jsonwebtoken";
import { Messages } from '../statics/errorMessage.js';

export const GoodRequestResponse = (data, res) => {
  return res.send({
    done: true,
    data
  });
};

export const BadRequestResponse = (type, res, error) => {
  var message = null

  if (type === ERROR_TYPES.NATIVE_ERROR) {
    message = error
  } else {
    message = Messages[type]?.message || Messages[ERROR_TYPES.UNKNOWN_ERROR].message;
  }


  return res.send({
    done: false,
    data: message
  });
};


export const generateToken = async (payload) => {
  const options = { expiresIn: "1d" };
  return jwt.sign(payload, JWT_SECRET, options);
};

const verifyToken = async (token) => {
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    return payload;
  } catch (error) {

    console.log("🚀 ~ request.js:66 ~ verifyToken ~ error:", error);

    return false;
  }
};

export const UserMiddleware = async (req, res, next) => {
  try {
    const { headers } = req;
    if (headers.authorization) {
      const payload = await verifyToken(headers.authorization);

      if (!payload) {
        return BadRequestResponse(ERROR_TYPES.UNAUTHORIZED, res);
      } else {
        req["user"] = payload.user;
        next();
      }
    } else {
      return BadRequestResponse(ERROR_TYPES.UNAUTHORIZED, res);
    }
  } catch (error) {

    console.log("🚀 ~ request.js:78 ~ UserMiddleware ~ error:", error);

    return BadRequestResponse(ERROR_TYPES.UNKNOWN_ERROR, res);
  }
};