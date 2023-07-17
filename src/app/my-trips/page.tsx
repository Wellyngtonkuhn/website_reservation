import CancelButton from "@/src/components/Button/CancelButton";
import Image from "next/image";
import ReactCountryFlag from "react-country-flag";

export default function MyTrips() {
  return (
    <main className="w-full">
      <section className="container mx-auto px-5">
        <h3 className="text-primaryDarker text-xl font-semibold my-5  ">
          Minhas viagens
        </h3>

        <div className="w-full border border-grayLighter rounded-xl shadow-md p-5 mb-5">
          <div className="flex items-center gap-5">
            <Image
              src="/mapMobile.png"
              alt=""
              width={124}
              height={102}
              className="rounded-xl"
            />
            <div>
              <h3 className="text-base text-primaryDarker font-semibold">
                Hotel Maravista
              </h3>
              <p className="flex items-center gap-1 text-xs text-grayPrimary font-medium underline">
                <ReactCountryFlag countryCode={"BR" as string} svg />
                Rio de Janeiro
              </p>
            </div>
          </div>

          <div className="w-full border border-b[1px] border-grayLighter my-5" />

          <div>
            <h3 className="text-sm text-primaryDarker font-semibold mb-5">
              Sobre a viagem
            </h3>
            <div className="flex flex-col gap-2  mb-5">
              <p className="text-sm text-primaryDarker font-normal">Data</p>
              <p className="text-sm text-primaryDarker font-normal">17-27 de julho.</p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm text-primaryDarker font-normal">Hóspedes</p>
              <p className="text-sm text-primaryDarker font-normal">8 hópedes</p>
            </div>
          </div>

          <div className="w-full border border-b[1px] border-grayLighter my-5" />

          <div className="mb-5">
            <h3 className="text-sm text-primaryDarker font-semibold mb-4">
              Informações do pagamento
            </h3>
            <div className="flex items-center justify-between">
              <p className="text-sm text-primaryDarker font-normal">Total</p>
              <p className="text-sm text-primaryDarker font-semibold">R$3.390</p>
            </div>
          </div>
          <CancelButton>Cancelar</CancelButton>
        </div>
      </section>
    </main>
  );
}
