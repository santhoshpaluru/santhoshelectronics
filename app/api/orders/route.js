// POST /api/orders
//
// This is a working endpoint, but it only logs the order server-side and
// returns a generated order ID — it does NOT persist to a database, send
// email/SMS, or process payment. Wire up the TODOs below before taking
// real orders in production:
//
//   1. Persistence — save `order` to a database (Supabase, MongoDB Atlas,
//      PlanetScale, etc.) so orders survive a server restart.
//   2. Notifications — email/WhatsApp yourself and the customer (Resend,
//      Nodemailer + Gmail, Twilio) when a new order comes in.
//   3. Online payment — if you enable the "UPI / Card" option in the
//      checkout UI, integrate Razorpay: create an order server-side with
//      the `razorpay` npm package, return the Razorpay order id to the
//      client, open Razorpay Checkout there, then verify the payment
//      signature back on this route before confirming the order.

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const { customer, items, subtotal } = body ?? {};

  if (!customer?.name || !customer?.phone || !items?.length) {
    return Response.json({ error: 'Missing required order fields' }, { status: 400 });
  }

  const orderId = `SE-${Date.now().toString().slice(-8)}`;

  const order = {
    orderId,
    customer,
    items,
    subtotal,
    paymentMethod: customer.paymentMethod ?? 'cod',
    placedAt: new Date().toISOString(),
  };

  // TODO: replace with real persistence + notifications (see header above).
  console.log('New order received:', JSON.stringify(order, null, 2));

  return Response.json({ success: true, orderId });
}
