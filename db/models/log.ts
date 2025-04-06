import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

const LogSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    action: {
      type: String,
      required: true,
      enum: [
        "LOGIN",
        "LOGOUT",
        "REGISTER",
        "FAILED_LOGIN",
        "EMAIL_VERIFICATION",
        "VERIFY_EMAIL_REQUEST",
        "PASSWORD_RESET",
        "PASSWORD_RESET_REQUEST",
        "CREATE",
        "DELETE",
        "UPDATE",
      ],
    },
    message: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const LogModel = models?.Log || model("Log", LogSchema);
export default LogModel;
