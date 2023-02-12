import { useRouteError } from "react-router-dom";

// TODO: Style
export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="text-coffee-300 font-bold text-4xl h-screen flex items-center justify-center flex-col gap-2">
      There was an error.
      <div className="font-normal text-lg">please still hire me 🥺</div>
    </div>
  );
}
