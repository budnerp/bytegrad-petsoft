import prisma from "@/lib/db";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(request: Request) {
  const body = await request.json();
  const signature = request.headers.get("stripe-signature");

  // verify webook comes from Stripe
  let event;
  try {
    event = stripe.webook.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (error) {
    console.error(error);
    return new Response(null, { status: 400 });
  }

  // fulfill order
  switch (event.type) {
    case "checkout.session.completed":
      await prisma.user.update({
        where: {
          email: body.data.object.customer_email,
        },
        data: {
          hasAccess: true,
        },
      });
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
      break;
  }

  // return 200 OK
  return new Response(null, { status: 200 });
}
