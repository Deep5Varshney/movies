import React, { Component } from 'react';
import {Link} from 'react-router-dom';
export default class Navbar extends Component {
  render() {
    return (
      <div style={{display: 'flex', padding:'0.5rem'}}>
      <Link to ="/" style={{textDecoration:"none"}}> <h1 style={{marginLeft: "5rem", marginTop: "1.5rem"}}>Movies App</h1></Link>
      <Link to="/favourites"  style={{textDecoration:"none"}}><h2 style={{marginLeft:"2rem", marginTop:"2rem"}}>Favourites</h2></Link>
      </div>
    )
  }
}
