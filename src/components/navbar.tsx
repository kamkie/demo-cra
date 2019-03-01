import {Link} from "react-router-dom";
import React from "react";


export default function Navbar() {
  return <>
    <Link to="/">Home</Link>
    <Link to="/foo">Foo</Link>
  </>
}
