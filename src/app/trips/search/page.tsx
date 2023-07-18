"use client";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import CardItem from "@/src/components/CardItem";
import { Suspense } from "react";
import Link from "next/link";

export default function Search() {
  const searchParams = useSearchParams();

  const { data, isLoading } = useQuery(
    [
      "trip-search",
      `text=${searchParams.get("text") ?? ""}&startDate=${searchParams.get(
        "startDate"
      )}&budget=${searchParams.get("budget")}`,
    ],
    async () => {
      const response = await fetch(
        `/api/trips/search?text=${
          searchParams.get("text") ?? ""
        }&startDate=${searchParams.get("startDate")}&budget=${searchParams.get("budget")}`
      );

      return response.json();
    },
    {
      staleTime: 60 * 1000 * 5, // 5 minutos
    }
  );

  return (
    <section className="w-full">
      <div className="container mx-auto px-5">
        <div className="text-center pt-5 pb-4">
          <h3 className="text-xl font-semibold text-primaryDarker">
            Hospedagens encontradas
          </h3>
          <p className="text-base text-grayPrimary font-medium mb-5">
            {data?.data.length > 0
              ? "Listamos os melhores locais para você!"
              : "Não encontramos nada nos seus parâmetros! =("}
          </p>
          {data?.data.length === 0 && (
            <Link
              className="bg-primary text-white rounded-lg py-2 px-10 text-sm font-semibold"
              href="/"
            >
              Nova pesquisa
            </Link>
          )}
        </div>

        <div>
          <Suspense fallback={<h1>Carregando...</h1>}>
            {isLoading && (
              <h3 className="text-base font-medium text-primaryDarker">Carregando...</h3>
            )}
            {data && data?.data.map((trip: any) => <CardItem trip={trip} />)}
          </Suspense>
        </div>
      </div>
    </section>
  );
}
