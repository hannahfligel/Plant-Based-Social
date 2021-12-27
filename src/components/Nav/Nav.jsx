import React from "react";
import { Link } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";
import "./Nav.css";
import { useSelector } from "react-redux";
import AddRecipeButton from "../AddRecipeButton/AddRecipeButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUtensils,
  faCommentDots,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";

function Nav() {
  const user = useSelector((store) => store.user);

  const homeIcon = <FontAwesomeIcon icon={faUtensils} />;
  const sharedIcon = <FontAwesomeIcon icon={faCommentDots} />;
  const favoritesIcon = <FontAwesomeIcon icon={faHeart} />;

  return (
    <div className="nav">
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
            <span className="navIcons">{homeIcon}</span>
            {/* <br />
              explore */}
          </Link>

          <Link className="navLink" to="/saved-recipes">
            <span className="navIcons">{favoritesIcon}</span>
          </Link>
        </>
      )}

      {user.admin && <AddRecipeButton />}

      {user.id && (
        <>
          <Link className="navLink" to="/shared-recipes">
            <span className="navIcons">{sharedIcon}</span>
          </Link>
          <LogOutButton className="navLink navIcons" />
        </>
      )}

      {user.id ? (
        <></>
      ) : (
        <Link className="navLink" to="/about">
          About
        </Link>
      )}
    </div>
  );
}

export default Nav;
