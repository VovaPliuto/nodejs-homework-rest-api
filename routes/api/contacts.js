import express from "express";

import validateBody from "../../middlewares/validateBody.js";
import * as contactsSchemas from "../../models/Contact.js";
import { isValidId } from "../../middlewares/index.js";
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

const contactAddValidate = validateBody(contactsSchemas.addSchema);
const contactUpdateFavoriteValidate = validateBody(
  contactsSchemas.updateFavoriteSchema
);

const contactsRouter = express.Router();

contactsRouter.get("/", contactCtrl.getAll);

contactsRouter.get("/:contactId", isValidId, contactCtrl.getById);

contactsRouter.post("/", contactAddValidate, contactCtrl.add);

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
  contactCtrl.updateStatusContact,
);

export default contactsRouter;
