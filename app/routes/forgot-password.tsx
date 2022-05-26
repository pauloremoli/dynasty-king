import { ActionFunction, json, MetaFunction } from "@remix-run/node";
import { Form, useActionData, useTransition } from "@remix-run/react";
import React, { useEffect, useState } from "react";
import { getUserByEmail } from "~/models/user.server";
import { validateEmail } from "~/utils/userUtils";
import { getResetPasswordToken } from "~/models/resetPassword.server";
import invariant from "tiny-invariant";
import emailjs from "@emailjs/browser";

interface ActionData {
  errors: {
    email?: string;
  };
  username?: string;
  link?: string;
  email?: string;
  serviceId?: string;
  templateId?: string;
  userId?: string;
}

export const action: ActionFunction = async ({ request }) => {
  const url = new URL(request.url).origin;

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

  const token = await getResetPasswordToken(email);
  invariant(process.env.SERVICE_ID, "SERVICE_ID must be set");
  invariant(process.env.TEMPLATE_ID, "TEMPLATE_ID must be set");
  invariant(process.env.USER_ID, "TEMPLATE_ID must be set");

  const link = url + "/change-password/token/" + token;

  return {
    username: user.username,
    link,
    email,
    serviceId: process.env.SERVICE_ID,
    templateId: process.env.TEMPLATE_ID,
    userId: process.env.USER_ID,
  };
};

export const meta: MetaFunction = () => {
  return {
    title: "Forgot Password - Dynasty King",
  };
};

const ForgotPassword = () => {
  const actionData = useActionData() as ActionData;
  const emailRef = React.useRef<HTMLInputElement>(null);
  const transition = useTransition();
  const [emailSent, setEmailSent] = useState(false);

  useEffect(() => {
    async function fetchData(actionData: ActionData) {
      if (
        actionData &&
        actionData.email &&
        actionData.serviceId &&
        actionData.templateId &&
        actionData.link &&
        actionData.userId
      ) {
        await emailjs.send(
          actionData.serviceId,
          actionData.templateId,
          {
            username: actionData.username,
            link: actionData.link,
            email: actionData.email,
          },
          actionData.userId
        );

        setEmailSent(true);
      }
    }

    fetchData(actionData);
  }, [actionData]);

  React.useEffect(() => {
    if (actionData?.errors?.email) {
      emailRef.current?.focus();
    }
  }, [actionData]);
  return (
    <div className="flex flex-col items-center justify-center text-white w-full max-w-md animate-fadeIn">
      <h1 className="text-xl text-white md:pt-10 ">Forgot Password</h1>
      <Form method="post" className="flex justify-center w-full pt-16">
        <fieldset
          disabled={transition.state === "submitting"}
          className="w-full  max-w-md"
        >
          <label htmlFor="email" className="font-semibold">
            Email
          </label>

          <div className="flex flex-col justify-center gap-4 w-full">
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
            {emailSent && (
              <div className="pt-1 text-green-400" id="email-error">
                Check your inbox, use that link to change your password.
              </div>
            )}
          </div>
        </fieldset>
      </Form>
    </div>
  );
};

export default ForgotPassword;
