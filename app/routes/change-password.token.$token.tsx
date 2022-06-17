import type {
  ActionFunction,
  LoaderFunction,
  MetaFunction
} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import {
  Form,
  useActionData,
  useLoaderData,
  useSearchParams
} from "@remix-run/react";
import * as React from "react";
import { Link } from "react-router-dom";
import {
  deleteToken,
  getEmailByToken,
  isTokenValid
} from "~/models/resetPassword.server";
import { updatePassword } from "~/models/user.server";
import { getUserId } from "~/session.server";

export const loader: LoaderFunction = async ({ request, params }) => {
  const userId = await getUserId(request);
  const { token } = params;
  if (userId) return redirect("/");

  if (!token) {
    return json({ validToken: false });
  }

  return json({ validToken: await isTokenValid(token) });
};

interface ActionData {
  errors: {
    confirmPassword?: string;
    newPassword?: string;
  };
}

export const action: ActionFunction = async ({ request, params }) => {
  const { token } = params;

  const formData = await request.formData();
  const confirmPassword = formData.get("confirmPassword") as string;
  const newPassword = formData.get("newPassword") as string;

  if (typeof newPassword !== "string") {
    return json<ActionData>(
      { errors: { newPassword: "Password is required" } },
      { status: 400 }
    );
  }

  if (newPassword.length < 6) {
    return json<ActionData>(
      {
        errors: {
          newPassword:
            "Password is too short, it must have at least 6 characters",
        },
      },
      { status: 400 }
    );
  }

  if (newPassword !== confirmPassword) {
    return json<ActionData>(
      {
        errors: {
          confirmPassword: "Passwords don't match",
        },
      },
      { status: 400 }
    );
  }

  if (!token) {
    return json<ActionData>(
      {
        errors: {
          confirmPassword:
            "Invalid token, request a new link to reset your password",
        },
      },
      { status: 400 }
    );
  }

  const email = await getEmailByToken(token);
  if (!email) {
    return json<ActionData>(
      {
        errors: {
          confirmPassword:
            "Token not found in DB, request a new link to reset your password",
        },
      },
      { status: 400 }
    );
  }

  const user = await updatePassword(email, newPassword);
  deleteToken(email);

  if (user) {
    return redirect("/login");
  } else {
    return json<ActionData>(
      {
        errors: {
          confirmPassword:
            "Invalid token, request a new link to reset your password",
        },
      },
      { status: 400 }
    );
  }
};

export const meta: MetaFunction = () => {
  return {
    title: "Change Password - Dynasty King",
  };
};

export default function ChangePassword() {
  const data = useLoaderData();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") ?? undefined;
  const actionData = useActionData() as ActionData;
  const newPassword = React.useRef<HTMLInputElement>(null);
  const confirmPasswordRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (actionData?.errors?.confirmPassword) {
      confirmPasswordRef.current?.focus();
    } else if (actionData?.errors?.newPassword) {
      newPassword.current?.focus();
    }
  }, [actionData]);


  return (
    <div className="flex min-h-full flex-col mt-20 justify-center max-w-md w-full px-2 animate-fadeIn">
      <div className="mx-auto w-full px-8">
        <h1 className="text-2xl text-center py-4 md:py-12 dark:text-gray-200 text-gray-900 font-semibold">
          Change Password
        </h1>
        {!data?.validToken ? (
          <div className="w-full flex flex-col dark:text-gray-200">
            <p>
              Invalid token, please request a new link to reset your password.
            </p>

            <div className="text-center text-sm  text-gray-500 dark:text-gray-100">
              <Link
                className="text-blue-500 dark:text-blue-200 underline"
                to={{
                  pathname: "/forgot-password",
                  search: searchParams.toString(),
                }}
              >
                Forgot password
              </Link>
            </div>
          </div>
        ) : (
          <Form method="post" className="space-y-6">
            <div>
              <label
                htmlFor="password"
                className="block text-sm  dark:text-gray-100 text-gray-900"
              >
                New password
              </label>
              <div className="mt-1">
                <input
                  id="newPassword"
                  ref={newPassword}
                  name="newPassword"
                  type="password"
                  autoComplete="new-password"
                  aria-invalid={
                    actionData?.errors?.newPassword ? true : undefined
                  }
                  aria-describedby="password-error"
                  className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
                />
                {actionData?.errors?.newPassword && (
                  <div className="pt-1 text-red-700" id="password-error">
                    {actionData.errors.newPassword}
                  </div>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm  dark:text-gray-100 text-gray-900"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  id="confirmPassword"
                  ref={confirmPasswordRef}
                  name="confirmPassword"
                  type="password"
                  autoComplete="confirm-password"
                  aria-invalid={
                    actionData?.errors?.confirmPassword ? true : undefined
                  }
                  aria-describedby="confirmPassword-error"
                  className="w-full rounded border border-gray-500 px-2 py-1 text-lg"
                />
                {actionData?.errors?.confirmPassword && (
                  <div className="pt-1 text-red-700" id="confirmPassword-error">
                    {actionData.errors.confirmPassword}
                  </div>
                )}
              </div>
            </div>
            <input type="hidden" name="redirectTo" value={redirectTo} />
            <button
              type="submit"
              className="w-full rounded text-white dark:bg-blue-500 bg-indigo-700 my-2 py-2 px-12 dark:hover:bg-blue-600 dark:focus:bg-blue-400 hover:bg-indigo-600 focus:bg-indigo-400"
            >
              Change password
            </button>
          </Form>
        )}
      </div>
    </div>
  );
}
