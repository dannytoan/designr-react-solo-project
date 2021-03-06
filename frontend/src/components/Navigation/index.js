import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import LogOut from "./LogOut";
import "./Navigation.css";

export default function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  let login;
  if (sessionUser) {
    {/* sessionLinks = <ProfileButton user={sessionUser} />; */}
    sessionLinks = (<><a href="/collections">
    <button className="auth-btn">Collections</button>
  </a>
  <a href="/photos">
    <button className="auth-btn">Looks</button>
  </a>
  <a href="/photos/new">
    <button className="auth-btn">Add a Look</button>
  </a></>);

  }

  if (!sessionUser) {
    login = (<div><LoginFormModal /></div>)
  }

  // else {
  //   sessionLinks = (
  //     <div>
  //       <LoginFormModal />
  //       {/* <NavLink to="/signup" className="auth-btn signup-btn btn">
  //         <button class="auth-btn">Sign Up</button>
  //       </NavLink> */}
  //       {/* <ProfileButton user={sessionUser} /> */}
  //     </div>
  //   );
  // }

  return (
    <div>
      <div id="masthead">
        <a href="/" id="logo">DESIGNR</a>
      </div>
      <div id="masthead-buttons">{isLoaded && login}

      {sessionUser ? <LogOut user={sessionUser} /> : <></>}
      </div>
      <ul className="nav-bg">
        <li id="auth-buttons">
          <NavLink id="home-btn" exact to="/">
            <button className="auth-btn">Home</button>
          </NavLink>
          <a id="linkedin-btn" href="https://www.linkedin.com/in/dannytoan/" target="_blank">
            <button className="auth-btn">LinkedIn</button>
          </a>
          <a id="github-btn" href="https://github.com/dannytoan/designr-react-solo-project" target="_blank">
            <button className="auth-btn">Github</button>
          </a>
          {sessionLinks}
          {/* <a href="/collections">
            <button className="auth-btn">Collections</button>
          </a>
          <a href="/photos">
            <button className="auth-btn">Looks</button>
          </a>
          <a href="/photos/new">
            <button className="auth-btn">Add a Look</button>
          </a> */}
        </li>
      </ul>
    </div>
  );
}
