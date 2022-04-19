import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";

import { logout } from "~/session.server";

export const action: ActionFunction = async ({ request }) => {
  console.log("calling logout from logout route");
  
  return logout(request);
};

export const loader: LoaderFunction = async () => {
  console.log("loader redirecing");
  return redirect("/");
};
