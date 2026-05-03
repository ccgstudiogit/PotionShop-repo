# Potion Shop - Full-Stack CRUD Application 🧪

A small full‑stack practice project built with Java + Springboot for the backend and vanilla HTML, CSS, and JavaScript for the frontend. The database uses
PostgreSQL. The goal was to create a retro‑styled potion shop interface with a working backend and a containerized database.

# Features
Potion management:
 - Create, edit, and delete potions
 - Assign ingredients to potions with quantities
 - Many-to-many relationship between potions and ingredients
 - Automatic UI updates after CRUD operations

Ingredient management:
 - Create and delete ingredients
 - Linked to potions through a join table
 - When ingredients are deleted, their link to their potion(s) is also deleted

Search and Filtering:
 - Search potions and ingredients by attributes (name, type, rarity, price, etc.)
 - Can combine filters for precise results (i.e. get all potions of types Healing and Buff with a price >= 40)
 - Sort potions/ingredients A-Z or Z-A

UI & UX:
 - Fully custom vanilla JS UI (I wanted to learn vanilla JS so I have an understanding of how JS works when I eventually start working with frameworks)
 - Modular rendering system, meaning that basically all of the HTML is generated via JS at runtime
   - This was done by using factories, i.e. element-factory.js
 - Modal window popups for confirmations and errors
 - Layout and lists always stay up to date, so no stale data is displayed

# Tech Stack
Backend:
 - Java 25
 - Spring Boot, Spring Boot JPA
 - PostgreSQL
 - RESTful API design
 - Service/controller/repository design

 Frontend:
  - HTML
  - CSS
  - Vanilla JavaScript (with modules)
  - Custom rendering and state management

# Running the Project
Backend setup:
 - Install Java 25
 - Install PostgreSQL
 - Create a database named potionshop (I use Docker)
 - Update application.properties with DB credentials (found in potionshop/src/main/resources)
 - Build and run the application (I use IntelliJ as my IDE to build/run)

To reset the database (wipe all changes and start off with starting data), go to potionshop/src/main/resources/application.properties and navigate to the line
spring.jpa.hibernate.ddl-auto=update (line 15). Change update to either create or create-drop, like this: spring.jpa.hibernate.ddl-auto=create then restart the
backend. At this point, the current tables will be overwritten with newly created tables with the seed data.

Frontend setup:
 - Open frontend/index.html in a local server (I use VSCode with Live Server). This is required since the modules need a live server
 - Ensure the backend uis running at the URL defined in frontend/scripts/api/api-utils.js (baseURL is http://localhost:8080/)

# Development Timeline
March 2026 - May 2026

# Development Reflection
This was my first attempt at a full-stack CRUD project, and my goal was to become more familiar with not only how full-stack development works, but also generally
to learn how frontends and backends interact with each other, how Spring Boot works with Java, to get more experience with HTML, CSS, and JS, and to challenge
myself. The biggest challenge I faced was the frontend, as I feel as though I have a somewhat backend-adjacent background with my Unity games. One particular
challenge that gave me a tough time was the potion add and edit forms. There was a lot to manage, especially with the ingredients, adding/removing them, updating
quantities, making sure that duplicates aren't allowed, etc. I also feel like my code could be even more modular and lego-brick-like, but the way I designed my
systems it was actually pretty easy to implement new things and to refactor. At one point, I did a complete overhaul of the frontend design because the previous
one just wasn't going to work, but the way I designed scripts such as potion-add-form.js and potion-form-utils.js it was easy to move stuff around and have things
still just work.

# Homepage Screenshot
![alt text](https://github.com/ccgstudiogit/PotionShop-repo/blob/main/demo-media/homepage_screenshot.jpg)

# Search Functionality
![alt text](https://github.com/ccgstudiogit/PotionShop-repo/blob/main/demo-media/potions.gif)

![alt text](https://github.com/ccgstudiogit/PotionShop-repo/blob/main/demo-media/ingredients.gif)

# Editing in Place
![alt text](https://github.com/ccgstudiogit/PotionShop-repo/blob/main/demo-media/edit-potion.gif)

# Deleting Ingredients & Relationships
![alt text](https://github.com/ccgstudiogit/PotionShop-repo/blob/main/demo-media/delete-ingredient.gif)