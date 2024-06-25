import express from "express";
import cors from "cors";
import Stripe from "stripe";

const app = express();
const PORT = 3001;
const stripe = new Stripe("sk_test_51PD5SZ07BrGXMIuFzQ0mQ6siobntcFdcgaoxNYt7Sv7qqBWDHKDHTAtd9N3XND1zPy88U4wXGsLGvYDSYl2VA7WM00iMgvthV9");

app.use(cors());
app.use(express.static("public"));
app.use(express.json());

// Create a Payment Intent (returns the client with a temporary secret)
app.post("/create-payment-intent", async (req, res) => {
  const { price } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: price,
      currency: "usd",
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
