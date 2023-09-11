import Contact from "../../models/Contact.js";
import { ctrlWrapper } from "../../helpers/index.js";

const getAll = async (req, res) => {
  const contacts = await Contact.find({}, "-createdAt -updatedAt");
  res.json(contacts);
};

export default getAll;
