import { prisma } from "@/src/lib/prisma";

async function getTrips() {
  const trips = await prisma.trip.findMany({});
  return trips;
}

export default async function Recommended() {
  const data = await getTrips();

  return <>{data && data?.map((trip) => <h1>{trip.name}</h1>)}</>;
}
