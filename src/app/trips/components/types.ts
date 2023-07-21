import { Trip } from "@prisma/client";

export type DataReservation = {
  sucess?: boolean;
  status?: number;
  totalPrice?: number;
  error: {
    code: string;
  };
  trip: Trip;
};

export type ReservationFormType = {
  tripId: string;
  pricePerDay: number;
  tripStartDate: Date;
  tripEndDate: Date;
};
