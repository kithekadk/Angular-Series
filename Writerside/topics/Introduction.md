# Introduction To Angular


This is a guide to helping you learn angular from basics to advanced concepts. Involves understanding the essentials of building with the framework, developing, testing and deployment of applications build on Angular.

### Prerequisites
- [Node.js](https://nodejs.org/en)
- Text Editor
- Angular CLI

#### Installing Angular CLI
```
npm install -g @angular/cli
```

### Creating a new project
With angular CLI installed, run `ng new <project-name>` in your terminal.
- Example:
> ng new todolist
> 
{style="note"}

- You will be presented with some configuration options for your project. Use the arrow and enter keys to navigate and select which options you desire.
- After you select the configuration options and the CLI runs through the setup, you should see the following message:

> $ ✔ Packages installed successfully.
> 
> $ Successfully initialized git.
> 
- You are ready to run the project locally

### Running project locally
- Switch to your new Angular project `cd todolist`
- Run `npm start` or `ng serve`
- Once everything is successful open the project on the browser on port `4200` or visit the path `http://localhost:4200`


## UNDERSTANDING THE FOLDER STRUCTURE

## Configuration files

- **.editorconfig** - Contains configuration for code editors.
- **.gitignore** - Specifies intentionally untracked files that Git should ignore.
- **README.md** - Documentation for the root application.
- **angular.json** - CLI configuration defaults for all projects in the workspace, including configurations to build, serve, and test tools that the CLI uses.
- **package.json** - Configures npm package dependencies.
- **package-lock.json** - Provides version information for all the packages installed into node_modules.
- **src** - Source files for the root level application project.
- **node_modules** - Provides the npm packages for the entire workspace.
- **tsconfig.json** - The base TypeScript configuration for projects in the workspace.


## Inside The SRC
### SRC/APP

- **app/app.component.ts** - Defines the logic for the application's root component, named `AppComponent`. The view associated with this root component becomes the root of the view hierarchy as you add components and services to your application.

- **app/app.component.html** - Defines the HTML template associated with the root `AppComponent`.

- **app/app.component.css** - Defines the base CSS file for the root `AppComponent`.

- **app/app.component.spec.ts** - Defines a unit test file for the root `AppComponent`.

- **app.routes.ts** - This file is responsible for defining the routes in the Angular application. It maps different paths to their respective components and modules, ensuring that the application navigates correctly based on user interactions. 
  - Each route can be configured with metadata such as `path`, `component`, `canActivate`, and others to control access and behavior.

- **app.config.ts** - This file manages the configuration settings for the Angular application. It might include environment-specific configurations, global settings, or API endpoint URLs that the application needs to function correctly. 
  - The `app.config.ts` file ensures that configuration is centralized and can be easily managed or modified without altering the core application logic.

