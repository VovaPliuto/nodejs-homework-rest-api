import express from "express";

import {
  register,
  login,
  logout,
  getCurrent,
  updateSubscription,
} from "../../controllers/users/index.js";
import { userSignupSchema, updateSubscriptionSchema } from "../../models/User.js";
import { validateBody } from "../../middlewares/index.js";
import { ctrlWrapper } from "../../helpers/index.js";
import { authenticate } from "../../middlewares/index.js";

const authController = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  getCurrent: ctrlWrapper(getCurrent),
  updateSubscription: ctrlWrapper(updateSubscription),
};

const authRouter = express.Router();

const userSignupValidate = validateBody(userSignupSchema);
const updateSubscriptionValidate = validateBody(updateSubscriptionSchema);

authRouter.post("/register", userSignupValidate, authController.register);

authRouter.post("/login", userSignupValidate, authController.login);

authRouter.get("/current", authenticate, authController.getCurrent);

authRouter.post("/logout", authenticate, authController.logout);

authRouter.patch("/", authenticate, updateSubscriptionValidate, authController.updateSubscription);

export default authRouter;
