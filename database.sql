CREATE TABLE "user" (
	"id" serial NOT NULL,
	"username" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"admin" BOOLEAN DEFAULT 'false',
	CONSTRAINT "users_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "recipes" (
	"id" serial NOT NULL,
	"image_url" varchar NOT NULL,
	"recipe_name" varchar(255) NOT NULL,
	"recipe_description" varchar(500) NOT NULL,
	"difficulty" varchar(255) NOT NULL,
	"prep_hours" integer NOT NULL,
	"prep_minutes" integer NOT NULL,
	"servings" integer NOT NULL,
	"recipe_type_id" integer NOT NULL,
	CONSTRAINT "recipes_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "recipe_types" (
	"id" serial NOT NULL,
	"recipe_type" varchar(255) NOT NULL,
	CONSTRAINT "recipe_types_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "ingredients" (
	"id" serial NOT NULL,
	"ingredient" varchar(255) NOT NULL,
	"ingredient_amount" varchar(255) NOT NULL,
	"recipe_id" integer NOT NULL,
	CONSTRAINT "ingredients_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "instructions" (
	"id" serial NOT NULL,
	"instruction" varchar(500) NOT NULL,
	"recipe_id" integer NOT NULL,
	CONSTRAINT "instructions_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "liked_recipes" (
	"id" serial NOT NULL,
	"user_id" integer NOT NULL,
	"recipes_id" integer NOT NULL,
	CONSTRAINT "liked_recipes_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE "saved_recipes" (
	"id" serial NOT NULL,
	"user_id" integer NOT NULL,
	"recipes_id" integer NOT NULL,
	CONSTRAINT "saved_recipes_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

ALTER TABLE "recipes" ADD CONSTRAINT "recipe_types_fk0" FOREIGN KEY ("recipe_type_id") REFERENCES "recipes_types"("id");

ALTER TABLE "ingredients" ADD CONSTRAINT "ingredients_fk0" FOREIGN KEY ("recipe_id") REFERENCES "recipes"("id");

ALTER TABLE "instructions" ADD CONSTRAINT "instructions_fk0" FOREIGN KEY ("recipe_id") REFERENCES "recipes"("id");

ALTER TABLE "liked_recipes" ADD CONSTRAINT "liked_recipes_fk0" FOREIGN KEY ("user_id") REFERENCES "user"("id");
ALTER TABLE "liked_recipes" ADD CONSTRAINT "liked_recipes_fk1" FOREIGN KEY ("recipes_id") REFERENCES "recipes"("id");

ALTER TABLE "saved_recipes" ADD CONSTRAINT "saved_recipes_fk0" FOREIGN KEY ("user_id") REFERENCES "user"("id");
ALTER TABLE "saved_recipes" ADD CONSTRAINT "saved_recipes_fk1" FOREIGN KEY ("recipes_id") REFERENCES "recipes"("id");


--insert statements for recipe_types table: 

INSERT INTO "recipe_types" ("recipe_type") 
VALUES( 'Breakfast' ), ( 'Lunch' ), ( 'Dinner' ), ( 'Dessert' ), ( 'Snacks' );


--insert statements for recipes table:

INSERT INTO "recipes" ( "image_url", "recipe_name", "recipe_description", "difficulty", "prep_hours", "prep_minutes", "servings", "recipe_type_id" ) 
VALUES ( 'https://img.buzzfeed.com/video-api-prod/assets/2dede3279ee543dbada7e0ddf5d42ccd/FB_2.jpg?resize=600:*&output-format=auto&output-quality=auto', 'Channa Masala', 'Easy Chickpea Curry (Channa Masala)', 'easy', '0', '30', '4', 3);


INSERT INTO "recipes" ( "image_url", "recipe_name", "recipe_description", "difficulty", "prep_hours", "prep_minutes", "servings", "recipe_type_id" ) 
VALUES ( 'https://img.buzzfeed.com/thumbnailer-prod-us-east-1/video-api/assets/132444.jpg?resize=600:*&output-format=auto&output-quality=auto', 'Cinnamon Rolls', 'The Best Ever Vegan Cinnamon Rolls', 'intermediate', '1', '0', '8', 4 );



--insert statments for ingredirents table:

INSERT INTO "ingredients" ( "ingredient", "ingredient_amount", "recipe_id" ) 
VALUES 
( 'vegetable oil', '1 tablespoon', 1 ), 
( 'onion', '1 large', 1 ),
( 'garlic', '2 cloves', 1 ),
( 'jalapeño', '1', 1 ),
( 'garam masala', '2 tablespoons', 1 ),
( 'turmeric', '1 teaspoon', 1 ),
( 'salt', '1 teaspoon', 1 ),
( 'black pepper', '1 teaspoon', 1 ),
( 'diced fresh tomato', '2 cups', 1 ),
( 'chickpeas', '2 cans', 1 ),
( 'water', '½ cup', 1 ),
( 'lemon', '½', 1 ),
( 'fresh cilantro', '¼ cup', 1 );


INSERT INTO "ingredients" ( "ingredient", "ingredient_amount", "recipe_id" ) 
VALUES 
( 'almond milk', '2 cups', 2 ),
( 'vegan butter', '½ cup', 2 ),
( 'organic sugar', '¼ cup', 2 ),
( 'active dry yeast', '1 packet ', 2 ),
( 'flour', '5 ½ cups', 2 ),
( 'salt', '1 teaspoon', 2 ),
( 'vegan butter', '¾ cup', 2 ),
( 'brown sugar', '¾ cup', 2 ),
( 'powdered sugar', '1 cup', 2 ),
( 'almond milk', '2 tablespoons', 2 ),
( 'vanilla extract', '½ teaspoon', 2 )
;


--insert statements for instructions table:


INSERT INTO "instructions" ( "instruction", "recipe_id" ) 
VALUES 
( 'Heat olive oil in a large stock pot or dutch oven over medium-high heat.', 1 ),
( 'Add onion and cook until onion becomes translucent and begins to brown, about 3-5 minutes.', 1 ),
( 'Add garlic, ginger, and jalapeño. Continue to cook over medium heat until garlic is fragrant and jalapeño is tender, about 3-4 minutes.', 1 ),
( 'Add garam masala, turmeric, salt, and pepper then continue to cook for 1-2 minutes.', 2 ),
( 'Add tomatoes, chickpeas, and water. Stir to incorporate, making sure to use the spoon the scrape off any brown bits that have appeared on the bottom or sides of the pot.', 1 ),
( 'As the tomatoes break down, the mixture should take on the texture of a thick stew. Add more water if needed before bringing everything to a simmer and then cover with a lid.', 1 ),
( 'Once covered, cook for 15 minutes while stirring occasionally.', 1 ),
( 'Remove lid, reduce heat to low and mix in the lemon juice and chopped cilantro. Cook over low heat 1-2 minutes until the cilantro has wilted and turned bright green.', 1 ),
( 'Serve over basmati rice or with a side of naan.', 1 ),
( 'Enjoy!', 1 );


INSERT INTO "instructions" ( "instruction", "recipe_id" ) 
VALUES 
( 'Generously rub two disposable foil pie pans with vegan butter.', 2 ),
( 'In a large bowl, whisk together the almond milk, melted butter, and sugar. The mixture should be just warm, registering between 100-110˚F (37-43˚C). If it is hotter, allow to cool slightly.', 2 ),
( 'Sprinkle the yeast evenly over the warm mixture and let set for 1 minute.', 2 ),
( 'Add 5 cups flour and 1 teaspoon of salt to the milk mixture and mix with a wooden spoon until just combined.', 2 ),
( 'Cover the bowl with a towel or plastic wrap and set in a warm place to rise for 1 hour.', 2 ),
( 'Preheat oven to 350˚F (180˚C).', 2 ),
( 'After 1 hour, the dough should have nearly doubled in size.', 2 ),
( 'Remove the towel and add an additional ½ cup (95g) of flour and salt. Stir well, then turn out onto a well-floured surface.', 2 ),
( 'Knead the dough lightly, adding additional flour as necessary, until the dough just loses its stickiness and does not stick to the surface.', 2 ),
( 'Roll the dough out into a large rectangle, about ½-inch (1 cm) thick. Fix corners to make sure they are sharp and even.', 2 ),
( 'Spread the softened vegan butter evenly over the dough.', 2 ),
( 'Sprinkle evenly with brown sugar and cinnamon.', 2 ),
( 'Roll up the dough, forming a log, and pinch the seam closed. Place seam-side down. Trim off any unevenness on either end.', 2 ),
( 'Cut the log in half, then divide each half into 7 evenly sized pieces. About 1½ inches (8 cm) thick each.', 2 ),
( 'Place 7 cinnamon rolls in each cake pan, one in the center, six around the sides. Cover with plastic wrap and place in a warm place to rise for 30 minutes.', 2 ),
( 'To prepare the frosting. In a medium-size mixing bowl, whisk together powdered sugar, almond milk, and vanilla until smooth.', 2 ),
( 'Remove plastic wrap. Bake the cinnamon rolls in a preheated oven at 350˚F (180˚C) for 25-30 minutes, until golden brown.', 2 ),
( 'While still warm, drizzle evenly with frosting.', 2 ),
( 'Enjoy!', 2 );












---------------------***** QUERIES: *****---------------------


-- Get recipe types 
SELECT * FROM recipe_types;


-- Get all recipe information for the recipe cards 
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
;


-- Get all recipes accoring to recipe type (3 will be replaces with a dynamic number) for the homepage filtering 
SELECT 
    *
FROM 
    recipes 
WHERE 
    recipe_type_id = 3;



-- Get all from recipes table
 SELECT 
    *
 FROM 
    recipes; 


-- Get all from ingredients for a specific recipe  (1 will be replaces with a dynamic number or whatever id the recipe is)
SELECT 
*
FROM 
    ingredients
WHERE
    ingredients.recipe_id=1;



-- Get all from instructions for a specific recipe  (1 will be replaces with a dynamic number or whatever id the recipe is)
SELECT 
    *
 FROM
    instructions
 WHERE 
    instructions.recipe_id=1;


-- Post a user like (numbers will be dynamic according to user id and recipe id)
INSERT INTO 
    "liked_recipes" ("recipes_id", "user_id")
VALUES 
    (2, 3);



 -- Post to user's saved recipes (numbers will be dynamic according to user id and recipe id)

 INSERT INTO 
    "saved_recipes" ("recipes_id", "user_id")
 VALUES 
    (2, 3);



--Get recipe types from saved_recipes table (where the user.id = the user_id)
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
;



-- Get recipe type for a specific recipe 
SELECT
*
FROM
recipe_types
WHERE 
recipe_types.id = 1;



-- Get all information for recipe page 
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
;