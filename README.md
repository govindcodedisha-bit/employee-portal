# Employee Portal (Angular 21 + Bootstrap)
Welcome to the Employee Portal repository. This project serves as a comprehensive guide for implementing a modern, responsive enterprise application using Angular 21 Standalone Components and Signals.

## Project Objectives
Systematic Integration: A clean, step-by-step approach to adding Bootstrap.

Modern Reactivity: Leveraging Angular Signals for state management.

Professional Workflow: Mastering Git, documentation, and debugging in VS Code.

## Installation & Setup
### 1. Project Initialization
We utilize a standalone architecture to eliminate NgModules for a lighter, faster application.

  Bash
  ng new employee-portal --standalone
  cd employee-portal
### 2. Automated Bootstrap Integration
We use @ng-bootstrap/ng-bootstrap via ng add. 
This is the preferred method as it automatically configures your angular.json styles and required dependencies.

Bash
ng add @ng-bootstrap/ng-bootstrap
3. Verification
Ensure your angular.json contains the Bootstrap path in the styles array:

JSON
"styles": [
  "node_modules/bootstrap/dist/css/bootstrap.min.css",
  "src/styles.css"
]
