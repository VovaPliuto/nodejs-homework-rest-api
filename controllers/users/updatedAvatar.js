import path from "path";
import fs from "fs/promises";
import Jimp from "jimp";

import User from "../../models/User.js";
import { HttpError } from "../../helpers/index.js";

const avatarDir = path.resolve("public", "avatars");

const updateAvatar = async (req, res, next) => {
  const { _id } = req.user;
  if (!req.file) { 
    return next(HttpError(404, "There is no any file"));
  }
  const { path: tempUpload, filename } = req.file;

  const image = await Jimp.read(tempUpload);
  if (!image) {
    throw HttpError(404, "There is no image");
  }
  image.resize(250, 250).write(tempUpload);

  const resultPath = path.join(avatarDir, filename);
  await fs.rename(tempUpload, resultPath);
  const avatarURL = path.join("avatars", filename);
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({ avatarURL });
};

export default updateAvatar;
