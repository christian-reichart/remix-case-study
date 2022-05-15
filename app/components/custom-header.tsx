import { Link } from "@remix-run/react";

export function CustomHeader() {
  return (
    <div className="flex justify-center items-center p-8">
      <Link to="/">
        <img src="/camperboys-logo.svg" alt="logo" />
      </Link>
    </div>
  )
}