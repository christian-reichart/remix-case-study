import type {
  LinksFunction,
  MetaFunction,
} from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useMatches,
} from "@remix-run/react";
import { CustomHeader } from "./components/custom-header";

import tailwindStylesheetUrl from "./styles/tailwind.css";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: tailwindStylesheetUrl }];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Remix Case Study",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  const matches = useMatches();

  const includeScripts = matches.some(
    match => match.handle?.hydrate
  )

  return (
    <html lang="en" className="h-full bg-light-tertiary text-secondary">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        <CustomHeader />
        <Outlet />
        <ScrollRestoration />
        {includeScripts && <Scripts />}
        <LiveReload />
      </body>
    </html>
  );
}
