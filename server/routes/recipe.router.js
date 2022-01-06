const { query } = require("express");
const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

//GET route to get all info for recipe cards
router.get("/recipeCardInfo", (req, res) => {
  // GET route code here
  const query = `
        SELECT
            *
        FROM 
            recipes 
        ORDER BY
        id DESC
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
//the url is recipeCardInfo because onClick of the recipe type button, the recipe cards need to be rendered onto the DOM
router.get("/recipeCardInfo/:id", (req, res) => {
  // GET route code here
  const query = `
        SELECT
            *
        FROM 
            recipes
        WHERE
          recipes.recipe_type_id = $1
        ORDER BY
        id DESC
        ;`;
  values = [req.params.id];
  pool
    .query(query, values)
    .then((result) => {
      //result.row is an array that hold the recipe card information for every recipe that falls under the selected recipe type
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("ERROR: Get all recipe card info", err);
      res.sendStatus(500);
    });
});

//GET route to get general information for recipes (will go into recipe cards)
router.get("/recipePageInfo/:id", (req, res) => {
  // console.log("REQ.PARAMS----->", req.params);
  const query = `
    SELECT
      *
    FROM 
      recipes 
    WHERE
      recipes.id=$1
    ;`;
  values = [req.params.id];
  pool
    .query(query, values)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("ERROR: Get all recipe card info", err);
      res.sendStatus(500);
    });
});

//GET route to get general information for recipes (will go into recipe cards) for the saved recipes of a specific user
router.get("/liked-recipes/:id", (req, res) => {
  const query = `
  SELECT recipes.id, recipes.image_url, recipes.recipe_name, recipes.prep_hours, recipes.prep_minutes FROM "liked_recipes"
  JOIN 
  "recipes"
  ON
  liked_recipes.recipes_id=recipes.id
  WHERE
  liked_recipes.user_id=$1
  ORDER BY
  liked_recipes.id DESC
    ;`;
  values = [req.params.id];
  pool
    .query(query, values)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("ERROR: Get all recipe card info", err);
      res.sendStatus(500);
    });
});

//GET route to get all users from the db
router.get("/all-users", (req, res) => {
  const query = `
  SELECT "user".id, "user".username FROM "user";
  `;
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
  console.log("ing req.params=========>", req.params);
  // GET route code here
  const query = `
    SELECT 
      *
    FROM 
      ingredients
    WHERE
      ingredients.recipe_id=$1
    ;`;
  values = [req.params.id];
  pool
    .query(query, values)
    .then((result) => {
      console.log("ing result.row=====>", result.rows);
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
      instructions.recipe_id=$1
    ;`;
  values = [req.params.id];
  pool
    .query(query, values)
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
  // select all from the recipe types table
  const query = `
    SELECT * FROM recipe_types;`;
  pool
    .query(query)
    .then((result) => {
      //result.rows then holds all the recipe types and sends them back to the saga
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("ERROR: Get all recipe card info", err);
      res.sendStatus(500);
    });
});

//GET all recipe types for a specific recipe
// router.get("/specific-recipe-type", (req, res) => {
//   // GET route code here
//   const query = `
//     SELECT
//       *
//     FROM
//       recipe_types
//     WHERE
//      recipe_types.id = 1;`;
//   pool
//     .query(query)
//     .then((result) => {
//       res.send(result.rows);
//     })
//     .catch((err) => {
//       console.log("ERROR: Get all recipe card info", err);
//       res.sendStatus(500);
//     });
// });

router.post("/post-share-recipe", (req, res) => {
  console.log("IN post-share-recipe=========>", req.body);
  const queryString = `INSERT INTO "shared_recipes" (sender_id, receiver_id, recipe_id) VALUES ($1, $2, $3);`;
  value = [req.body.userId, req.body.receiverId, req.body.recipeId];
  pool
    .query(queryString, value)
    .then((results) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

router.post("/add-recipe", (req, res) => {
  // POST route code here
  console.log("req.body----------->", req.body);
  //queryString insets into the recipes table the new recipe_name and returns the id of that new recipe
  const queryString = `INSERT INTO "recipes" (recipe_name) VALUES ($1) RETURNING "id";`;
  //value holds the recipe that was bought in the saga
  value = [req.body.recipe_name];
  pool
    .query(queryString, value)
    .then((result) => {
      console.log("new recipe id---->", result.rows[0].id);
      //newRecipeId holds the returned id from the new recipe that was added
      const newRecipeId = result.rows[0].id;
      //getRecipeQuery selects all from the recipes table where the id matches the new recipe id
      const getRecipeQuery = `SELECT * FROM recipes WHERE id=${newRecipeId};`;
      //run the getRecipeQuery
      pool
        .query(getRecipeQuery)
        //then, send the results back to the saga
        .then((result) => {
          console.log("newItemQuery Result:", result.rows);
          res.send(result.rows);
        });
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

router.post("/add-ingredient", (req, res) => {
  console.log("req.body=====>", req.body.newIngredient.ingredient_amount);
  console.log("add-ingredient TEST======>", req.body);
  const queryString = ` INSERT INTO "ingredients" (ingredient, ingredient_amount, recipe_id)
  VALUES ($1, $2, $3)`;
  value = [
    req.body.newIngredient.ingredient,
    req.body.newIngredient.ingredient_amount,
    req.body.id,
  ];
  pool
    .query(queryString, value)
    .then((results) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

router.post("/add-instruction", (req, res) => {
  console.log("req.body=====>", req.body);
  console.log("req.body.instruction=====>", req.body.newInstruction);
  const queryString = `INSERT INTO "instructions" (instruction, recipe_id) VALUES ($1, $2)`;
  value = [req.body.newInstruction, req.body.id];
  pool
    .query(queryString, value)
    .then((results) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

//post router to add user like to the db with the user_id & recipe_id
router.post("/add-like", (req, res) => {
  // POST route code here
  // console.log("req.body----------------------->", req.body.recipeId);
  const queryString = `INSERT INTO "liked_recipes" (user_id, recipes_id) VALUES ($1, $2);`;
  value = [req.body.userId, req.body.recipeId];
  pool
    .query(queryString, value)
    .then((results) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

router.put("/update-recipe/:id", (req, res) => {
  // console.log("UPDATE RECIPE -------->",req.body);
  console.log("UPDATE RECIPE -------->", req.body.newRecipe);
  const queryString = `
    UPDATE
      "recipes"
    SET
      "image_url"=$1,
      "recipe_name"=$2,
      "recipe_description"=$3,
      "difficulty"=$4,
      "prep_hours"=$5,
      "prep_minutes"=$6,
      "servings"=$7,
      "recipe_type_id"=$8
    WHERE
      "id"=$9
    ;`;
  const values = [
    req.body.newRecipe.image_url,
    req.body.newRecipe.recipe_name,
    req.body.newRecipe.recipe_description,
    req.body.newRecipe.difficulty,
    req.body.newRecipe.prep_hours,
    req.body.newRecipe.prep_minutes,
    req.body.newRecipe.servings,
    req.body.newRecipe.recipe_type_id,
    req.body.id,
  ];
  pool
    .query(queryString, values)
    .then((results) => {
      console.log("PUT RESULTS.ROWS", results.rows);
      res.send(results.rows[0]);
      // res.sendStatus( 200 );
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

router.delete("/delete-instruction/:id", (req, res) => {
  console.log("IN DELETE INSTRUCTION =============>", req.params.id);
  const queryString = `DELETE FROM "instructions" WHERE id=$1`;
  values = [req.params.id];
  pool
    .query(queryString, values)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log("DELETE failed: ", err);
      res.sendStatus(500);
    });
});

router.delete("/delete-ingredient/:id", (req, res) => {
  console.log("IN DELETE INGREDIENT =============>", req.params.id);
  const queryString = `DELETE FROM "ingredients" WHERE id=$1`;
  values = [req.params.id];
  pool
    .query(queryString, values)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log("DELETE failed: ", err);
      res.sendStatus(500);
    });
});

//get route to get liked status for a specific recipe
router.get("/liked-recipe-status/:userId/:recipeId", (req, res) => {
  // GET route code here
  // console.log("liked recipe status req.body----->", req.params);
  const query = `
    SELECT liked_recipes.id
    FROM
    "liked_recipes"
    WHERE
    user_id=$1
    AND
    recipes_id=$2
    ;`;
  values = [req.params.userId, req.params.recipeId];
  pool
    .query(query, values)
    .then((result) => {
      //result.rows is an array which is either be empty of have item (likedRecipeId)
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("ERROR: Get all recipe card info", err);
      res.sendStatus(500);
    });
});

//GET router to get all shared recipes
router.get("/get-shared-recipes/:id", (req, res) => {
  console.log("shared recipes in reducer----->", req.params);
  const query = `
  SELECT 
  recipes.prep_hours,
  recipes.prep_minutes,
	recipes.id AS id,
	recipes.image_url,
	recipes.recipe_name,
	shared_recipes.id AS sharedRecipeId, 
	shared_recipes.receiver_id,
	shared_recipes.sender_id, 
	shared_recipes.recipe_id, 
	"user".username AS "sender" 
FROM 
	"shared_recipes"
JOIN 
	"user"
ON
	shared_recipes.sender_id="user".id
JOIN 
	"recipes"
ON
	shared_recipes.recipe_id="recipes".id
WHERE 
	receiver_id=$1
ORDER BY shared_recipes.id DESC;
  `;
  values = [req.params.id];
  pool
    .query(query, values)
    .then((result) => {
      console.log("BACK FROM GET SHARED RECIPES ROUTER=====>", result.rows);
      res.send(result.rows);
    })
    .catch((err) => {
      console.log("ERROR: Get all shared recipe info", err);
      res.sendStatus(500);
    });
});

//delete route to delete a liked recipe
router.delete("/delete-like/:id", (req, res) => {
  // console.log("IN DELETE LIKE ROUTER =============>", req.params.id);
  const queryString = `DELETE FROM "liked_recipes" WHERE id=$1`;
  values = [req.params.id];
  pool
    .query(queryString, values)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log("DELETE failed: ", err);
      res.sendStatus(500);
    });
});

router.delete("/delete-recipe/:recipeId/:userId", (req, res) => {
  console.log("IN DELETE RECIPE =============>", req.params);
  // delete liked recipe
  const deleteLikeQuery = `DELETE FROM "liked_recipes" WHERE EXISTS (SELECT * FROM liked_recipes WHERE user_id=$1 AND recipes_id=$2)`;
  values = [req.params.userId, req.params.recipeId];
  pool.query(deleteLikeQuery, values).then(() => {
    // delete shared recipe
    const deleteLikeQuery = `DELETE FROM "shared_recipes" WHERE EXISTS (SELECT * FROM shared_recipes WHERE recipe_id=$1)`;
    values = [req.params.recipeId];
    pool.query(deleteLikeQuery, values).then(() => {
      //delete ingredients
      const queryString = `DELETE FROM "ingredients" WHERE recipe_id=$1`;
      values = [req.params.recipeId];
      pool.query(queryString, values).then(() => {
        // delete instructions
        const deleteInstructionsQuery = `DELETE FROM "instructions" WHERE recipe_id=$1`;
        values = [req.params.recipeId];
        pool.query(deleteInstructionsQuery, values).then(() => {
          //delete recipe
          const deleteRecipeQuery = `DELETE FROM "recipes" WHERE id=$1`;
          values = [req.params.recipeId];
          pool
            .query(deleteRecipeQuery, values)
            .then(() => {
              res.sendStatus(200);
            })
            .catch((err) => {
              console.log("DELETE failed: ", err);
              res.sendStatus(500);
            });
        });
      });
    });
  });
});

module.exports = router;
