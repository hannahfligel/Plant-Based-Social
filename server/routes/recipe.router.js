const { query } = require("express");
const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

//GET route to get all info for movie cards
router.get("/recipeCardInfo", (req, res) => {
  // GET route code here
  const query = `
        SELECT
            *
        FROM 
            recipes 
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


//GET route to get info the the specific recipe type selected 
router.get("/recipeCardInfo/:id", (req, res) => {
  // GET route code here
  const query = `
        SELECT
            *
        FROM 
            recipes
        WHERE
          recipes.recipe_type_id = ${req.params.id}
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


//GET route to get general information for recipes (will go into recipe cards)
router.get("/recipePageInfo/:id", (req, res) => {
  console.log("REQ.PARAMS----->",req.params);
  const query = `
    SELECT
      *
    FROM 
      recipes 
    WHERE
      recipes.id=${req.params.id}
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



//GET route to get general information for recipes (will go into recipe cards) for the saved recipes of a specific user 
router.get("/saved-recipes", (req, res) => {
  const query = `
    SELECT 
      recipes.image_url, recipes.recipe_name, recipes.recipe_description, recipes.difficulty, recipes.prep_hours, recipes.prep_minutes, recipes.servings, recipes.recipe_type_id, COUNT(liked_recipes.user_id) AS likes
    FROM 
      saved_recipes 
    JOIN 
      recipes 
    ON 
      recipes.id = saved_recipes.recipes_id
    JOIN 
      "user"
    ON
      "user".id = saved_recipes.user_id
    JOIN 
      liked_recipes
    ON
      liked_recipes.recipes_id = recipes.id
    WHERE 
      saved_recipes.user_id=1
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





router.get("/ingredients/:id", (req, res) => {
  // GET route code here
  const query = `
    SELECT 
      *
    FROM 
      ingredients
    WHERE
      ingredients.recipe_id=${req.params.id}
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



router.get("/instructions/:id", (req, res) => {
  // GET route code here
  const query = `
    SELECT 
      *
    FROM
      instructions
    WHERE 
      instructions.recipe_id=${req.params.id}
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
router.post("/add-like", (req, res) => {
  // POST route code here
  console.log("req.body----------------------->", req.body.recipeId)
  const queryString = `INSERT INTO "liked_recipes" (user_id, recipes_id) VALUES ($1, $2);`;
  value = [req.body.userId, req.body.recipeId];
  pool.query( queryString, value ).then( (results)=>{
    res.sendStatus( 200 );
  }).catch( (err)=>{
    console.log( err );
    res.sendStatus( 500 );
  })
});



router.post("/add-recipe", (req, res) => {
  // POST route code here
  console.log("req.body----------------------->", req.body)
  const queryString = `INSERT INTO "recipes" (recipe_name) VALUES ($1);`;
  value = [req.body.recipe_name];
  pool.query( queryString, value ).then( (results)=>{
    res.sendStatus( 200 );
  }).catch( (err)=>{
    console.log( err );
    res.sendStatus( 500 );
  })
});

module.exports = router;
