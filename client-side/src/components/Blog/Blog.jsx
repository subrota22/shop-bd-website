
import React from 'react';
import "./Blog.css" ;

const Blog = () => {
    return (
        <div>
        <h2 className='text-center text-info '> This is blogs page </h2>   
<div className='fs-4 text-info p-3'>
 <h2>Redux Toolkit</h2>
Redux Toolkit is our official recommended adivproach for writing Redux logic. It wraps around the Redux core, and contains packages and functions that we think are essential for building a Redux app. Redux Toolkit builds in our suggested best practices, simplifies most Redux tasks, prevents common mistakes, and makes it easier to write Redux applications.
<h2> Installation  </h2>
RTK includes utilities that help simplify many common use cases, including store setup, creating reducers and writing immutable update logic, and even creating entire "slices" of state at once.

Whether you're a brand new Redux user setting up your first project, or an experienced user who wants to simplify an existing application, Redux Toolkit can help you make your Redux code better.
Create a React Redux App
The recommended way to start new apps with React and Redux is by using the official Redux+JS template or Redux+TS template for Create React App, which takes advantage of Redux Toolkit and React Redux's integration with React components.

# Redux + Plain JS template
npx create-react-app my-app --template redux

# Redux + TypeScript template
npx create-react-app my-app --template redux-typescript

Redux Core
The Redux core library is available as a package on NPM for use with a module bundler or in a Node application:

# NPM
npm install redux

# Yarn
yarn add redux

It is also available as a precompiled UMD package that defines a window.Redux global variable. The UMD package can be used as a tag directly.

For more details, see the Installation page.

Basic Example
The whole global state of your app is stored in an object tree inside a single store. The only way to change the state tree is to create an action, an object describing what happened, and dispatch it to the store. To specify how state gets updated in response to an action, you write pure reducer functions that calculate a new state based on the old state and the action.
       </div>
    
        </div>
    );
};

export default Blog;