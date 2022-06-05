import {
  json,
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import Layout from "./components/Layout";
import { getUser } from "./session.server";
import tailwindStylesheetUrl from "./styles/tailwind.css";
import clsx from "clsx";
import {
  NonFlashOfWrongThemeEls,
  Theme,
  ThemeProvider,
  useTheme,
} from "~/utils/ThemeProvider";
import { getThemeSession } from "./utils/theme.server";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: tailwindStylesheetUrl }];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Dynasty King",
  viewport: "width=device-width,initial-scale=1",
});

type LoaderData = {
  user: Awaited<ReturnType<typeof getUser>>;
  theme: Theme | null;
};

export const loader: LoaderFunction = async ({ request }) => {
  const themeSession = await getThemeSession(request);

  return json<LoaderData>({
    user: await getUser(request),
    theme: themeSession.getTheme(),
  });
};

export function ErrorBoundary({ error }) {
  console.error(error);
  return (
    <html>
      <head>
        <title>Oh no!</title>
        <Meta />
        <Links />
      </head>
      <body>
        <Layout>
          <div className="h-full flex">
            <p className="text-2xl text-center dark:text-white">
              Oops, something went wrong
            </p>
            <p className="text-2xl text-center dark:text-white">
              try reloading the page
            </p>
          </div>
        </Layout>
      </body>
    </html>
  );
}

function App({ data }: { data: LoaderData }) {
  const [theme] = useTheme();
  return (
    <html lang="en" className={clsx(theme)}>
      <head>
        <Meta />
        <Links />
        <NonFlashOfWrongThemeEls ssrTheme={Boolean(data.theme)} />
      </head>
      <body>
        <Layout>
          <Outlet />
        </Layout>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export default function AppWithProviders() {
  const data = useLoaderData<LoaderData>();

  return (
    <ThemeProvider specifiedTheme={data.theme}>
      <App data={data} />
    </ThemeProvider>
  );
}
