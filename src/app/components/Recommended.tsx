import CardItem from "@/src/components/CardItem";
import { prisma } from "@/src/lib/prisma";

async function getTrips() {
  const trips = await prisma.trip.findMany({});
  return trips;
}

export default async function Recommended() {
  const data = await getTrips();

  return (
    <div className="w-fill container px-5 mt-5">
      <div className="flex items-center gap-2 justify-center">
        <div className="w-full border border-b-1 border-grayLighter" />
        <h2 className="whitespace-nowrap w-fulltext-base font-medium text-grayPrimary">
          Destinos Recomendados
        </h2>
        <div className=" w-full border border-b-1 border-grayLighter" />
      </div>

      <div className="mt-4 flex flex-col items-center ">
        {data && data.map((item) => <CardItem trip={item} />)}
      </div>
    </div>
  );
}
