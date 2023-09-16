import User from "../../models/User.js";
import { HttpError } from "../../helpers/index.js";

const updateSubscription = async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.body;

  const user = await User.findByIdAndUpdate(_id, req.body, { new: true });
  if (!user) {
    throw HttpError(404, "Not found");
  }

  res.json({
    message: `Your subscription successfully changed to ${subscription}`,
  });
};

export default updateSubscription;
