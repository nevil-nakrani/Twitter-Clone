import mongoose from "mongoose";
const notificationSchema = new mongoose.Schema({
  from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ["like", "follow"],
  },
  read: {
    type: Boolean,
    default: false,
  },
});

const Notification = mongoose.model("notification", notificationSchema);
export default Notification;
