import { ActionFunction, json, redirect } from "@remix-run/node";
import { Form, Outlet, useActionData, useTransition } from "@remix-run/react";
import React from "react";
import { validateEmail } from "~/utils/userUtils";

interface ActionData {
  errors: {
    email?: string;
  };
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email");

  if (!validateEmail(email)) {
    return json<ActionData>(
      { errors: { email: "Email is invalid" } },
      { status: 400 }
    );
  }

  return redirect(`/league-selection/email/${email}`);
};

const TeamSelection = () => {
  const actionData = useActionData() as ActionData;
  const emailRef = React.useRef<HTMLInputElement>(null);
  const transition = useTransition();

  React.useEffect(() => {
    if (actionData?.errors?.email) {
      emailRef.current?.focus();
    }
  }, [actionData]);

  return (
    <>
      <div className="flex flex-col w-full h-full items-center pt-24 text-white">
        
        <h1 className="text-2xl font-bold text-center pb-10">
          Add League
        </h1>

        <div className="flex flex-col">
          <Form method="post" className="space-y-6">
            <fieldset disabled={transition.state === "submitting"}>
              <label htmlFor="email" className="block text-sm font-medium ">
                Email address used for your account in fleaflicker
              </label>

              <div className="flex items-center gap-4">
                <div className="mt-1 flex-grow-2">
                  <input
                    ref={emailRef}
                    id="email"
                    required
                    autoFocus={true}
                    name="email"
                    type="email"
                    autoComplete="email"
                    aria-invalid={actionData?.errors?.email ? true : undefined}
                    aria-describedby="email-error"
                    className="rounded border border-gray-500 px-2 py-2 text-lg text-gray-700"
                  />
                  {actionData?.errors?.email && (
                    <div className="pt-1 text-red-700" id="email-error">
                      {actionData.errors.email}
                    </div>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full rounded bg-blue-500 my-2 py-2 px-12 text-white hover:bg-blue-600 focus:bg-blue-400 flex-grow-1"
                >
                  {transition.state === "submitting" ? "Loading..." : "Load"}
                </button>
              </div>
            </fieldset>
          </Form>

          <div className="py-8">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default TeamSelection;
