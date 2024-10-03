import React from "react";
import { Link } from "react-router-dom";

function NoRouteFound() {
  return (
    <div className="flex items-center justify-center py-20 text-xl">
      <div className="text-center flex flex-col gap-8">
        <h1 className="text-6xl">Error 404!</h1>
        <div>
          <h3>Page not found</h3>
          <Link className="underline" to="/">
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NoRouteFound;
