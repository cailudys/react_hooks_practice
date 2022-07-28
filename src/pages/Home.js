import React from "react";
import { useLocation, useParams } from "react-router-dom";

export default function Home(props) {
  console.log(props);
  console.log(useLocation());
  // console.log(useRouteMatch());
  console.log(useParams());

  return <div>Home works</div>;
}
