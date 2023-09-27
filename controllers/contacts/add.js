import fs from "fs/promises";
import path from "path";

import Contact from "../../models/contact.js";

const avatarsPath = path.resolve("public", "avatars");

const add = async (req, res) => {
  const { _id: owner } = req.user;
  const { path: oldPath, filename } = req.file;
  const newPath = path.join(avatarsPath, filename);
  await fs.rename(oldPath, newPath);
  console.log(avatarsPath);
  const avatar = path.join("avatars", filename);
  const contact = await Contact.create({
    ...req.body,
    avatarURL: avatar,
    owner,
  });
  res.status(201).json(contact);
};

export default add;
