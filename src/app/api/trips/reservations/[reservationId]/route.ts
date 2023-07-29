import { prisma } from "@/src/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  request: NextRequest,
  {
    params: { reservationId },
  }: {
    params: { reservationId: string };
  }
) {
  if (!reservationId) {
    return new NextResponse(JSON.stringify("Missing reservationID"), { status: 400 });
  }

  try {
    const response = await prisma.tripReservation.delete({
      where: {
        id: reservationId,
      },
    });
    return new NextResponse(JSON.stringify(response), { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify(error));
  }
}
