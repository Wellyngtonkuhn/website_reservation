"use client";
import Image from "next/image";
import { Prisma } from "@prisma/client";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import CancelButton from "@/src/components/Button/CancelButton";
import ReactCountryFlag from "react-country-flag";
import { queryClient } from "@/src/provider";

export default function MyTrips() {
  const session = useSession(); 
  const userId = (session.data?.user as any)?.id as string;



  const { data, isLoading } = useQuery<
    Prisma.TripReservationGetPayload<{
      include: { trip: true };
    }>[]
  >(
    ["my-trips", userId],
    async () => {
      const response = await fetch(`/api/trips/user/${userId}/reservations`);

      const res = await response.json();

      return res;
    },
    {
      staleTime: 1000 * 60 * 5, // cinco minutos até refazer uma nova requisição
    }
  );

  const cacheData = queryClient.getQueryData<Prisma.TripReservationGetPayload<{
    include: { trip: true };
  }>[]>( ["my-trips", userId])

  const handleMutationDelete = useMutation({
    mutationFn: (id: string) => fetch(`/api/trips/reservations/${id}`,{
      method: 'DELETE'
    }) ,
    onSuccess(data, variables, context) {
      const newCacheData = cacheData?.filter(reservation => {
        return reservation.id !== variables
      })
      return queryClient.setQueryData(["my-trips", userId], newCacheData)
    },
    onError(error) {
      console.log(error)
    },
  })

  return (
    <section className="w-full pt-5">
      <div className="container mx-auto px-5">
        <h3 className="text-primaryDarker text-xl font-semibold mb-5  ">
          Minhas viagens
        </h3>

        {isLoading && <h1>Loading...</h1>}

        {data?.length! > 0 &&
          data?.map((reservation) => (
            <div
              className="w-full border border-grayLighter rounded-xl shadow-md p-5 mb-5"
              key={reservation.id}
            >
              <div className="flex items-center gap-5">
                <Image
                  src={reservation.trip.coverImage}
                  alt={reservation.trip.name}
                  width={124}
                  height={102}
                  className="rounded-xl"
                />
                <div>
                  <h3 className="text-base text-primaryDarker font-semibold">
                    {reservation.trip.name}
                  </h3>
                  <p className="flex items-center gap-1 text-xs text-grayPrimary font-medium underline">
                    <ReactCountryFlag
                      countryCode={reservation.trip.countryCode as string}
                      svg
                    />
                    {reservation.trip.location}
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

                  <div className="flex items-center gap-1">
                    <p className="text-sm text-primaryDarker font-normal">
                      {format(new Date(reservation.startDate), "dd 'de' MMMM", {
                        locale: ptBR,
                      })}
                    </p>
                    <p className="text-sm text-primaryDarker font-normal">-</p>
                    <p className="text-sm text-primaryDarker font-normal">
                      {format(new Date(reservation.endDate), "dd 'de' MMMM", {
                        locale: ptBR,
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <p className="text-sm text-primaryDarker font-normal">Hóspedes</p>
                  <p className="text-sm text-primaryDarker font-normal">
                    {reservation.guests} hópedes
                  </p>
                </div>
              </div>

              <div className="w-full border border-b[1px] border-grayLighter my-5" />

              <div className="mb-5">
                <h3 className="text-sm text-primaryDarker font-semibold mb-4">
                  Informações do pagamento
                </h3>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-primaryDarker font-normal">Total</p>
                  <p className="text-sm text-primaryDarker font-semibold">
                    {Number(reservation.totalPaid).toLocaleString("pt", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </p>
                </div>
              </div>
              <CancelButton onClick={()=> handleMutationDelete.mutate(reservation.id)}>{handleMutationDelete.isLoading ? 'Cancelando...' : 'Cancelar'}</CancelButton>
            </div>
         
          ))}
      </div>
    </section>
  );
}
