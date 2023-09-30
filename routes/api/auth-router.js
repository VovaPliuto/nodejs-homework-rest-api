import express from "express";

import {
  register,
  login,
  logout,
  getCurrent,
  updateSubscription,
  updateAvatar,
  verifyEmail,
  resendVerifyEmail,
} from "../../controllers/users/index.js";
import {
  userSignupSchema,
  updateSubscriptionSchema,
  userEmailSchema,
} from "../../models/User.js";
import { validateBody, upload } from "../../middlewares/index.js";
import { ctrlWrapper } from "../../helpers/index.js";
import { authenticate } from "../../middlewares/index.js";

const authController = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  getCurrent: ctrlWrapper(getCurrent),
  updateSubscription: ctrlWrapper(updateSubscription),
  updateAvatar: ctrlWrapper(updateAvatar),
  verifyEmail: ctrlWrapper(verifyEmail),
  resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
};

const authRouter = express.Router();

const userSignupValidate = validateBody(userSignupSchema);
const updateSubscriptionValidate = validateBody(updateSubscriptionSchema);
const userEmailValidate = validateBody(userEmailSchema);

authRouter.post("/register", userSignupValidate, authController.register);

authRouter.get("/verify/:verificationToken", authController.verifyEmail);

authRouter.post("/verify", userEmailValidate, authController.resendVerifyEmail);

authRouter.post("/login", userSignupValidate, authController.login);

authRouter.get("/current", authenticate, authController.getCurrent);

authRouter.post("/logout", authenticate, authController.logout);

authRouter.patch(
  "/",
  authenticate,
  updateSubscriptionValidate,
  authController.updateSubscription
);

authRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  updateAvatar
);

export default authRouter;
