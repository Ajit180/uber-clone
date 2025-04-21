import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export async function POST(request) {
  try {
    const body = await request.json(); // 👈 read the body
    const { amount } = body;

    if (!amount) {
      return new Response(JSON.stringify({ error: "Amount is required" }), {
        status: 400,
      });
    }

    const order = await razorpay.orders.create({
      amount, // ✅ use dynamic amount
      currency: "INR",
      receipt: 'receipt_' + Math.random().toString(36).substring(7),
    });

    return new Response(JSON.stringify({ orderId: order.id }), {
      status: 200,
    });

  } catch (error) {
    console.log("Error in creating the order:", error);
    return new Response(
      JSON.stringify({ error: "Error creating order" }),
      { status: 500 }
    );
  }
}
