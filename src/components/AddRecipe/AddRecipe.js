import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useHistory } from "react-router-dom";
import Ingredient from "../Ingredient/Ingredient";
import Instruction from "../Instruction/Instruction";
import DeleteRecipeButton from "../DeleteRecipeButton/DeleteRecipeButton";
import Nav from "../Nav/Nav";
import { Button, Modal, Form, Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faClock } from "@fortawesome/free-solid-svg-icons";
import "../RecipePage/RecipePage.css";
import "../AddRecipe/AddRecipe.css";
import Banner from "../../images/admin-banner.png";

// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name AddRecipe with the name for the new component.
function AddRecipe(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const dispatch = useDispatch();
  const history = useHistory();

  const backIcon = <FontAwesomeIcon icon={faArrowLeft} />;
  const clock = <FontAwesomeIcon icon={faClock} />;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const store = useSelector((store) => store);

  useEffect(() => {
    dispatch({
      type: "FETCH_RECIPE_TYPES",
    });
  }, []);

  const recipeTypes = useSelector(
    (store) => store.recipeReducer.recipeTypesReducer
  );

  const ingredients = useSelector(
    (store) => store.recipeReducer.recipeIngredientsReducer
  );

  const instructions = useSelector(
    (store) => store.recipeReducer.recipeInstructionsReducer
  );

  const recipeInfo = useSelector(
    (store) => store.recipeReducer.recipePageReducer
  );

  //useState stores values coming from the reducers in the store
  const [newRecipe, setNewRecipe] = useState({
    image_url: recipeInfo.image_url,
    recipe_name: recipeInfo.recipe_name,
    recipe_description: recipeInfo.recipe_description,
    difficulty: recipeInfo.difficulty,
    prep_hours: recipeInfo.prep_hours,
    prep_minutes: recipeInfo.prep_minutes,
    servings: recipeInfo.servings,
    recipe_type_id: recipeInfo.recipe_type_id,
  });

  const [newIngredient, setNewIngredient] = useState({
    ingredient: "",
    ingredient_amount: "",
  });

  const [newInstruction, setNewInstruction] = useState("");

  const submit = async () => {
    console.log("Submit new recipe---->", newRecipe);
    await dispatch({
      type: "UPDATE_RECIPE",
      payload: {
        newRecipe: newRecipe,
        id: recipeInfo.id,
      },
    });
    await handleShow();
  };

  const okayModal = () => {
    handleClose();
    history.push("/home");
  };

  const addIngredient = async () => {
    console.log("New Ingredient------>", newIngredient);
    await dispatch({
      type: "ADD_INGREDIENT",
      payload: {
        newIngredient: newIngredient,
        id: recipeInfo.id,
      },
    });
    await setNewIngredient({
      ingredient: "",
      ingredient_amount: "",
    });
    await dispatch({
      type: "FETCH_RECIPE_INGREDIENTS",
      payload: recipeInfo.id,
    });
  };

  const addInstruction = () => {
    console.log("New Instruction------>", newInstruction);
    dispatch({
      type: "ADD_INSTRUCTION",
      payload: {
        newInstruction: newInstruction,
        id: recipeInfo.id,
      },
    });
    setNewInstruction({
      instruction: "",
    });
    dispatch({
      type: "FETCH_RECIPE_INSTRUCTIONS",
      payload: recipeInfo.id,
    });
  };

  // secret button section
  const shhSecretButton = async () => {
    console.log("shhhhh secret button clicked!");
    await setNewRecipe({
      image_url:
        "https://i.pinimg.com/564x/0a/1d/86/0a1d86fb4ddc49b9270db990d6828224.jpg",
      recipe_name: "Chickpea Tacos",
      recipe_description:
        "Al Pastor Chickpea Tacos feature a bright and bold pineapple chili sauce tossed with mushrooms, chickpeas, and onion. The most flavorful vegan tacos, even the most devout carnivores will love this 30 minute recipe.",
      difficulty: "easy",
      prep_hours: "0",
      prep_minutes: "30",
      servings: "2",
      recipe_type_id: "2",
    });
    await dispatch({
      type: "ADD_INGREDIENT",
      payload: {
        newIngredient: {
          ingredient: "olive oil",
          ingredient_amount: "1 tbs",
        },
        id: recipeInfo.id,
      },
    });
    await dispatch({
      type: "ADD_INGREDIENT",
      payload: {
        newIngredient: {
          ingredient: "chickpeas, 1 can, drained and rinsed",
          ingredient_amount: "15 oz",
        },
        id: recipeInfo.id,
      },
    });
    await dispatch({
      type: "ADD_INGREDIENT",
      payload: {
        newIngredient: {
          ingredient: "low sodium soy sauce",
          ingredient_amount: "2 tbs",
        },
        id: recipeInfo.id,
      },
    });
    await dispatch({
      type: "ADD_INGREDIENT",
      payload: {
        newIngredient: {
          ingredient: "chipotle chili powder",
          ingredient_amount: "1 tsp",
        },
        id: recipeInfo.id,
      },
    });
    await dispatch({
      type: "ADD_INGREDIENT",
      payload: {
        newIngredient: {
          ingredient: "tortilla",
          ingredient_amount: "to serve",
        },
        id: recipeInfo.id,
      },
    });
    await dispatch({
      type: "ADD_INSTRUCTION",
      payload: {
        newInstruction:
          "Add the olive oil to a pan over medium heat. Once the oil begins to shimmer, add the chickpeas and cook until slightly golden, stirring occasionally.",
        id: recipeInfo.id,
      },
    });
    await dispatch({
      type: "ADD_INSTRUCTION",
      payload: {
        newInstruction:
          "Add soy sauce, chipotle chili powder, and garlic powder to the chickpeas and sauté for 3-4 more minutes, until golden brown.",
        id: recipeInfo.id,
      },
    });
    await dispatch({
      type: "ADD_INSTRUCTION",
      payload: {
        newInstruction: "Serve on warm tortillas with desired taco toppings.",
        id: recipeInfo.id,
      },
    });
  };

  return (
    <>
      <img alt="banner" src={Banner} />
      <Container className="addRecipeContainer">
        <h1 onClick={shhSecretButton}>Recipe Form</h1>
        <Form>
          {/* input for image_url */}
          {/* defaultValue holders the the value of the useState that came from the store  */}
          <Form.Group>
            <Form.Label htmlFor="imageUrl">Image Url</Form.Label>
            <Form.Control
              id="imageUrl"
              onChange={(event) =>
                setNewRecipe({ ...newRecipe, image_url: event.target.value })
              }
              defaultValue={newRecipe.image_url}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label htmlFor="recipeName">Recipe name</Form.Label>
            {/* input for recipe_name */}
            <Form.Control
              id="recipeName"
              onChange={(event) =>
                setNewRecipe({
                  ...newRecipe,
                  recipe_name: event.target.value,
                })
              }
              defaultValue={newRecipe.recipe_name}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label htmlFor="recipeDescription">
              Recipe description
            </Form.Label>
            {/* input for recipe_description */}
            <Form.Control
              as="textarea"
              rows={3}
              id="recipeDescription"
              onChange={(event) =>
                setNewRecipe({
                  ...newRecipe,
                  recipe_description: event.target.value,
                })
              }
              defaultValue={newRecipe.recipe_description}
            />
          </Form.Group>

          <Form.Group>
            {/* recipe type dropdown */}
            <Form.Label htmlFor="recipeType">recipe type</Form.Label>
            <Form.Select
              onChange={(event) =>
                setNewRecipe({
                  ...newRecipe,
                  recipe_type_id: event.target.value,
                })
              }
              id="recipeType"
              name="Recipe type"
              value={newRecipe.recipe_type_id}
            >
              <option>select recipe type</option>
              {recipeTypes.map((recipeType) => {
                return (
                  //onClick, run the details function and passing it the individual movie info that was clicked on
                  <option value={recipeType.id} key={recipeType.id}>
                    {recipeType.recipe_type}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>

          <Form.Group>
            {/* difficulty dropdown */}
            <Form.Label htmlFor="recipeDifficulty">difficulty</Form.Label>
            <Form.Select
              id="recipeDifficulty"
              onChange={(event) =>
                setNewRecipe({ ...newRecipe, difficulty: event.target.value })
              }
              value={newRecipe.difficulty}
            >
              <option>select</option>
              <option value="easy">Easy</option>
              <option value="intermediate">Intermediate</option>
              <option value="difficult">Difficult</option>
            </Form.Select>
          </Form.Group>

          <Form.Group>
            {/* servings input */}
            <Form.Label htmlFor="recipeServing">Servings:</Form.Label>
            <Form.Control
              id="recipeServing"
              onChange={(event) =>
                setNewRecipe({ ...newRecipe, servings: event.target.value })
              }
              type="number"
              value={newRecipe.servings}
            />
          </Form.Group>

          <Form.Group className="addRecipeFormGroup">
            <h2 className="addRecipeH2">{clock} Prep Time</h2>
            {/* prep time input (hours & minutes) */}
            <Row>
              <Col>
                <Form.Label htmlFor="recipePrepTimeHr">hours</Form.Label>
                <Form.Control
                  id="recipePrepTimeHr"
                  onChange={(event) =>
                    setNewRecipe({
                      ...newRecipe,
                      prep_hours: event.target.value,
                    })
                  }
                  type="number"
                  value={newRecipe.prep_hours}
                />
              </Col>
              <Col>
                <Form.Label htmlFor="recipePrepTimeMin">minutes</Form.Label>

                <Form.Control
                  id="recipePrepTimeMin"
                  onChange={(event) =>
                    setNewRecipe({
                      ...newRecipe,
                      prep_minutes: event.target.value,
                    })
                  }
                  type="number"
                  value={newRecipe.prep_minutes}
                />
              </Col>
            </Row>
          </Form.Group>
        </Form>

        <>
          <Form.Group className="addRecipeFormGroup">
            <h2 className="addRecipeH2">Ingredients</h2>
            <Row>
              <Col>
                <Form.Label htmlFor="recipeIngredient">Ingredient</Form.Label>
                <Form.Control
                  id="recipeIngredient"
                  onChange={(event) =>
                    setNewIngredient({
                      ...newIngredient,
                      ingredient: event.target.value,
                    })
                  }
                  value={newIngredient.ingredient}
                />
              </Col>
              <Col>
                <Form.Label htmlFor="recipeIngredientAmount">Amount</Form.Label>
                <Form.Control
                  id="recipeIngredientAmount"
                  onChange={(event) =>
                    setNewIngredient({
                      ...newIngredient,
                      ingredient_amount: event.target.value,
                    })
                  }
                  value={newIngredient.ingredient_amount}
                />
              </Col>
            </Row>
            <button className="addRecipeAddButton" onClick={addIngredient}>
              Add Ingredient
            </button>
          </Form.Group>
          <div>
            {ingredients.map((ingredient) => {
              return (
                <Ingredient
                  key={ingredient.id}
                  ingredientName={ingredient.ingredient}
                  ingredientAmount={ingredient.ingredient_amount}
                  ingredientId={ingredient.id}
                  editMode={true} // <--- editMode determines whether or not the delete buttons show up
                  recipeId={recipeInfo.id}
                />
              );
            })}
          </div>

          <Form.Group>
            <h2 className="addRecipeH2">Instructions</h2>
            <Form.Label htmlFor="recipeIngredientAmount">
              Add Instruction
            </Form.Label>
            <Form.Control
              as="textarea"
              onChange={(event) => setNewInstruction(event.target.value)}
              value={newInstruction.instruction}
            />

            <button className="addRecipeAddButton" onClick={addInstruction}>
              Add instruction
            </button>
          </Form.Group>
          <ol>
            {instructions.map((instruction) => {
              return (
                <Instruction
                  key={instruction.id}
                  instructionName={instruction.instruction}
                  instructionId={instruction.id}
                  editMode={true}
                  recipeId={recipeInfo.id}
                />
              );
            })}
          </ol>
        </>

        <button
          className="addRecipeSubmitButton"
          variant="primary"
          onClick={submit}
        >
          Submit recipe
        </button>

        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Success</Modal.Title>
          </Modal.Header>
          <Modal.Body>Recipe was submitted successfully!</Modal.Body>
          <Modal.Footer>
            {/* <Button variant="secondary" onClick={handleClose}>
            Close
          </Button> */}
            <Button onClick={okayModal} variant="primary">
              OK
            </Button>
          </Modal.Footer>
        </Modal>

        {/* <button onClick={submit}>Submit recipe</button> */}

        <DeleteRecipeButton recipeId={recipeInfo.id} />
      </Container>
      <Nav />
    </>
  );
}

export default AddRecipe;
