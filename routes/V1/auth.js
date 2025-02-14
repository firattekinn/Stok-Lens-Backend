import express from "express";
import { BadRequestResponse, GoodRequestResponse, generateToken } from "../../helpers/request.js";
import { ERROR_TYPES } from "../../enums/errorTypes.js";
import { User } from "../../mongoose/models/user.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return BadRequestResponse(ERROR_TYPES.INVALID_CREDENTIALS, res);
    }

    const user = await User.findOne({ email });
    if (!user) {
      return BadRequestResponse(ERROR_TYPES.INVALID_CREDENTIALS, res);
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return BadRequestResponse(ERROR_TYPES.INVALID_CREDENTIALS, res);
    }

    const payload = {
      user: {
        id: user._id
      },
      userIsCute: 'If see this, yes it is 🤪'
    }

    const token = await generateToken(payload);

    return GoodRequestResponse({ token, user: { id: user._id } }, res);

  } catch (error) {

    console.log("🚀 ~ auth.js:37 ~ router.post ~ error:", error);

    return BadRequestResponse(ERROR_TYPES.UNKNOWN_ERROR, res);
  }
});


router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return BadRequestResponse(ERROR_TYPES.USER_EXISTS, res)
    }

    const newUser = new User({ email, password });
    await newUser.save();


    return GoodRequestResponse({ message: 'User registered successfully' }, res);
  } catch (error) {

    console.log("🚀 ~ auth.js:58 ~ router.post ~ error:", error);

    return BadRequestResponse(ERROR_TYPES.UNKNOWN_ERROR, res);
  }

});

export { router as AuthRouter };