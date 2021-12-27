import React from "react";
import { Link } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";
import "./Nav.css";
import { useSelector } from "react-redux";
import AddRecipeButton from "../AddRecipeButton/AddRecipeButton";

function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <div className="nav">
      <Link to="/home"></Link>
      <div>
        {/* If no user is logged in, show these links */}
        {user.id === null && (
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
        )}

        {/* If a user is logged in, show these links */}
        {/* {this will be changed to user.admin} */}
        {user.id && (
          <>
            <Link className="navLink" to="/user">
              Explore
            </Link>

            <Link className="navLink" to="/saved-recipes">
              Favorites
            </Link>

            <Link className="navLink" to="/shared-recipes">
              Shared
            </Link>

            <LogOutButton className="navLink" />
          </>
        )}

        {user.admin && <AddRecipeButton />}

        {user.id ? (
          <></>
        ) : (
          <Link className="navLink" to="/about">
            About
          </Link>
        )}
      </div>
    </div>
  );
}

export default Nav;
