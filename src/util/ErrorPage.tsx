import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div>
      <h1></h1>
      There was an error.
      <div>
        please still hire me 🥺
      </div>
    </div>
  )
};
