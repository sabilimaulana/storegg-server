const mongoose = require("mongoose");

let playerSchema = mongoose.Schema(
  {
    email: {
      type: String,
      require: [true, "email harus diisi"],
    },
    name: {
      type: String,
      require: [true, "Nama harus diisi"],
      maxlength: [255, "Panjang nama harus antara 3 - 255 karakter"],
      minlength: [3, "Panjang nama harus antara 3 - 255 karakter"],
    },
    username: {
      type: String,
      require: [true, "Username harus diisi"],
      maxlength: [255, "Panjang username harus antara 3 - 255 karakter"],
      minlength: [3, "Panjang username harus antara 3 - 255 karakter"],
    },
    password: {
      type: String,
      require: [true, "kata sandi harus diisi"],
      maxlength: [255, "Panjang password maksimal 255 karakter"],
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    avatar: {
      type: String,
    },
    fileName: {
      type: String,
    },
    phoneNumber: {
      type: String,
      require: [true, "nomor telpon harus diisi"],
      maxlength: [255, "Panjang nomor telepon harus antara 9 - 13 karakter"],
      minlength: [3, "Panjang nomor telepon harus antara 9 - 13 karakter"],
    },
    favorite: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Player", playerSchema);
