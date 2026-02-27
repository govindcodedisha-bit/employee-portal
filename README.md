# Employee Portal (Angular 21 + Bootstrap)
Welcome to the Employee Portal repository. This project serves as a comprehensive guide for implementing a modern, responsive enterprise application using Angular 21 Standalone Components and Signals.

## Project Objectives
Systematic Integration: A clean, step-by-step approach to adding Bootstrap.

Modern Reactivity: Leveraging Angular Signals for state management.

Professional Workflow: Mastering Git, documentation, and debugging in VS Code.

## Environment Check & Preparation
#### Objective: Confirm that the local environment meets the requirements for Angular 21.
Before installing Bootstrap, every student should run these commands in their terminal to ensure they have the 
minimum required versions.
#### Check NPM Version: npm-v
    (Requirement: npm 10.x or higher is recommended for Angular 21)
  
### Check Angular CLI Version: ng version or ng v
    (Requirement: Should show Angular CLI: 21.x.x)
### Confirm Node.js Version: node -v
    (Requirement: Node.js v20.19.0+ or newer)
Pro Tip: If ng is not recognized, students may need to install it globally using npm install -g @angular/cli

## Installation Strategies
Objective: A systematic approach to adding Bootstrap to an Angular 21 project.
#### Step 1: Create/Open Project
   ng new my-bootstrap-app --standalone
   cd my-bootstrap-app
### Step 2: Install ng-bootstrap (Automated)
Using ng add is the preferred method for Angular 21 as it handles all the configuration (styles, scripts, and imports) in one go.
#### ng add @ng-bootstrap/ng-bootstrap
### Step 3: Verify Configuration
  Check your angular.json file. The schematic should have added the Bootstrap CSS automatically:
   "styles": [
   "node_modules/bootstrap/dist/css/bootstrap.min.css",
   "src/styles.css"
  ]
### Step 4: Import into Standalone Component
Since we are in a module-less (Standalone) world, import the specific Bootstrap module you need in your component file.
