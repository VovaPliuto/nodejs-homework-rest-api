import express from "express";

const contactsRouter = express.Router();

import ctrl from "../../controllers/contacts.js";

import validateBody from "../../middlewares/validateBody.js";

import addSchema from "../../schemas/contacts.js";

contactsRouter.get("/", ctrl.getAll);

contactsRouter.get("/:contactId", ctrl.getById);

contactsRouter.post("/", validateBody(addSchema), ctrl.add);

contactsRouter.delete("/:contactId",ctrl.deleteById);

contactsRouter.put("/:contactId", validateBody(addSchema), ctrl.updateById);

export default contactsRouter;
