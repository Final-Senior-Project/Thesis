const express = require("express");
const router = express.Router();
const stripe =require("stripe")("sk_test_51O7xr1FBTzNlZioJpUXM980w565hSIsBSegabCS0pQbzpKttWA1C0yq1baCGoambNr30OJOrTJ1E8hrvnaSSj3eZ00ghqy13af")

router.post("/payment/:amount", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.params.amount,
      currency: 'usd',
      confirmation_method: 'automatic', 
    });

    console.log(paymentIntent, "paymentint");
    res.json({ paymentIntent: paymentIntent.client_secret });
  } catch (e) {
    res.status(400).json({
      error: e.message,
    });
  }
});

module.exports = router;