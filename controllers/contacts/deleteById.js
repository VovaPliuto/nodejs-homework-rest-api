import Contact from "../../models/Contact.js";
import { HttpError } from "../../helpers/index.js";

const deleteById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await Contact.findByIdAndDelete(contactId);
  if (!contact) {
    throw HttpError(404, "Not found");
  }
  res.json({ message: "contact deleted" });
};

export default deleteById;