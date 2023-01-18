import { useRouteError } from "react-router-dom";

// TODO: Style
export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div>
      There was an error.
      <div>
        please still hire me 🥺
      </div>
    </div>
  )
};
