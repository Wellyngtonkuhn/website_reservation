import { prisma } from "@/src/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const text = searchParams.get("text");
  const startDate = searchParams.get("startDate");
  const budget = searchParams.get("budget");

  const data = await prisma.trip.groupBy({
    by: [
      "id",
      "name",
      "coverImage",
      "location",
      "countryCode",
      "pricePerDay",
      "startDate",
    ],
    where: {
      OR: [
        {
          location: {
            contains: String(text),
            mode: "insensitive",
          },
        },
        {
          name: {
            contains: String(text),
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: String(text),
            mode: "insensitive",
          },
        },
      ],
    },
    having: {
      OR: [
        {
          startDate: {
            gte: String(startDate),
          },
        },
        {
          pricePerDay: {
            _sum: {
              lte: String(budget),
            },
          },
        },
      ],
    },
  });

  return NextResponse.json({ data });
}
