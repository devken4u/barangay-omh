import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

const BarangayOfficialSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    position: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "barangayofficialpositions",
    },
    titles: {
      type: String,
    },
    image_url: {
      type: String,
    },
    public_id: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const BarangayOfficialModel =
  models?.BarangayOfficial || model("BarangayOfficial", BarangayOfficialSchema);
export default BarangayOfficialModel;
