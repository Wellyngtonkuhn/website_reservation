"use client";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import DatePicker, { registerLocale } from "react-datepicker";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import "react-datepicker/dist/react-datepicker.css";
import ptBR from "date-fns/locale/pt-BR";
import Button from "@/src/components/Button/PrimaryButton";

registerLocale("pt-BR", ptBR);

const searchSchema = yup.object({
  startDate: yup.date().required("Campo obrigatório*"),
  endDate: yup.date().required("Campo obrigatório*"),
  guests: yup
    .number()
    .required("Campo obrigatório*")
    .positive("Valor precisa ser maior que 0")
    .typeError("Insira um número válido"),
});

type FormType = yup.InferType<typeof searchSchema>;

export default function ReservationForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormType>({
    resolver: yupResolver(searchSchema),
    mode: "all",
  });

  const handleReservation: SubmitHandler<FormType> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(handleReservation)} className="flex flex-col gap-2">
      <div className="w-full flex gap-2">
        <div className="flex flex-col">
          <Controller
            name="startDate"
            control={control}
            render={({ field }) => (
              <DatePicker
                dateFormat="dd/MM/yyyy"
                locale="pt-BR"
                selected={field.value}
                onChange={field.onChange}
                minDate={new Date()}
                enableTabLoop={false}
                wrapperClassName="w-full"
                placeholderText="Data de ínicio"
                className="w-full text-sm p-2 outline-none border border-gray-300 font-normal text-primaryDarker rounded-lg placeholder-black placeholder-opacity-20"
              />
            )}
          />

          {errors.startDate && (
            <p className="text-xs mt-1 text-red-500 font-medium">
              {errors.startDate.message}
            </p>
          )}
        </div>
        <div className="flex flex-col">
          <Controller
            name="endDate"
            control={control}
            render={({ field }) => (
              <DatePicker
                dateFormat="dd/MM/yyyy"
                locale="pt-BR"
                selected={field.value}
                onChange={field.onChange}
                minDate={new Date()}
                enableTabLoop={false}
                wrapperClassName="w-full"
                placeholderText="Data final"
                className="w-full text-sm p-2 outline-none border border-gray-300 font-normal text-primaryDarker rounded-lg placeholder-black placeholder-opacity-20"
              />
            )}
          />
          {errors.endDate && (
            <p className="text-xs mt-1 text-red-500 font-medium">
              {errors.endDate.message}
            </p>
          )}
        </div>
      </div>
      <input
        type="text"
        placeholder="Hóspedes"
        className="w-full text-sm p-2 outline-none border border-gray-300 font-normal text-primaryDarker rounded-lg placeholder-black placeholder-opacity-20"
        {...register("guests")}
      />
      {errors.guests && (
        <p className="text-xs mt-1 text-red-500 font-medium">{errors.guests.message}</p>
      )}
      <div className="flex items-center justify-between">
        <p className="text-sm text-primaryDarker font-medium">Total (7 noites)</p>
        <p className="text-sm text-primaryDarker font-medium">R$2.660</p>
      </div>
      <Button>Reservar agora</Button>
    </form>
  );
}
