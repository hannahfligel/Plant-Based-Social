import React, { useState, useEffect } from 'react';
import Card from "react-bootstrap/Card";
import { useNavigate, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";


function Ingredient(props) {

  return (
    <div>
      <li>
      {props.ingredientName}
      {props.ingredientAmount}
      </li>
    </div>
  );
}

export default Ingredient;
