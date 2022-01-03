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

CREATE TABLE "shared_recipes" (
	"id" serial NOT NULL,
	"sender_id" integer NOT NULL,
	"receiver_id" integer NOT NULL,
	"recipe_id" integer NOT NULL,
	CONSTRAINT "shared_recipes_pk" PRIMARY KEY ("id")
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


ALTER TABLE "shared_recipes" ADD CONSTRAINT "shared_recipes_fk0" FOREIGN KEY ("sender_id") REFERENCES "user"("id");
ALTER TABLE "shared_recipes" ADD CONSTRAINT "shared_recipes_fk1" FOREIGN KEY ("receiver_id") REFERENCES "user"("id");
ALTER TABLE "shared_recipes" ADD CONSTRAINT "shared_recipes_fk2" FOREIGN KEY ("recipe_id") REFERENCES "recipes"("id");



--insert statements for recipe_types table: 

INSERT INTO "recipe_types" ("recipe_type") 
VALUES( 'Breakfast' ), ( 'Lunch' ), ( 'Dinner' ), ( 'Dessert' ), ( 'Snacks' );


--insert statements for recipes table:

INSERT INTO "recipes" ( "image_url", "recipe_name", "recipe_description", "difficulty", "prep_hours", "prep_minutes", "servings", "recipe_type_id" ) 
VALUES ( 'https://i.pinimg.com/564x/f0/12/06/f01206c69c82b064dc8de34ade2dd3ca.jpg', 'Channa Masala', 'Packed with plenty of spice, this healthy vegan curry recipe has less than 200 calories. For a more filling family meal, serve our chana masala with a roti', 'easy', '0', '30', '4', 3);


INSERT INTO "recipes" ( "image_url", "recipe_name", "recipe_description", "difficulty", "prep_hours", "prep_minutes", "servings", "recipe_type_id" ) 
VALUES ( 'https://i.pinimg.com/564x/ef/75/0b/ef750be73289b638282a9c902d85f954.jpg', 'Cinnamon Rolls', 'Treat yourself to the most delicious breakfast! These homemade vegan cinnamon rolls are so easy to make and are wonderfully fluffy and sweet.', 'intermediate', '1', '0', '8', 4 );


INSERT INTO "recipes" ( "image_url", "recipe_name", "recipe_description", "difficulty", "prep_hours", "prep_minutes", "servings", "recipe_type_id" ) 
VALUES ( 'https://dishingouthealth.com/wp-content/uploads/2019/02/SpicedLentilBurgers2.jpg', 'Spiced Lentil Burgers with Tahini Slaw', 'Spiced lentil burgers with tahini slaw are made with pantry-staple ingredients and come together in 30 minutes. Vegan, gluten free, freezer-friendly, and nutrient-packed.', 'intermediate', '0', '30', '4', 2 );


INSERT INTO "recipes" ( "image_url", "recipe_name", "recipe_description", "difficulty", "prep_hours", "prep_minutes", "servings", "recipe_type_id" ) 
VALUES ( 'https://www.ambitiouskitchen.com/wp-content/uploads/2019/04/bananaoatmealpancakes-6.jpg', 'Healthy Banana Oatmeal Pancakes', 'Banana oatmeal pancakes made right in the blender! These fluffy healthy pancakes are naturally gluten free, dairy free and contain no flour or added sugar. Get ready for a simple yet delicious breakfast!', 'Easy', '0', '40', '2', 1 );


INSERT INTO "recipes" ( "image_url", "recipe_name", "recipe_description", "difficulty", "prep_hours", "prep_minutes", "servings", "recipe_type_id" ) 
VALUES ( 'https://nadiashealthykitchen.com/wp-content/uploads/2021/02/vegan-coffee-cheesecakes_11.jpg', 'Vegan No-Bake Coffee Cheesecakes', 'We all need a good pick-me-up at the moment, and these delicious and decadent no-bake vegan coffee cheesecakes are exactly what you need after a long and stressful day!', 'intermediate', '0', '40', '12', 4 );


INSERT INTO "recipes" ( "image_url", "recipe_name", "recipe_description", "difficulty", "prep_hours", "prep_minutes", "servings", "recipe_type_id" ) 
VALUES ( 'https://cdn77-s3.lazycatkitchen.com/wp-content/uploads/2018/04/vegan-white-chocolate-cheesecake-cut-800x1200.jpg', 'White chocolate cheesecake with rhubarb and ginger', 'This insanely indulgent cheesecake has it all, it’s creamy and sweet and a little sour and a little (or a lot) spicy. If you have any white chocolate, ginger and rhubarb fiends in your life (vegan or not), make it for them this instant.', 'easy', '0', '40', '8', 4 );


INSERT INTO "recipes" ( "image_url", "recipe_name", "recipe_description", "difficulty", "prep_hours", "prep_minutes", "servings", "recipe_type_id" ) 
VALUES ( 'https://i0.wp.com/nourishingamy.com/wp-content/uploads/2020/05/vanilla-berry-acai-bowl-4.jpg?w=620&ssl=1', 'Vanilla berry açaí bowl', 'These vegan date sweetened peanut butter granola bars are one of my favorite no bake recipes to date (see what I did there?). They are packed with nutrition from natural peanut butter, rolled oats and medjool dates. Loaded with peanut butter flavor and so chewy and delicious!', 'easy', '0', '35', '8', 5 );


INSERT INTO "recipes" ( "image_url", "recipe_name", "recipe_description", "difficulty", "prep_hours", "prep_minutes", "servings", "recipe_type_id" ) 
VALUES ( 'https://wholesomecrumbs.com/wp-content/uploads/2021/09/vegandatesweetenedgranolabars.jpeg', 'Date Sweetened Peanut Butter Granola Bars', 'A vibrant, tropical and simple breakfast bowl filled with superfoods, fruits and plant-based protein. This acai bowl is perfect for breakfast or a snack and can be topped with anything you like.', 'easy', '0', '15', '1', 5 );


INSERT INTO "recipes" ( "image_url", "recipe_name", "recipe_description", "difficulty", "prep_hours", "prep_minutes", "servings", "recipe_type_id" ) 
VALUES ( 'https://i.pinimg.com/564x/0d/1b/52/0d1b52085e65825087961aa4e48d4e03.jpg', 'poke bowl with cashew yum yum sauce', 'This Pretty Vegan Poke Bowl with Cashew Yum Yum Sauce is healthy, filling, and loaded with plant protein. Complete with a delicious, creamy cashew sauce and all your other favorite toppings. This colorful, deconstructed sushi bowl is perfect for lunch, dinner, or easy meal prep.', 'easy', '0', '20', '4', 4 );


INSERT INTO "recipes" ( "image_url", "recipe_name", "recipe_description", "difficulty", "prep_hours", "prep_minutes", "servings", "recipe_type_id" ) 
VALUES ( 'https://images.squarespace-cdn.com/content/v1/5b21c1ccc258b4d21b103b6e/1532380602105-0M2BYJPT5IG9E13W5YFK/Pesto-Hummus2-4.jpg?format=1500w', 'Basil Pesto Hummus', 'Hummus is one of greatest snacks. Pack it with lunch along with some carrots and celery sticks for a healthy afternoon snack!', 'easy', '0', '12', '4', 5 );


INSERT INTO "recipes" ( "image_url", "recipe_name", "recipe_description", "difficulty", "prep_hours", "prep_minutes", "servings", "recipe_type_id" ) 
VALUES ( 'https://images.squarespace-cdn.com/content/v1/58fe2f0d8419c2c6c89d0b9c/1598238895093-O1PWHOL65JAGUXLMQE6Q/Berry+Swirl+Coconut+Milk+Ice+Cream+-+A+creamy+base+of+coconut+milk+or+cream+blended+with+vanilla+and+a+homemade+berry+compote+swirled+in%21+A+perfect+summery%2C+gluten+free%2C+and+vegan+ice+cream+that+is+delicious+and+easy%21+I+also+give+a+no-churn+method+in+case+you+don%27t+have+an+ice-cream+maker+-+Foody+First+-+Beth+Bierema?format=1500w', 'Berry swirl coconut ice cream', 'A creamy base of coconut milk or cream blended with vanilla and a homemade berry compote swirled in! A perfect summery, gluten free, and vegan ice cream that is delicious and easy! I also give a no-churn method in case you dont have an ice-cream maker!', 'easy', '12', '0', '8', 4 );



INSERT INTO "recipes" ( "image_url", "recipe_name", "recipe_description", "difficulty", "prep_hours", "prep_minutes", "servings", "recipe_type_id" ) 
VALUES ( 'https://cdn77-s3.lazycatkitchen.com/wp-content/uploads/2021/09/vegan-corn-ramen-lunch-800x1200.jpg', 'Vegan ramen with charred corn', 'This soup is creamy and sweet, warming and lightly spiced with ginger and chilli. It’s not difficult to make and it is a perfect for using up cooked corn. I tend to char my corn on a griddle pan first as it adds an extra flavour dimension, but cooked corn would work well enough too.', 'easy', '1', '15', '4', 3 );


INSERT INTO "recipes" ( "image_url", "recipe_name", "recipe_description", "difficulty", "prep_hours", "prep_minutes", "servings", "recipe_type_id" ) 
VALUES ( 'https://i1.wp.com/tuulia.co/wp-content/uploads/2017/04/avocado-and-almond-butter-smoothie.jpg?w=1200', 'Avocado & almond butter smoothie', 'Delicious avocado & almond butter smoothie for glowing skin - the perfect smoothie to start your day with', 'easy', '0', '10', '1', 3 );


INSERT INTO "recipes" ( "image_url", "recipe_name", "recipe_description", "difficulty", "prep_hours", "prep_minutes", "servings", "recipe_type_id" ) 
VALUES ( 'https://pinchofyum.com/wp-content/uploads/Tofu-Lettuce-Wraps.jpg', 'Firecracker Vegan Lettuce Wraps', 'Firecracker Lettuce Wraps that are happily vegan – with crispy tofu bits, saucy brown rice noodles, and a creamy sesame sauce.', 'easy', '0', '35', '1', 2 );


INSERT INTO "recipes" ( "image_url", "recipe_name", "recipe_description", "difficulty", "prep_hours", "prep_minutes", "servings", "recipe_type_id" ) 
VALUES ( 'https://images.squarespace-cdn.com/content/v1/559ed3abe4b0445daef65409/1458561515468-0G2GK7QW9O0X5DSZ9FHY/Chocolate+banana+chia+pudding+vegan+breakfast?format=2500w', 'Chocolate banana chia pudding', 'Friday morning calls for a gorgeous and delicious breakfast like this, right? Chocolate and banana is such an amazingly delicious combination and perfect for a luxurious chia breakfast like this!', 'easy', '0', '35', '2', 1 );


INSERT INTO "recipes" ( "image_url", "recipe_name", "recipe_description", "difficulty", "prep_hours", "prep_minutes", "servings", "recipe_type_id" ) 
VALUES ( 'https://images.squarespace-cdn.com/content/v1/559ed3abe4b0445daef65409/1474313891123-IFJJILDCRF95ZQT5Z8B4/Magical+summer+rolls+recipe?format=2500w', 'Magical summer rolls', 'We love finger food! In restaurants, spring rolls are usually eaten as an appetizer or side dish, these summer rolls can easily shine as the main course!', 'easy', '0', '45', '8', 2 );


INSERT INTO "recipes" ( "image_url", "recipe_name", "recipe_description", "difficulty", "prep_hours", "prep_minutes", "servings", "recipe_type_id" ) 
VALUES ( 'https://cupfulofkale.com/wp-content/uploads/2019/05/Roasted-Courgette-Pesto-Pasta-3.jpeg.webp', 'Roasted Courgette Pesto Pasta', 'Fresh, light and creamy roasted courgette pesto pasta is the ultimate summery pasta dish!', 'easy', '0', '30', '4', 3 );


INSERT INTO "recipes" ( "image_url", "recipe_name", "recipe_description", "difficulty", "prep_hours", "prep_minutes", "servings", "recipe_type_id" ) 
VALUES ( 'https://cookieandkate.com/images/2015/10/healthy-granola-recipe-1-1.jpg', 'Healthy Granola', 'This delicious healthy granola recipe is naturally sweetened with maple syrup (or honey). It’s made with oats, coconut oil and your favorite nuts and fruit. Make it your own! Recipe yields about 8 cups granola, enough for about 16 half-cup servings.', 'easy', '0', '25', '8', 5 );



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




INSERT INTO "ingredients" ( "ingredient", "ingredient_amount", "recipe_id" ) 
VALUES 
( 'cooked green lentils', '1½ cups', 5 ), 
( 'finely grated carrots', '½ cups', 5 ), 
( 'tomato paste', '2 Tbsp', 5 ), 
( 'chopped fresh parsley', '2 Tbsp', 5 ), 
( 'minced fresh garlic', '1 Tbsp', 5 ), 
( 'smoked paprika', '¾ Tbsp', 5 ), 
( 'ground cumin', '1 tsp', 5 ), 
( 'onion powder', '½ tsp', 5 ), 
( 'kosher salt', '¾ tsp', 5 ), 
( 'freshly ground black pepper', '½ tsp', 5 ), 
( 'olive oil', '2 Tbsp', 5 ), 
( 'toasted buns', '4', 5 ), 
('toasted buns', '4', 5 ), 
('lemon juice', '1 lemon', 5 ), 
('tahini', '2 Tbsp', 5 ), 
('granulated sugar', '1 tsp', 5 ), 
('shredded red cabbage', '2 cups', 5 ), 
('shredded carrots', '½ cup', 5 ), 
('fresh chopped parsley', '¼ cup', 5 ), 
('Salt and pepper', 'to taste', 5 )
;



INSERT INTO "ingredients" ( "ingredient", "ingredient_amount", "recipe_id" ) 
VALUES 
( 'medium ripe bananas', '2', 432 ), 
( 'unsweetened almond milk', '½ cup', 432 ), 
( 'teaspoon vanilla extract', '1 tsp', 432 ), 
( 'old fashioned rolled oats, gluten free if desired', '1½ cups', 432 ), 
( 'baking powder', '2 tbsp', 432 ),
( 'ground cinnamon', '½ tsp', 432 ),
( 'salt', '¼ tsp', 432 ),
( 'eggs', '2', 432 ),
( 'Olive oil', 'for cooking', 432 )
;


INSERT INTO "ingredients" ( "ingredient", "ingredient_amount", "recipe_id" ) 
VALUES 
( 'oat flour – rolled oats blended into a flour in the food processor (use gluten-free oats if necessary', '140g', 434 ), 
( 'cocoa powder', '140g', 434 ), 
( 'coconut oil, melted', '6 tbsp', 434 ),
( 'maple syrup', '4 tbsp', 434 ),
( 'salt', 'pinch', 434 ),
( 'raw cashews, soaked for 4 hours', '250g', 434 ),
( 'Planted almond drink with coffee', '150ml', 434 ),
( 'almond butter', '65g', 434 ),
( 'coconut oil, melted', '4 tbsp', 434 ),
( 'maple syrup', '4 tbsp', 434 ),
( 'instant coffee', '2 tbsp', 434 )
;


INSERT INTO "ingredients" ( "ingredient", "ingredient_amount", "recipe_id" ) 
VALUES 
( 'coconut oil', '62g', 435 ), 
( 'vegan biscuits', '300g', 435 ), 
( 'raw cacao butter', '100g', 435 ), 
( 'almond milk', '1 cup', 435 ), 
( 'maple syrup', '¾ cup', 435 ), 
( 'raw cashews', '½ cup', 435 ), 
( 'vanilla extract', '2½ tsp', 435 ), 
( 'freshly grated ginger', '4-5 tsp', 435 ), 
( 'lemon juice', '2 tbsp', 435 ), 
( 'fresh rhubarb', '3.5 oz', 435 ), 
( 'coconut sugar', '2 tbsp', 435 ), 
( 'orange', '1', 435 ), 
( 'cornflour / cornstarch ', '1 tsp', 435)
;


INSERT INTO "ingredients" ( "ingredient", "ingredient_amount", "recipe_id" ) 
VALUES 
( 'frozen açaí', '100g', 436 ), 
( 'ripe banana', '1', 436 ), 
( 'frozen berries', '80g', 436 ), 
( 'vanilla protein, optional*', '1 scoop', 436 ), 
( 'plant-based milk', '60ml', 436 ), 
( 'plant-based milk', '60ml', 436 )
;


INSERT INTO "ingredients" ( "ingredient", "ingredient_amount", "recipe_id" ) 
VALUES 
( 'medjool dates', '1 cup', 437 ),
( 'warm water', '4 tbsp', 437 ),  
( 'vanilla extract', '½ tsp', 437 ), 
( 'natural peanut butter', '½ cup', 437 ), 
( 'pink Himalayan salt', '½ tsp', 437 ), 
( 'rolled oats', '2½ cup', 437 ),
( 'mini vegan chocolate chips', '½ cup', 437 )
;


INSERT INTO "ingredients" ( "ingredient", "ingredient_amount", "recipe_id" ) 
VALUES 
( 'Extra-Firm Tofu', '1 Block', 438 ),
( 'Tamari', '¼ Cup', 438 ),
( 'Rice Wine Vinegar', '2 tsp', 438 ),
( 'Maple Syrup', '1 tsp', 438 ),
( 'Garlic Cloves Minced', '2', 438 ),
( 'Cornstarch', '1 tsp', 438 ),
( 'Cashews Soaked in hot water', '⅓ Cup', 438 ),
( 'Water', '⅓ Cup', 438 ),
( 'Garlic Cloves', '2', 438 ),
( 'Sriracha', '2 tsp', 438 ),
( 'Rice Wine Vinegar', '1 tsp', 438 ),
( 'Maple Syrup', '1 tsp', 438 ),
( 'White Miso Paste', '1 tsp', 438 ),
( 'Sea Salt', '¼ tsp', 438 ),
( 'Ginger Powder', '⅛ tsp', 438 ),
( 'Cooked Rice of Choice', '4 Cups', 438 ),
( 'Purple Cabbage Shredded', '1 Cups', 438 ),
( 'Edamame', '1 Cups', 438 ),
( ' Small Cucumber Sliced', '1', 438 ),
( 'Pineapple Sliced', '1 Cups', 438 ),
( 'Avocado Sliced', '1', 438 )
;


INSERT INTO "ingredients" ( "ingredient", "ingredient_amount", "recipe_id" ) 
VALUES 
( 'chickpeas', '1½ cup', 439 ),
( 'tahini', '⅓ Cup', 439 ),
( 'basil', '½ cup', 439 ),
( 'Parmesan', '¼ Cup', 439 ),
( 'garlic cloves', '2', 439 ),
( 'olive oil', '¼ Cup', 439 ),
( 'sumac', '¼ tsp', 439 ),
( 'salt and pepper', 'to taste', 439 )
;


INSERT INTO "ingredients" ( "ingredient", "ingredient_amount", "recipe_id" ) 
VALUES 
( 'mixed frozen berries', '1½ cup', 440 ),
( 'maple syrup', '¼ cup', 440 ),
( 'full fat coconut milk or cream', '2 cans', 440 ),
( 'natural cane sugar', '¼ cup', 440 ),
( 'vanilla extract', '1 tbs', 440 ),
( 'fine salt', '¼ tsp', 440 )
;


INSERT INTO "ingredients" ( "ingredient", "ingredient_amount", "recipe_id" ) 
VALUES 
( 'dried shiitake mushrooms', '5', 441 ),
( 'kombu', '¾ oz', 441 ),
( 'corn on the cob', '4', 441 ),
( 'vegetable oil', '2-3 tbsp', 441 ),
( 'shallots', '3', 441 ),
( 'garlic cloves', '4', 441 ),
( 'ginger', '¾ oz', 441 ),
( 'medium hot chilli,', '½', 441 ),
( 'white miso paste', '2 tbsp', 441 ),
( 'soy sauce', 'to taste', 441 ),
( 'rice wine vinegar', '1-2 tbsp', 441 ),
( 'toasted sesame oil', '4 tsp', 441 )
;


INSERT INTO "ingredients" ( "ingredient", "ingredient_amount", "recipe_id" ) 
VALUES 
( 'ripe avocado', '1', 443 ),
( 'frozen banana', '1', 443 ),
( 'almond butter', '1 tbsp', 443 ),
( 'fresh dates, pitted', '2', 443 ),
( 'vanilla extract', '½ tsp', 443 ),
( 'almond milk', '1½-2 cups', 443 )
;


INSERT INTO "ingredients" ( "ingredient", "ingredient_amount", "recipe_id" ) 
VALUES 
( 'peanut butter', '½ cup', 444 ),
( 'soy sauce', '½ cup', 444 ),
( 'sesame oil', '½ cup', 444 ),
( 'rice vinegar', '¼ cup', 444 ),
( 'chili paste', '2 tsp', 444 ),
( 'sugar', '2 tsp', 444 ),
( 'small knob fresh ginger', '1', 444 ),
( 'garlic clove', '1', 444 ),
( 'firm tofu', '1 container', 444 ),
( 'brown rice noodles', '4oz', 444 ),
( 'lettuce leaves', 'for wrapping', 444 )
;


INSERT INTO "ingredients" ( "ingredient", "ingredient_amount", "recipe_id" ) 
VALUES 
( 'unsweetened oat milk', '2 cup', 446 ),
( 'banana', '1', 446 ),
( 'vanilla extract', '½ tsp', 446 ),
( 'cinnamon', '½ tsp', 446 ),
( 'sea salt', 'pinch', 446 ),
( ' chia seeds', '¼ cup', 446 )
;


INSERT INTO "ingredients" ( "ingredient", "ingredient_amount", "recipe_id" ) 
VALUES 
( 'rice papers', '8-10', 447 ),
( 'avocado', '1-2', 447 ),
( 'sunflower sprouts', '1 cup', 447 ),
( 'carros', '1', 447 ),
( 'bell pepper', '1', 447 ),
( 'cucumber', '1', 447 ),
( 'yellow beets', '2', 447 ),
( 'polka beets', '2', 447 ),
( 'cilantro', '1 cup', 447 )
;


INSERT INTO "ingredients" ( "ingredient", "ingredient_amount", "recipe_id" ) 
VALUES 
( 'large courgettes', '2', 448 ),
( 'pine nuts', '50g', 448 ),
( 'spinach', '2 cups', 448 ),
( 'garlic cloves', '2', 448 ),
( 'Juice of half a lemon', '2 tbsp', 448 ),
( 'vegan soft cheese', '1 tbsp', 448 ),
( 'vegan parmesan', '3 tbsp', 448 ),
( 'loosely packed basil', '1 cup', 448 ),
( 'olive oil', '3 tbsp', 448 ),
( 'pasta', '400g', 448 )
;


INSERT INTO "ingredients" ( "ingredient", "ingredient_amount", "recipe_id" ) 
VALUES 
( 'old-fashioned rolled oats', '4 cups', 449 ),
( 'raw nuts and/or seeds', '1 ½ cup', 449 ),
( 'sea salt', '1 tbs', 449 ),
( 'ground cinnamon', '½ tbs', 449 ),
( 'olive oil', '½ cup', 449 ),
( 'honey', '½ cup', 449 ),
( 'vanilla extract', '1 tbs', 449 ),
( '⅔ cup dried fruit', '⅔ cup', 449 )
;




--insert statements for instructions table:


INSERT INTO "instructions" ( "instruction", "recipe_id" ) 
VALUES 
( 'Heat olive oil in a large stock pot or dutch oven over medium-high heat.', 5 ),
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




INSERT INTO "instructions" ( "instruction", "recipe_id" ) 
VALUES 
('Place 1 cup of the lentils in a large bowl and thoroughly mash. Stir in remaining 1/2 cup whole lentils. Squeeze carrots with a paper towel to remove excess moisture, and stir into lentil mixture. Add next 8 burger ingredients (tomato paste through black pepper); mix well until cohesive. Divide and shape lentil mixture into 4 patties. (*Note: if mixture is too wet, sprinkle in 1 to 2 Tbsp. flour of choice).', 5 ),
('Heat oil in a large skillet over medium-high heat. Cook burger patties until golden brown, about 3 to 4 minutes on each side.', 5 ),
('Prepare Tahini Slaw by combining lemon juice, tahini, and sugar in a bowl; mix well. Toss with cabbage, carrots, and parsley; season to taste with salt and pepper.', 5),
('Place one lentil burger on each of 4 buns. Top lentil patties with slaw.', 5)
;



INSERT INTO "instructions" ( "instruction", "recipe_id" ) 
VALUES 
('Add all of the ingredients to a blender and blend on high until completely smooth, about 30 seconds to 1 minute. Let the batter sit in your blender while you heat your pan up.', 432 ),
('Lightly coat a griddle with coconut oil, vegan butter or olive oil and place over medium heat. Once pan is hot, add 1/3 cup of the batter to the griddle for each pancake and cook for 2-4 minutes until pancakes slightly puff up and you see a few bubbles along the edges.', 432 ),
('Flip cakes and cook until golden brown on underside. If you find that pancakes are browning too quickly then you need to lower the heat. I normally start on medium heat, then decrease to medium low later so that my pancakes dont burn. if at any point your griddle starts smoking, it means your pan is too hot.', 432 ),
('Wipe skillet clean and repeat with more oil and remaining batter. Makes 9 pancakes total. Serves 3, 3 pancakes each.', 432 ),
('enjoy!', 432 )
;


INSERT INTO "instructions" ( "instruction", "recipe_id" ) 
VALUES 
('In a bowl mix together all the base ingredients, then press into silicon cupcake/muffin moulds. Freeze for 15 minutes while you make the cheesecake layer.', 434 ),
('Drain and rinse the cashews, then transfer into a food processor along with the rest of the cheesecake ingredients. Blend on high until smooth, then divide between the muffin moulds and freeze again for 4 hours or overnight.', 434 ),
('Top with melted chocolate and decorate with coffee beans or chopped nuts.
', 434 ),
('Enjoy', 434 )
;


INSERT INTO "instructions" ( "instruction", "recipe_id" ) 
VALUES 
('Heat up the oven to 190º C / 375º F.', 435 ),
('Melt the coconut oil gently in a small pot.', 435 ),
('Grind your biscuits in a food processor until you get a delicate crumb.', 435 ),
('Add the melted coconut oil and process until the mixture sticks together, if it’s too dry add a few teaspoons of almond milk, but let the biscuits and oil sit together for a few minutes before you judge. In fact, I tend to transfer the mixture to a large bowl and play with it a bit before I decide if any more moisture is needed.', 435 ),
('Transfer the mixture to the lined tin and press it into the base really well, creating a compact biscuit base. I used the bottom of a glass to ensure the base is smooth, even and well bound. Place in the fridge while you make the other two components.', 435 ),
('Chop the rhubarb into 2.5 cm / 1″ pieces.', 435 ),
('Place the rhubarb in a large baking dish, toss in the sugar (or maple syrup), orange juice and vanilla extract. If you want even more sharpness to your rhubarb, you are welcome to skip the sugar here.', 435 ),
('Roast the rhubarb until soft, for about 10 minutes. The thicker stalks may take a bit longer (12-15 minutes). Remove the rhubarb from the oven and allow it to cool down.', 435 ),
('If you wish, you could thicken the juices with a little cornflour so that they stay on the top of the cake. To do that, place the juices in a small pot and mix cornflour and a teaspoon of water in a small cup or saucer. Place the pot with the juices on a low heat, mix dissolved cornflour in and allow both to come to a gentle simmer, stirring the whole time. Simmer for a few minutes for the juices to thicken and allow the mixture to cool down.', 435 ),
('Melt the cacao butter gently, over a water bath. Allow it to cool down a little before adding it to the mixture.', 435 ),
('Put the plant milk, maple syrup and drained and rinsed cashews into a blender. If, like me, you don’t have a very powerful blender, I recommend doing this in two batches to be able to get the cashews blended super smooth and creamy.
', 435 ),
('Add melted cacao butter, vanilla, ginger and lemon juice to the blender until you get a super smooth mixture. Adjust the amount of sweetness and spiciness to taste.', 435 ),
('Pour the cheesecake mixture over the set base and place the tin in the fridge overnight (or 8 hours at least) to set.', 435 ),
('Once set, top with roasted rhubarb pieces, thickened roasting juices and chopped pistachios. Keep refrigerated.) to set.', 435 )
;


INSERT INTO "instructions" ( "instruction", "recipe_id" ) 
VALUES 
('Add all the acai bowl ingredients to a blender and process until thick and creamy. Add more milk as necessary for a smooth consistency.', 436 ),
('Pour into a bowl and top with your favourite toppings.', 436 ),
('enjoy!', 436 )
;



INSERT INTO "instructions" ( "instruction", "recipe_id" ) 
VALUES 
('First, line an 8×8 baking dish with parchment paper.', 437 ),
('Next, check your medjool dates. You want to make sure they are plump, moist and sticky. If they feel dry and hard & look wrinkled: soak them in hot water for 10-15 minutes, drain the water, and proceed with the recipe.', 437 ),
('Add your medjool dates, water and vanilla extract to a food processor and pulse for a minute or so until you get a caramel like texture. Make sure to stop every so often and scrape the mixture off the sides of the food processor and down toward the blade.', 437 ),
('Next, remove the blade and stir in the peanut butter (make sure your peanut butter is extra drippy!).', 437 ),
('Now add in the rolled oats, pink Himalayan salt and mini chocolate chips and mix very well until everything is sticking together.  I like to mix AND press down into the mixture with a rubber spatula so everything sticks, and you can also use your hands.', 437 ),
('Take out the granola bar mixture with your hands, squeeze to stick together and place in the baking dish. Press down with your hands or a spatula in a tight, even layer. Top with more mini chocolate chips (gently press the chocolate chips into the bars with a spatula or your fingers so they don’t fall off).', 437 ),
('Freeze for about 20-25 minutes, slice into 8 bars, then enjoy! If they still feel too soft and fragile to cut and handle, put them in the fridge until they harden a bit more.', 437 ),
('For the optional chocolate drizzle, melt about 1/4 cup mini vegan chocolate chips in the microwave and drizzle on top, then refrigerate to set.', 437 ),
('Store the granola bars covered in the fridge, and enjoy straight from the fridge!', 437 ),
('Enjoy!', 437 )
;




INSERT INTO "instructions" ( "instruction", "recipe_id" ) 
VALUES 
('Prepare the marinade by combining the tamari (or soy sauce), rice wine vinegar, maple syrup, and minced garlic.', 438 ),
('After tofu has been pressed, slice it into cubes and add to the marinade. Let sit for at least 15 minutes.', 438 ),
('While your tofu is marinating, make the yum yum sauce by combining all ingredients in a small blender and blending on high until creamy. If you’re not using a high-speed blender, make sure to soak your cashews for 15-30 minutes to soften.', 438 ),
('Remove tofu cubes from marinade (SAVE the marinade) and toss with cornstarch.', 438 ),
('Heat a small amount of oil in a pan over medium-high heat and add the tofu. Cook for about 18-20 minutes, tossing occasionally to brown all sides.', 438 ),
('Reduce heat to low and carefully pour back in the marinade. Stir frequently while the sauce thickens, about a minute or two.', 438 ),
('To serve, divide the rice between 4 bowls and add tofu, pineapple, edamame, cucumber, cabbage, and avocado. Drizzle on some yum yum sauce and add your favorite toppings.', 438 ),
('Enjoy!', 438 )
;


INSERT INTO "instructions" ( "instruction", "recipe_id" ) 
VALUES 
('Add chickpeas into a microwave safe bowl. Pour in 2 tbsp of the canning liquid. Microwave for 1 minute to 1:30 minutes until warm.', 439 ),
('Add the chickpeas to the work bowl of a food processor and blend until it forms a paste-like consistency. Add in tahini, basil, Parmesan, salt, pepper, sumac, and half of the olive oil. Blend until smooth. Drizzle in oil as needed to get it to get the desired thickness. Add more if necessary.', 439 ),
('Enjoy!', 439 )
;


INSERT INTO "instructions" ( "instruction", "recipe_id" ) 
VALUES 
('Place your ice cream maker’s bowl in the freezer overnight, or for at least 12 hours.', 440 ),
('To make the berry swirl, place the frozen mixed berries and 3 tablespoons of maple syrup in a medium saucepan over medium heat. Occasionally mash the berries to release their juices and help break apart. Cook for 10-15 minutes, or until syrupy and slightly thickened. Carefully pour mixture into a bowl (leaving the solid seeds that are left behind) and let it cool until its room temperature and then place in fridge.', 440 ),
('Move on to make the ice-cream base: Add the following ingredients to a blender: entire cans of coconut milk/cream, ¼ cup maple syrup, sugar, vanilla extract, and salt and blend on low-medium (so it doesn’t get super bubbly) for about 1-2 minutes to fully dissolve the sugar.', 440 ),
('Place the frozen ice cream bowl onto the ice cream maker, insert the arm, cover with the lid, and turn it on so the arm begins spinning. Follow the directions of your ice cream maker instructions if this differs. Pour in the liquid ice cream mixture and churn for 30-40 minutes. Mixture should look like soft-serve. Depending on the temperature of your ice cream bowl, it may only take 20 minutes.', 440 ),
('Once the ice cream is churned, spoon half the mixture into a freezer safe dish such as a loaf pan. Spoon over half the berry mixture and swirl through with a knife. Repeat with the remaining ice cream mixture and berry mixture. Smooth out the top. Cover pan with plastic wrap and freeze for 4-6 hours or until firm. Scoop into bowls if you’re not enjoying them with cookies, otherwise scoop some onto a cookie and top with another cookie! A hot ice cream scoop can also help with scooping!', 440 ),
('Leftovers can be kept in and air tight container for 3-4 weeks, however taste best the first week. Remove from freezer 10 minutes before serving for best texture and scoop ability (less time if you’ve already eaten some!)', 440 ),
('Enjoy!', 440 )
;


INSERT INTO "instructions" ( "instruction", "recipe_id" ) 
VALUES 
('Immerse dried shiitake and kombu in 1 litre / 4 cups of cold water, allow them to sit as long as you can – overnight is ideal, but not necessary.', 439 ),
('Heat up a griddle pan. Brush corn cobs with a little oil and arrange them on a griddle pan. Char on medium heat, turning every 3-5 minutes as necessary until cooked and lightly charred all over.', 439 ),
('Heat up 1-2 tbsp of oil in a medium pot. Once hot, add shallots, garlic, ginger and chilli (if using). Sauté on low / medium heat, stirring frequent, until lightly charred in places.', 439 ),
('Meanwhile, shave the kernels off the cobs with a sharp knife. Save the cobs and divide the kernels in half.', 439 ),
('Add in kombu, shittake, their soaking liquid and shaved corn cobs. Bring to a simmer – remove kombu just before the broth comes to the boil – and carry on simmering for 30 minutes to create a veggie stock.', 439 ),
('While the stock is simmering, steam your veggies (tenderstem broccoli takes 6-7 minutes, green beans take about 4 minutes), pan-fry / bake the tofu and cook the noodles – they can be cooked in the soup at the end but I prefer to do it separately to have more control.', 439 ),
('Once the stock is ready, fish out the mushrooms (you can slice them thinly and have in the soup or use in another dish) and corn cobs, pour the rest of it into a blender together with half of the corn kernels, soy milk, miso paste and a good pinch of salt and blitz until super smooth.', 439 ),
('Return the soup to the pot and warm it up gently. Season with vinegar and more salt (or soy sauce / tamari). Corn is sweet so I didn’t feel the need to add any sweet seasoning but if you do, a touch of mirin will work well. If you wanted the ramen extra indulgent, you can whisk in a tablespoon of cashew or almond butter* in at the end.', 439 ),
('Divide between bowls, serve with cooked ramen noodles, steamed veggies, your favourite tofu and remaining charred corn kernels. Garnish the bowls with chilli (or toasted sesame) oil, spring onions / scallions and crushed sesame seeds.', 439 ),
('Enjoy!', 439 )
;


INSERT INTO "instructions" ( "instruction", "recipe_id" ) 
VALUES 
('Noodle Prep: Soak your noodles in a bowl of lukewarm water for at least 30 minutes while prepping the rest of the recipe. You want the noodles to be soft and flexible.', 444 ),
('Sauce: Blend all the sauce ingredients together in a small blender or food processor until smooth and creamy.', 444 ),
('Tofu: Press the tofu with a few paper towels to get some of the moisture out. Cut the tofu into small pieces. Heat a little oil in a nonstick skillet. Add your tofu. Stir-fry until golden brown. I usually let it sauté for at least 15 minutes. Add about half of the sauce to the pan. Stir-fry for another 3-5 minutes. As the sauce browns, it will form small crispy pieces around the tofu. Yum! Transfer tofu to a bowl.', 444 ),
('Noodles: Drain and rinse your noodles. Add another swish of oil to the pan and plop the noodles in. Add about half of the remaining sauce. Stir fry for just a minute or two until coated. Add a splash of water if it’s too sticky. Remove from heat immediately and toss with the tofu.', 444 ),
('Lettuce Wrap It Up: Fill your butter lettuce leaves with the noodle/tofu mixture (it’s okay if it’s sticky – you’re just wrapping it up in lettuce). Top with peanuts, cashews, cilantro, scallions, lime, and/or Sriracha if you want.', 444 ),
('Enjoy!', 444 )
;


INSERT INTO "instructions" ( "instruction", "recipe_id" ) 
VALUES 
('Start by making the chia pudding. Blend all ingredients except the chia seeds in a high speed blender and blend until smooth. Add the mix to a mixing bowl and add the chia seeds and start to whisk vigorously to combine. Whisk for 3-5 minutes and let it set in the frindge for at least 30 minutes.', 446 ),
('Make the chocolate smoothie by simply blending all ingredients in a high speed blender.', 446 ),
('Assemble the Chocolate banana chia pudding by pouring half of the chia pudding in the bottom of a glass, add a thin layer of coconut cream on top of the chia pudding and then add half of the chocolate smoothie on top of the coconut cream. Top it off with some fresh cut banana and gluten free chocolate granola.', 446 )
;


INSERT INTO "instructions" ( "instruction", "recipe_id" ) 
VALUES 
('Make the sauce by blending all ingredients in a high speed blender. Blend until smooth.', 447 )
;

INSERT INTO "instructions" ( "instruction", "recipe_id" ) 
VALUES 
('Preheat oven to 180C/350F.', 448 ),
('Cut courgettes in half lengthways and then cut into semi circle slices. Place on a baking sheet, toss in some olive oil, salt and pepper and place in the oven for around 15 minutes.', 448 ),
('Place pine nuts in a small dry frying pan on medium heat and toast for a few minutes until turning golden brown. Alternatively place in the oven for a few minutes.', 448 ),
('Cook pasta according to packet instructions.', 448 ),
('When the courgettes are golden brown, soft and starting to fall apart remove from the oven and place in a food processor with the pine nuts and remaining ingredients apart from the oil.', 448 ),
('Blitz until the nuts are blended and it resembles a pesto. Slowly pour in the olive oil whilst giving it a final blitz. Taste and season with salt and pepper.', 448 ),
('Once the pasta is done, scoop out 1/4 cup of pasta water. Drain pasta and add the pesto, mix and then add the pasta water. It should be nice and creamy and glossy.', 448 ),
('Serve and top with some extra parmesan!', 448 )
;


INSERT INTO "instructions" ( "instruction", "recipe_id" ) 
VALUES 
('Preheat oven to 350 degrees Fahrenheit and line a large, rimmed baking sheet with parchment paper.', 449 ),
('In a large mixing bowl, combine the oats, nuts and/or seeds, salt and cinnamon. Stir to blend.', 449 ),
('Pour in the oil, maple syrup and/or honey and vanilla. Mix well, until every oat and nut is lightly coated. Pour the granola onto your prepared pan and use a large spoon to spread it in an even layer.', 449 ),
('Bake until lightly golden, about 21 to 24 minutes, stirring halfway (for extra-clumpy granola, press the stirred granola down with your spatula to create a more even layer). The granola will further crisp up as it cools.', 449 ),
('Let the granola cool completely, undisturbed (at least 45 minutes). Top with the dried fruit (and optional chocolate chips, if using). Break the granola into pieces with your hands if you want to retain big chunks, or stir it around with a spoon if you don’t want extra-clumpy granola.', 449 ),
('Store the granola in an airtight container at room temperature for 1 to 2 weeks, or in a sealed freezer bag in the freezer for up to 3 months. The dried fruit can freeze solid, so let it warm to room temperature for 5 to 10 minutes before serving.', 449 )
;











---------------------***** QUERIES: *****---------------------


-- Get recipe types 
SELECT * FROM recipe_types;


-- Get all recipe information for the recipe cards 
SELECT
    COUNT(liked_recipes.user_id) AS likes
FROM 
    recipes 
JOIN 
    liked_recipes 
ON
    liked_recipes.recipes_id=recipes.id
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