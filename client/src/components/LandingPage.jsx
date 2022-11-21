import React from "react";
import { Link } from "react-router-dom";
import "../styles/Landing.css";

export default function LandingPage() {
  return (
    <div className="landing" >
      
      <h1 className="landing_title">WELCOME</h1>
      <Link to="/home">
        <button className="landing_button">
          <span>GET IN</span>
        </button>
      </Link>
    </div>
  );
}
