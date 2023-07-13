import QuickSearch from "./components/QuickSearch";
import Recommended from "./components/Recommended";
import SearchForm from "./components/SearchForm";

export default async function Home() {
  return (
    <main>
      <SearchForm />

      <QuickSearch />

      <Recommended />
    </main>
  );
}
