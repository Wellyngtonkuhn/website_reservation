"use client";
import { useForm } from "react-hook-form";

export default function SearchForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSearch = (data: any) => {
    console.log(data);
  };
  return (
    <div>
      <h2>
        Encontre sua próxima <span>viagem!</span>
      </h2>

      <form onSubmit={handleSubmit(handleSearch)}>
        <input type="text" {...register("location")} />
        <div>
          <input type="text" {...register("firstData")} />
          <input type="text" {...register("budget")} />
        </div>
        <button type="submit">Pesquisar</button>
      </form>
    </div>
  );
}
