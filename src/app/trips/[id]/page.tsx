import { prisma } from "@/src/lib/prisma";
import Image from "next/image";
import ReactCountryFlag from "react-country-flag";
import ReservationForm from "../components/ReservationForm";
import SecondaryButton from "@/src/components/Button/SecondaryButton";

const getTrypById = async (id: string) => {
  const response = await prisma.trip.findUnique({
    where: {
      id,
    },
  });
  return response;
};

export default async function TripDetail({ params }: { params: { id: string } }) {
  const trip = await getTrypById(params.id);

  return (
    <section className="w-full">
      {/* Hero */}
      <section className="flex flex-col">
        <div className="w-full h-52 relative">
          <Image
            src={trip?.coverImage as string}
            alt={trip?.name as string}
            objectFit="cover"
            fill
          />
        </div>
        <div className="container mx-auto px-5">
          <h3 className="text-primaryDarker text-xl font-semibold mt-4  ">
            {trip?.name}
          </h3>
          <div className="flex items-center gap-1 my-1">
            <ReactCountryFlag countryCode={trip?.countryCode as string} svg />
            <p className="text-xs font-normal text-grayPrimary underline">
              {trip?.location}
            </p>
          </div>
          <p className="text-xs font-normal text-grayPrimary">
            <span className="font-medium text-primary">
              R${trip?.pricePerDay.toString()}
            </span>{" "}
            por noite
          </p>
        </div>
      </section>

      <section className="container mx-auto px-5">
        {/* Form Search */}
        <div className="w-full mt-5 mb-10">
          <ReservationForm
            tripId={trip?.id as string}
            pricePerDay={trip?.pricePerDay as any}
            tripStartDate={trip?.startDate as any}
            tripEndDate={trip?.endDate as any}
          />
        </div>

        {/* About */}
        <div className="mb-5">
          <div className="w-full border border-b[1px] border-grayLighter mb-10" />

          <h3 className="text-base text-primaryDarker font-semibold mb-1">
            Sobre a viagem
          </h3>
          <p className="text-xs text-primaryDarker font-normal text-justify leading-4">
            {trip?.description}
          </p>
        </div>

        {/* Highlights */}
        <div className="py-5">
          <h3 className="text-base text-primaryDarker font-semibold">Destaques</h3>
          <ul className="flex flex-wrap gap-y-3 mt-2">
            {trip?.highlights.map((highlight, index) => (
              <li
                key={index}
                className="flex gap-1 items-center w-1/2 text-xs text-grayPrimary font-normal "
              >
                <Image src="/highlightsIcon.svg" alt={highlight} width={15} height={15} />
                {highlight}
              </li>
            ))}
          </ul>
        </div>

        {/* Location */}
        <div className="my-5">
          <h3 className="text-base text-primaryDarker font-semibold mb-5">Localização</h3>
          <Image
            src="/mapMobile.png"
            alt="maps location"
            width={353}
            height={240}
            className="rounded-lg shadow-md w-full"
          />
          <h3 className="flex items-center gap-1 text-sm text-primaryDarker font-semibold mt-1 mb-5">
            <ReactCountryFlag countryCode={trip?.countryCode as string} svg />
            {trip?.location}
          </h3>

          <SecondaryButton>Ver no Google Maps</SecondaryButton>
        </div>
      </section>
    </section>
  );
}
