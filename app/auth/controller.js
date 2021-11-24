const Player = require("../player/model");
const config = require("../../config");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cloudinary = require("../utils/cloudinary");

module.exports = {
  signup: async (req, res) => {
    try {
      const payload = req.body;

      const player = await Player.findOne({ email: payload.email });
      if (player) {
        return res.status(422).json({
          error: 1,
          message: "Email sudah terdaftar",
          fields: "email",
        });
      }

      let player;

      if (req.file) {
        const cloudinaryRes = await cloudinary.uploader.upload(req.file.path);

        player = new Player({
          ...payload,
          avatar: cloudinaryRes.secure_url,
          avatarPublicId: cloudinaryRes.public_id,
        });
      } else {
        player = new Player(payload);
      }

      await player.save();
      delete player._doc.password;

      const token = jwt.sign(
        {
          player: {
            id: player.id,
            username: player.username,
            email: player.email,
            name: player.name,
            phoneNumber: player.phoneNumber,
            avatar: player.avatar,
          },
        },
        config.jwtKey
      );

      res.status(200).json({ data: { token } });
    } catch (error) {
      if (error && error?.name === "ValidationError") {
        return res
          .status(422)
          .json({ error: 1, message: error?.message, fields: error?.errors });
      } else {
        res
          .status(500)
          .json({ message: error.message || "Internal Server Error" });
      }
      console.log(error);
    }
  },
  signin: async (req, res) => {
    try {
      const { email, password } = req.body;

      const player = await Player.findOne({ email });

      if (player) {
        const checkPassword = bcrypt.compareSync(password, player.password);

        if (checkPassword) {
          const token = jwt.sign(
            {
              player: {
                id: player.id,
                username: player.username,
                email: player.email,
                name: player.name,
                phoneNumber: player.phoneNumber,
                avatar: player.avatar,
              },
            },
            config.jwtKey
          );

          res.status(200).json({ data: { token } });
        } else {
          res.status(403).json({ message: "Invalid Credentials" });
        }
      } else {
        res.status(403).json({ message: "Invalid Credentials" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: error.message || "Internal Server Error" });
    }
  },
};
