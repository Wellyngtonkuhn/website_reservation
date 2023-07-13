import Image from "next/image";
import { Trip } from "@prisma/client";
import ReactCountryFlag from "react-country-flag";
import Link from "next/link";

type CardProps = {
  trip: Trip;
};

export default function CardItem({ trip }: CardProps) {
  return (
    <div key={trip.id} className="mb-5">
      <Link href={`trips/${trip.id}`}>
        <div>
          <Image
            src={trip.coverImage}
            alt={trip.name}
            width={480}
            height={280}
            className="rounded-2xl object-cover"
          />
        </div>
        <h3 className="text-primaryDarker mt-2 text-sm font-medium mb-[3px]">
          {trip.name}
        </h3>
        <div className="flex items-center gap-1 mb-[3px]">
          <ReactCountryFlag countryCode={trip.countryCode} svg />
          <p className="text-xs font-normal text-grayPrimary">{trip.location}</p>
        </div>
        <p className="text-xs font-normal text-grayPrimary">
          <span className="font-medium text-primary">
            R${trip.pricePerDay.toString()}
          </span>{" "}
          por noite
        </p>
      </Link>
    </div>
  );
}
