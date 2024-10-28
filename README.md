# Build Dependencies
1. npm: 10.9.0
2. WebStorm IDE

(I believe that's all we need to run React)

# Frontend Project Structure
## Main Directory Structure (src)
- **components:** View subcomponents
  - customer
  - cashier
  - manager
  - kitchen
  - menu-board
  - shared: components shared across multiple views (e.g., Button, List)
- **contexts:** simple global shared state (e.g. user data)
- **hooks:** commonly used React hooks
- **services:** interface between frontend and backend
  - api: HTTP client logic
    - endpoints: logically grouped API services (e.g., orderService, userService, etc.)
  - auth: authentication service
- **store:** Redux global state-management
  - slices: logical chunks of the app's overall state
  - middleware: logic that intercepts API requests to apply custom logic
- **utils:** helper scripts
- **views:** Primary react component for each view (Manager, Customer, etc.)
## Other Files
- **src/App.tsx:** main container component for the entire app; organizes all other components
- **src/index.tsx:** entry point of the app; this file typically renders the entire app to the DOM
- **package.json:** dependency/configuration information

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).