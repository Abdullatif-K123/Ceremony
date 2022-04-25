const router = require("express").Router();
const Order = require("../model/order");
const { verifyToken, verifyTokenAndAdmin } = require("../middleware/verify");
const { acceptsEncodings } = require("express/lib/request");

//Get all user status pendings !!!
router.get("/admin", verifyTokenAndAdmin, async (req, res) => {
  try {
    const orders = await Order.find({ status: "pending" },{_id:0, userId:0 , __v:0});
    res.status(200).json(orders);
  } catch (err) {
    res.status(400).send("Please see what happen!!!");
  }
});

//Post for one document either Accept or rejected
router.patch("/admin", verifyTokenAndAdmin, async (req, res) => {
  const { status, name } = req.body;
  await Order.updateOne(
    { Name: name },
    {
      status: status,
    }
  );

  res.redirect("/ceremony/admin");
});

module.exports = router;
