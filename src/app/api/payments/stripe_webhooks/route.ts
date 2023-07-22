import { prisma } from "@/src/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2022-11-15",
});

export async function POST(request: NextRequest) {
  const sig = request.headers.get("stripe-signature") as string;

  const text = await request.text();

  try {
    const event = stripe.webhooks.constructEvent(
      text,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET_KEY as string
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as any;

      const createTripReservation = await prisma.tripReservation.create({
        data: {
          startDate: new Date(session.metadata.startDate),
          endDate: new Date(session.metadata.endDate),
          userId: session.metadata.userId,
          tripId: session.metadata.tripId,
          totalPaid: Number(session.metadata.totalPrice),
          guests: Number(session.metadata.guests),
        },
      });

      return new NextResponse(
        JSON.stringify({
          createTripReservation,
        })
      );
    }
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        message: error,
      })
    );
  }
}
