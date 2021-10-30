const Payment = require("./model");
const Bank = require("../bank/model");

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");

      const alert = { message: alertMessage, status: alertStatus };

      const payment = await Payment.find().populate("banks");

      res.render("admin/payment/view_payment", {
        payment,
        alert,
        title: "Jenis Pembayaran",
        name: req.session.user.name,
      });
    } catch (error) {
      req.flash("alertMessage", `${error?.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/payment");
    }
  },
  viewCreate: async (req, res) => {
    try {
      const banks = await Bank.find();

      res.render("admin/payment/create", {
        banks,
        title: "Tambah Jenis Pembayaran",
        name: req.session.user.name,
      });
    } catch (error) {
      req.flash("alertMessage", `${error?.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/payment");
    }
  },
  actionCreate: async (req, res) => {
    try {
      const { type, banks } = req.body;

      let payment = Payment({ type, banks });
      await payment.save();

      req.flash("alertMessage", "Berhasil tambah payment");
      req.flash("alertStatus", "success");
      res.redirect("/payment");
    } catch (error) {
      req.flash("alertMessage", `${error?.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/payment");
    }
  },
  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;

      const payment = await Payment.findOne({ _id: id }).populate("banks");
      const banks = await Bank.find();

      res.render("admin/payment/edit", {
        payment,
        banks,
        title: "Edit Jenis Pembayaran",
        name: req.session.user.name,
      });
    } catch (error) {
      req.flash("alertMessage", `${error?.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/payment");
    }
  },
  actionEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const { type, banks } = req.body;

      await Payment.findOneAndUpdate({ _id: id }, { type, banks });

      req.flash("alertMessage", "Berhasil ubah payment");
      req.flash("alertStatus", "success");

      res.redirect("/payment");
    } catch (error) {
      console.log(error);
      req.flash("alertMessage", `${error?.message}`);
      req.flash("alertStatus", "danger");

      res.redirect("/payment");
    }
  },
  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;

      await Payment.findOneAndRemove({ _id: id });

      req.flash("alertMessage", "Berhasil hapus payment");
      req.flash("alertStatus", "success");

      res.redirect("/payment");
    } catch (error) {
      console.log(error);
      req.flash("alertMessage", `${error?.message}`);
      req.flash("alertStatus", "danger");

      res.redirect("/payment");
    }
  },
  actionStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const payment = await Payment.findOne({ _id: id });

      let status = payment?.status === "Y" ? "N" : "Y";

      await Payment.findOneAndUpdate({ _id: id }, { status });

      req.flash("alertMessage", "Berhasil ubah status");
      req.flash("alertStatus", "success");

      res.redirect("/payment");
    } catch (error) {
      req.flash("alertMessage", `${error?.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/payment");
    }
  },
};
