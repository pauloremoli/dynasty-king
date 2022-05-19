import { ActionFunction, json } from "@remix-run/node";
import { Form, useActionData, useTransition } from "@remix-run/react";
import React from "react";
import { getUserByEmail } from "~/models/user.server";
import { validateEmail } from "~/utils/userUtils";

interface ActionData {
  errors: {
    email?: string;
  };
  result?: boolean;
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

  const user = await getUserByEmail(email);
  if (!user) {
    return json<ActionData>(
      { errors: { email: "No user was found with this email" } },
      { status: 400 }
    );
  }

  //TODO send email

  return { result: true };
};

const ForgotPassword = () => {
  const actionData = useActionData() as ActionData;
  const emailRef = React.useRef<HTMLInputElement>(null);
  const transition = useTransition();

  React.useEffect(() => {
    if (actionData?.errors?.email) {
      emailRef.current?.focus();
    }
  }, [actionData]);
  return (
    <div className="flex flex-col items-center justify-center text-white w-full max-w-5xl">
      <h1 className="text-xl text-white md:pt-10 ">Forgot Password</h1>
      <Form method="post" className="flex justify-center w-full pt-16">
        <fieldset disabled={transition.state === "submitting"}>
          <label htmlFor="email" className="font-semibold">
            Email
          </label>

          <div className="flex flex-col justify-center gap-4">
            <div className="w-full mt-1">
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
                className="rounded border border-gray-500 px-2 py-2 text-lg text-gray-700 w-full"
              />
              {actionData?.errors?.email && (
                <div className="pt-1 text-red-400" id="email-error">
                  {actionData.errors.email}
                </div>
              )}
            </div>
            <button
              type="submit"
              className="w-full rounded bg-blue-500 my-2 py-2 px-12 text-white hover:bg-blue-600 focus:bg-blue-400 flex-grow-1"
            >
              {transition.state === "submitting" ? "Loading..." : "OK"}
            </button>
            {actionData?.result && (
              <div className="pt-1 text-green-400" id="email-error">
                Email sent with a link to reset your password.
              </div>
            )}
          </div>
        </fieldset>
      </Form>
    </div>
  );
};

export default ForgotPassword;
