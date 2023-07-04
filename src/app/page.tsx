import { prisma } from "../lib/prisma";

const getData = async () => {
  const trips = await prisma.trip.findMany({});
  return trips;
};

export default async function Home() {
  const data = await getData();
  console.log({ data });
  return <main>Home</main>;
}
