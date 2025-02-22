import express from "express";

import { addSchema, updateFavoriteSchema } from "../../models/contact.js";

import {
  isValidId,
  validateBody,
  authenticate,
  upload,
} from "../../middlewares/index.js";
import { ctrlWrapper } from "../../helpers/index.js";
import {
  getAll,
  getById,
  add,
  deleteById,
  updateById,
  updateStatusContact,
} from "../../controllers/contacts/index.js";

const contactCtrl = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  deleteById: ctrlWrapper(deleteById),
  updateById: ctrlWrapper(updateById),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};

const contactAddValidate = validateBody(addSchema);
const contactUpdateFavoriteValidate = validateBody(updateFavoriteSchema);

const contactsRouter = express.Router();

contactsRouter.use(authenticate);

contactsRouter.get("/", contactCtrl.getAll);

contactsRouter.get("/:contactId", isValidId, contactCtrl.getById);

//upload.array("cover", 8)
//upload.fields([{name: "cover", maxCount: 1}, {name: "subcover", maxCount: 2}])
contactsRouter.post(
  "/",
  upload.single("avatar"),
  contactAddValidate,
  contactCtrl.add
);

contactsRouter.delete("/:contactId", isValidId, contactCtrl.deleteById);

contactsRouter.put(
  "/:contactId",
  isValidId,
  contactAddValidate,
  contactCtrl.updateById
);

contactsRouter.patch(
  "/:contactId/favorite",
  isValidId,
  contactUpdateFavoriteValidate,
  contactCtrl.updateStatusContact
);

export default contactsRouter;
