import Image from "next/image";
import Link from "next/link";

export default function QuickSearch() {
  return (
    <div className="container mx-auto mt-5 px-5">
      <div className="flex items-center gap-2 justify-center">
        <div className="w-full border border-b-1 border-grayLighter" />
        <h2 className="whitespace-nowrap w-fulltext-base font-medium text-grayPrimary">
          Tente pesquisar por
        </h2>
        <div className=" w-full border border-b-1 border-grayLighter" />
      </div>

      <div className="w-full mt-5">
        <ul className="flex items-center justify-between">
          <li>
            <Link
              href="/trips/search?text=hotel"
              className="flex flex-col items-center justify-center"
            >
              <Image src="/hotel.svg" alt="Icone de Hotel" width={35} height={35} />
              <p className="text-sm font-normal text-grayPrimary">Hotel</p>
            </Link>
          </li>
          <li>
            <Link
              href="/trips/search?text=fazenda"
              className="flex flex-col items-center justify-center"
            >
              <Image src="/farm.svg" alt="Icone de Hotel" width={35} height={35} />
              <p className="text-sm font-normal text-grayPrimary">Fazenda</p>
            </Link>
          </li>
          <li>
            <Link
              href="/trips/search?text=chalé"
              className="flex flex-col items-center justify-center"
            >
              <Image src="/cabin.svg" alt="Icone de Hotel" width={35} height={32} />
              <p className="text-sm font-normal text-grayPrimary">Chalé</p>
            </Link>
          </li>
          <li>
            <Link
              href="/trips/search?text=pousada"
              className="flex flex-col items-center justify-center"
            >
              <Image src="/yurt.svg" alt="Icone de Hotel" width={35} height={35} />
              <p className="text-sm font-normal text-grayPrimary">Pousada</p>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
