module.exports = {
  index: async (req, res) => {
    try {
      res.render("index", {
        title: "Express js",
      });
    } catch (error) {
      console.log(error);
    }
  },
};
