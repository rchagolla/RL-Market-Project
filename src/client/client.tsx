import React from "react";
import ReactDOMClient from "react-dom/client";
import nullthrows from "nullthrows";
import  App  from "./components/App";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'

function main() {
  const domRoot = document.getElementById("root");
  const reactRoot = ReactDOMClient.createRoot(nullthrows(domRoot));

  reactRoot.render(<App />);
}

main();