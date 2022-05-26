import { ActionFunction, json, LoaderFunction } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import React from "react";
import { updatePassword } from "~/models/user.server";
import { requireUserId } from "~/session.server";
import { useUser } from "~/utils/userUtils";
import { MetaFunction } from "@remix-run/node";

export const loader: LoaderFunction = async ({ request }) => {
  await requireUserId(request);

  return {};
};

interface ActionData {
  errors?: {
    newPassword?: string;
    confirmPassword?: string;
  };
  result?: boolean;
}

export const action: ActionFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  const formData = await request.formData();

  const newPassword = formData.get("newPassword")?.toString();
  if (!newPassword) {
    return json<ActionData>(
      { errors: { newPassword: "New password is required" } },
      { status: 400 }
    );
  }

  if (newPassword?.length < 6) {
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

  const confirmPassword = formData.get("confirmPassword")?.toString();
  if (!confirmPassword) {
    return json<ActionData>(
      { errors: { confirmPassword: "Confirm password is required" } },
      { status: 400 }
    );
  }

  if (confirmPassword !== newPassword) {
    return json<ActionData>(
      { errors: { confirmPassword: "Passwords don't match" } },
      { status: 400 }
    );
  }

  const user = await updatePassword(userId, newPassword);
  if (!user) {
    json<ActionData>({ result: false });
  }

  return json<ActionData>({ result: true });
};


export const meta: MetaFunction = () => {
  return {
    title: "Profile - Dynasty King",
  };
};

const User = () => {
  const user = useUser();
  const actionData = useActionData() as ActionData;
  const newPasswordRef = React.useRef<HTMLInputElement>(null);
  const confirmPasswordRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (actionData?.errors?.newPassword) {
      newPasswordRef.current?.focus();
    } else if (actionData?.errors?.confirmPassword) {
      confirmPasswordRef.current?.focus();
    }
  }, [actionData]);

  return (
    <div className="flex flex-col text-white max-w-5xl w-full animate-fadeIn">
      <h1 className="text-xl font-semibold text-center md:pt-10">User</h1>
      <div className="flex flex-col gap-4 font-extralight md:pt-10 w-full">
        <p className="font-semibold">Username:</p>
        <p> {user.username}</p>

        <p className="font-semibold">E-mail: </p>
        <p>{user.email}</p>
        <p className="font-semibold text-blue-400 md:pt-12">Change password</p>

        <Form
          method="post"
          className="flex flex-col gap-3 max-w-lg font-light"
        >
          <label htmlFor="newPassword">New password</label>
          <input
            type="password"
            name="newPassword"
            className="rounded-lg text-gray-900"
            autoFocus={true}
            ref={newPasswordRef}
          />
          {actionData?.errors?.newPassword && (
            <div className="pt-1 text-red-400" id="newPassword-error">
              {actionData.errors.newPassword}
            </div>
          )}

          <label htmlFor="newPassword">Confirm password</label>
          <input
            type="password"
            name="confirmPassword"
            className="rounded-lg text-gray-900"
            autoFocus={true}
            ref={confirmPasswordRef}
          />
          {actionData?.errors?.confirmPassword && (
            <div className="pt-1 text-red-400" id="confirmPassword-error">
              {actionData.errors.confirmPassword}
            </div>
          )}

          <button
            type="submit"
            className="w-full rounded bg-blue-500 my-2 py-2 px-12 mt-8 text-white hover:bg-blue-600 focus:bg-blue-400 flex-grow-1"
          >
            Save
          </button>
          {actionData?.result && (
            <div className="pt-1 text-green-400" id="updated-message">
              Password updated successfuly!
            </div>
          )}
          {actionData && "result" in actionData && !actionData.result && (
            <div className="pt-1 text-red-400" id="not-updated-error">
              Something went wrong, could not change the password!
            </div>
          )}
        </Form>
      </div>
    </div>
  );
};

export default User;
