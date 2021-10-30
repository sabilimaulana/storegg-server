const User = require("./model");
const bcrypt = require("bcryptjs");

module.exports = {
  viewSignin: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");

      const alert = { message: alertMessage, status: alertStatus };

      if (req.session.user === null || req.session.user === undefined) {
        res.render("admin/user/view_signin", {
          alert,
        });
      } else {
        res.redirect("/dashboard");
      }

      res.render("admin/user/view_signin", { alert });
    } catch (error) {
      req.flash("alertMessage", `${error?.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/");
    }
  },
  actionSignin: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (user) {
        if (user?.status === "Y") {
          const checkPassword = await bcrypt.compare(password, user.password);
          if (checkPassword) {
            req.session.user = {
              id: user._id,
              email: user.email,
              status: user.status,
              name: user.name,
            };

            res.redirect("/dashboard");
            return;
          } else {
            req.flash("alertMessage", "Kata sandi yang anda inputkan salah");
            req.flash("alertStatus", "danger");
            res.redirect("/");
            return;
          }
        } else {
          req.flash("alertMessage", "Mohon maaf status anda tidak aktif");
          req.flash("alertStatus", "danger");
          res.redirect("/");
          return;
        }
      } else {
        req.flash("alertMessage", "Email yang anda inputkan salah");
        req.flash("alertStatus", "danger");
        res.redirect("/");
      }
    } catch (error) {
      req.flash("alertMessage", `${error?.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/");
    }
  },
};
