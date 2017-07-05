# React Redux Training Project

# Intro
This project was created while trying to wrap mz head around the strange an mysterious world of Redux magic.

This README file contins notes written down during this dangerous and exciting adventure.
ead. Long Live Composition
# Milestones

All milestones are commited to Git as separate commits, which means that each version can checked-out.

* 1st **(done)** create a **simple React app**
	* app should be sa simple counter
	* the single component should be a button with
* 2nd **(done)** add Redux to the mix
	* move state from the component into the Redux Store
* 3rd **(done)** expand the Redux solution to support multiple counters
	* only one counter button should be visible at the time
	* user should be able to select the active counter via the NavBar at the bottom
* 4th **(done)** add support for adding new counters
	* the footer should contain a "+" button via which the user can add new counters to the mix 
* 5th add Router to the mix
	* the app should have multiple counters: "A", "B", "C"
	* each counter should be accessible via a separate route
	* add a new Navbar component via which the user can change the route

# References

The following documentation was studied during the execution of this training:

* [Thinking in React](https://facebook.github.io/react/docs/thinking-in-react.html) - a condensed introduction to React
* [Presentational and Container Components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0) - how to organize code in React (MVVM the React way)
* [Mixins Are Dead. Long Live Composition](https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750)
* [Using Redux With React](http://redux.js.org/docs/basics/UsageWithReact.html) - core Redux article

Here's a list of articles which might be interesting to read:

* [Getting Started with Redux](https://egghead.io/courses/getting-started-with-redux) - video tutorial series

# Notes
## Redux Middleware

Middleware is a way to tap into the action processing pipeline. Actions are processed in the following stages:

* a new action is crated via action creator (function)
* action is dispatched via ``store.dispatch``
* processing is handed over to middleware (if one exists)
* Redux calls all registered reducers
* UI gets re-drawn

Middleware is just a simple function, which is called whenever an action is dispatched. The following block shows what middleware API looks like:

```javascript
	// [state] = refference to state object
	function genericMiddlewareFunction(state) {

		// [next] = the next middleware function,
		// which needs be called in order for the
		// processing to continue - we can terminate
		// action processing by not calling it
 		return function(next) {

			// [action] = action which was dispatched
			return function(action) {

				// here goes the middleware code

			}
		}
	}
```

The following code block shows how to registrate a middleware:
```javascript
	import { createStore, applyMiddleware } from 'redux'

	const store = createStore(
		rootReducer,
		applyMiddleware(
			genericMiddlewareFunction
  		)
	);
```

## Redux Async Operations & Thunk Middleware

Sources:

* [Redux Async Actions](http://redux.js.org/docs/basics/Actions.html)
* [Redux Middleware Tutorial - Redux Tutorial #5](https://www.youtube.com/watch?v=DJ8fR0mZM44)
* [Redux Async Actions - Redux Tutorial #6](https://www.youtube.com/watch?v=Td-2D-_7Y2E)
* [How to dispatch a Redux action with a timeout?](https://stackoverflow.com/questions/35411423/how-to-dispatch-a-redux-action-with-a-timeout/35415559#35415559)

The standard way an React application events work is:

* a DOM event handler function creates a new object by calling an action creator function
* the same event handler function then dispatches the new action via the dispatch ``method``
* React picks up the dispatched action and calls the reducer function
* reducer function returns the new Redux state
* React re-draws all the components

As we can see, in standard event-flow there's no room for event async events. All the processing is done right away!

In order to support async operations we need solve two problems:

* where to put the code which will trigger the async operation
* how to run a new action once the async operation has finished

The answer to both of these questions is: all of this is done from an new type of action creator function called **thunk**.

Regular action creation functions usually doesn't contain any logic - their job is to create and return a new action object.

Thunk action creator functions, instead of creating of returning a new action object, return a **new function**. There are two important sacts about this new function:

* it defines a new API, which is different from the one regular action creator function use
	* it has a single param ``dispatch``, through which it's passed the refference to the dispatch function
	* it returns a promise
* the function contains logic, which starts the async operation and attaches event handlers
* the event handlers defined within a thunk are called when the async operation is done
	* event handlers create a new action related to the finished async operation (by calling an action creator function)
	* event handlers dispatch the new action via provided ``dispatch`` function (passed as the argument to the thunk function)

Here's an example of a thunk action creator:

```javascript
	// this is a thunk action creator
	export function doSomeAsyncOperation() {

		// returning a function, which will be called from action creator
	  	return function (dispatch) {

			window.setTimeout(() => {

				// dispatching a regular action
				dispatch(showResult(subreddit, json))

			}, 1000);
	  }
	}

	/ this is a regular action creator
	export function showResult() {
		// returning a new action object
		return {
			type: "SHOW_RESULTS",
			text
		}
	}
```

Since Redux expects that action creators return an action object, we need to extend it's function by adding a ``redux-thunk`` middleware to the mix:

```javascript
	import thunkMiddleware from 'redux-thunk'
	import { createStore, applyMiddleware } from 'redux'

	const store = createStore(
		rootReducer,
		applyMiddleware(
			thunkMiddleware
  		)
	);
```

Starting of an async action is no different than starting regular one: simplay call the thunk function and dispatch it's result:

```javascript
	dispatch(doSomeAsyncOperation());
```

For more advanced use cases of async operation one shoud consider using the following middleware:
* [Redux Saga](https://github.com/redux-saga/redux-saga)
* [Redux Loop](https://github.com/redux-loop/redux-loop)

# ToDo