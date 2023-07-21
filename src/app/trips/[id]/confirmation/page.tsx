"use client";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { loadStripe } from "@stripe/stripe-js";
import Image from "next/image";
import PrimaryButton from "@/src/components/Button/PrimaryButton";
import ReactCountryFlag from "react-country-flag";
import { DataReservation } from "../../components/types";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

export default function TripConfirmation({ params }: { params: { id: string } }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const session = useSession();

  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const guests = searchParams.get("guests");

  const { data, isLoading } = useQuery<DataReservation>(
    ["trip-reservation"],
    async () => {
      const response = await fetch("/api/trips/check", {
        method: "POST",
        body: JSON.stringify({
          tripId: params.id,
          startDate,
          endDate,
          guests,
        }),
      });

      const res = await response.json();

      return res;
    },
    {
      staleTime: 60 * 1000 * 5, // cinco minutos até fazer uma nova requisição
    }
  );

  const handleReservations = async () => {
    if (session.status === "unauthenticated") {
      return router.push("/login");
    }

    const response = await fetch("/api/payments", {
      method: "POST",
      body: Buffer.from(
        JSON.stringify({
          tripId: params.id,
          startDate: searchParams.get("startDate"),
          endDate: searchParams.get("endDate"),
          guests: Number(searchParams.get("guests")),
          totalPrice: data?.totalPrice,
          coverImage: data?.trip.coverImage,
          name: data?.trip.name,
          description: data?.trip.description,
        })
      ),
    });

    if (!response.ok) return alert("Erro");

    const { sessionId } = await response.json();

    const stripe = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
    );

    return await stripe?.redirectToCheckout({ sessionId });
  };

  return (
    <section className="w-full">
      <div className="container mx-auto px-5 py-5">
        <h3 className="text-xl font-semibold text-primaryDarker">Sua viagem</h3>

        <div className="w-full border border-grayLighter rounded-xl shadow-md p-5 my-5">
          <div className="flex items-center gap-5">
            <Image
              src={(data?.trip.coverImage as string) || ""}
              alt={(data?.trip?.name as string) || ""}
              width={124}
              height={102}
              className="rounded-xl"
            />
            <div>
              <h3 className="text-base text-primaryDarker font-semibold">
                {data?.trip?.name}
              </h3>
              <p className="flex items-center gap-1 text-xs text-grayPrimary font-medium underline">
                <ReactCountryFlag countryCode={data?.trip?.countryCode as string} svg />
                {data?.trip?.location}
              </p>
            </div>
          </div>

          <div className="w-full border border-b[1px] border-grayLighter my-5" />

          <div>
            <h3 className="text-sm text-primaryDarker font-semibold mb-4">
              Informações do preço
            </h3>
            <div className="flex items-center justify-between">
              <p className="text-sm text-primaryDarker font-normal">Total</p>
              <p className="text-sm text-primaryDarker font-semibold">
                R${data?.totalPrice}
              </p>
            </div>
          </div>
        </div>

        <div>
          <div className="flex flex-col mb-5">
            <p className="text-sm text-primaryDarker font-normal mb-2">Data</p>

            <p className="text-sm text-primaryDarker font-normal">
              {format(new Date(startDate as string), "dd 'de' MMMM", { locale: ptBR })}
            </p>
            {" - "}
            <p className="text-sm text-primaryDarker font-normal">
              {format(new Date(endDate as string), "dd 'de' MMMM", { locale: ptBR })}
            </p>
          </div>
          <div className="flex flex-col gap-2 mb-5">
            <p className="text-sm text-primaryDarker font-normal">Hóspedes</p>
            <p className="text-sm text-primaryDarker font-normal">{guests} hópedes</p>
          </div>
          <PrimaryButton onClick={handleReservations}>Finalizar compra</PrimaryButton>
        </div>
      </div>
    </section>
  );
}
