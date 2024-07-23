import React from "react";
import ReactDOMClient from "react-dom/client";
import nullthrows from "nullthrows";
import  App  from "./components/App";

function main() {
  const domRoot = document.getElementById("root");
  const reactRoot = ReactDOMClient.createRoot(nullthrows(domRoot));

  reactRoot.render(<App />);
}

main();