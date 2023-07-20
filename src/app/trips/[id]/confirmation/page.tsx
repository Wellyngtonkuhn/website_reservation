"use client";
import { useSearchParams } from "next/navigation";

export default function TripConfirmation({ params }: { params: { id: string } }) {
  const searchParams = useSearchParams();

  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const guests = searchParams.get("guests");

  return (
    <div>
      <h1>id: {params.id}</h1>
      <h1>startDate: {startDate}</h1>
      <h1>endDate: {endDate}</h1>
      <h1>guests: {guests}</h1>
    </div>
  );
}
