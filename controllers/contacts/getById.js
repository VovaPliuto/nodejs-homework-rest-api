import Contact from "../../models/contact.js";
import { HttpError } from "../../helpers/index.js";

const getById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);
  if (!contact) {
    throw HttpError(404, "Not found");
  }
  res.json(contact);
};

export default getById;
