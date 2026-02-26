# employee-portal
Employee Portal Angular with Bootstrap Practice Project.



Installation Strategies
Objective: A systematic approach to adding Bootstrap to an Angular 21 project.
Step 1: Create/Open Project
ng new my-bootstrap-app --standalone
cd my-bootstrap-app
Step 2: Install ng-bootstrap (Automated)
Using ng add is the preferred method for Angular 21 as it handles all the configuration (styles, scripts, and imports) in one go.
ng add @ng-bootstrap/ng-bootstrap
Step 3: Verify Configuration
Check your angular.json file. The schematic should have added the Bootstrap CSS automatically:
"styles": [
"node_modules/bootstrap/dist/css/bootstrap.min.css",
"src/styles.css"
]
Step 4: Import into Standalone Component
Since we are in a module-less (Standalone) world, import the specific Bootstrap module you need in your component file.

