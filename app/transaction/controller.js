const Transaction = require("./model");

module.exports = {
  index: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");

      const alert = { message: alertMessage, status: alertStatus };

      const transaction = await Transaction.find();

      res.render("admin/transaction/view_transaction", {
        transaction,
        alert,
        title: "Transaksi",
        name: req.session.user.name,
      });
    } catch (error) {
      req.flash("alertMessage", `${error?.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/transaction");
    }
  },
};
