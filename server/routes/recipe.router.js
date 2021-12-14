const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

//GET route to get all info for movie cards
router.get("/recipeCardInfo", (req, res) => {
  // GET route code here
  const query = `
        SELECT
            recipes.image_url, recipes.recipe_name, recipes.recipe_description, recipes.difficulty, recipes.prep_hours, recipes.prep_minutes, recipes.servings, recipes.recipe_type_id, COUNT(liked_recipes.user_id) AS likes
        FROM 
            recipes 
        JOIN 
            liked_recipes 
        ON
            liked_recipes.recipes_id=recipes.id
        GROUP BY 
            recipes.image_url, recipes.recipe_name, recipes.recipe_description, recipes.difficulty, recipes.prep_hours, recipes.prep_minutes, recipes.servings, recipes.recipe_type_id
        ;`;
  pool
    .query(query)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("ERROR: Get all recipe card info", err);
      res.sendStatus(500);
    });
});


//GET route
router.get("/recipePageInfo", (req, res) => {
  const query = `
    SELECT
      recipes.image_url, recipes.recipe_name, recipes.recipe_description, recipes.difficulty, recipes.prep_hours, recipes.prep_minutes, recipes.servings, recipes.recipe_type_id, COUNT(liked_recipes.user_id) AS likes
    FROM 
      recipes 
    JOIN 
      liked_recipes 
    ON
      liked_recipes.recipes_id=recipes.id
    WHERE
      recipes.id=1
    GROUP BY 
      recipes.image_url, recipes.recipe_name, recipes.recipe_description, recipes.difficulty, recipes.prep_hours, recipes.prep_minutes, recipes.servings, recipes.recipe_type_id
    ;`
  pool
    .query(query)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("ERROR: Get all recipe card info", err);
      res.sendStatus(500);
    });
});


router.get("/ingredients", (req, res) => {
  // GET route code here
  const query = `
    SELECT 
      *
    FROM 
      ingredients
    WHERE
      ingredients.recipe_id=1
    ;`
  pool
    .query(query)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("ERROR: Get all recipe card info", err);
      res.sendStatus(500);
    });
});



router.get("/instructions", (req, res) => {
  // GET route code here
  const query = `
    SELECT 
      *
    FROM
      instructions
    WHERE 
      instructions.recipe_id=1
    ;`
  pool
    .query(query)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("ERROR: Get all recipe card info", err);
      res.sendStatus(500);
    });
});

// GET all recipe types 
router.get("/recipe-types", (req, res) => {
  // GET route code here
  const query = `
    SELECT * FROM recipe_types;`
  pool
    .query(query)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("ERROR: Get all recipe card info", err);
      res.sendStatus(500);
    });
});

//GET all recipe types for a specific recipe 
router.get("/specific-recipe-type", (req, res) => {
  // GET route code here
  const query = `
    SELECT
      *
    FROM
      recipe_types
    WHERE 
     recipe_types.id = 1;`
  pool
    .query(query)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("ERROR: Get all recipe card info", err);
      res.sendStatus(500);
    });
});




/**
 * POST route template
 */
router.post("/", (req, res) => {
  // POST route code here
});

module.exports = router;
