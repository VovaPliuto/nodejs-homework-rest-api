import Contact from "../../models/Contact.js";

const add = async (req, res) => {
  const contact = await Contact.create(req.body);
  res.status(201).json(contact);
};

export default add;