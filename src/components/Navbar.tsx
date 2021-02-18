import { Link } from 'react-router-dom';
import React from 'react';

const Navbar = () => (
  <>
    <Link to="/">Home</Link>
    <Link to="/foo">Foo</Link>
    <Link to="/counter">counter</Link>
    <Link to="/other">other</Link>
    <Link to="/redux">redux</Link>
  </>
);
export default Navbar;
