import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";

import { logout } from "~/session.server";

export const action: ActionFunction = async ({ request }) => {
  console.log("ActionFunction logout");
  
  return logout(request);
};

export const loader: LoaderFunction = async () => {
  console.log("loader redirecing");
  return redirect("/");
};
