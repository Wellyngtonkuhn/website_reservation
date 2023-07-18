"use client";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import DatePicker, { registerLocale } from "react-datepicker";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import "react-datepicker/dist/react-datepicker.css";
import ptBR from "date-fns/locale/pt-BR";

registerLocale("pt-BR", ptBR);

const searchSchema = yup.object({
  text: yup.string().required("Campo obrigatório*"),
  startDate: yup.date().required("Campo obrigatório*"),
  budget: yup
    .number()
    .required("Campo obrigatório*")
    .positive("Valor precisa ser maior que 0")
    .typeError("Insira um número válido"),
});

type FormProps = yup.InferType<typeof searchSchema>;

export default function SearchForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormProps>({
    resolver: yupResolver(searchSchema),
    mode: "all",
  });

  const handleSearch: SubmitHandler<FormProps> = (data) => {
    router.push(
      `/trips/search?text=${
        data?.text
      }&startDate=${data?.startDate?.toISOString()}&budget=${data?.budget}`
    );
  };
  return (
    <div className="w-full bg-search-background bg-cover bg-center bg-no-repeat pt-5">
      <div className="container mx-auto px-5 ">
        <h2 className="text-xl font-semibold text-center text-primaryDarker">
          Encontre sua próxima <span className="text-primary">viagem!</span>
        </h2>

        <form onSubmit={handleSubmit(handleSearch)} className="flex flex-col gap-4 mt-4">
          <div>
            <input
              type="text"
              placeholder="Onde você quer ir?"
              className="w-full text-sm p-2 outline-none border border-gray-300 font-normal text-primaryDarker rounded-lg placeholder-black placeholder-opacity-20"
              {...register("text")}
            />
            {errors.text && (
              <p className="text-xs mt-1 text-red-500 font-medium">
                {errors.text.message}
              </p>
            )}
          </div>

          <div className="flex gap-4 w-full">
            <div className="w-full">
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
                    placeholderText="Primeira data"
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
            <div className="w-full">
              <input
                type="number"
                placeholder="Orçamento?"
                className="w-full text-sm p-2 outline-none border border-l-gray-300 font-normal text-primaryDarker rounded-lg placeholder-black placeholder-opacity-20"
                {...register("budget")}
              />
              {errors.budget && (
                <p className="text-xs mt-1 text-red-500 font-medium">
                  {errors.budget.message}
                </p>
              )}
            </div>
          </div>
          <button
            type="submit"
            className="bg-primary text-white w-full rounded-lg p-2 text-sm font-semibold "
          >
            Pesquisar
          </button>
        </form>
      </div>
    </div>
  );
}
