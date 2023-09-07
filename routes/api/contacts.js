import express from "express";

import ctrl from "../../controllers/contacts.js";
import validateBody from "../../middlewares/validateBody.js";
import schemas from "../../schemas/contacts.js";
import { isValidId } from "../../middlewares/index.js";

const contactsRouter = express.Router();

contactsRouter.get("/", ctrl.getAll);

contactsRouter.get("/:contactId", isValidId, ctrl.getById);

contactsRouter.post("/", validateBody(schemas.addSchema), ctrl.add);

contactsRouter.delete("/:contactId", isValidId, ctrl.deleteById);

contactsRouter.put("/:contactId", isValidId, validateBody(schemas.addSchema), ctrl.updateById);

contactsRouter.patch("/:contactId/favorite", isValidId, validateBody(schemas.updateFavoriteSchema), ctrl.updateStatusContact);  

export default contactsRouter;
