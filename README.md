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
* [The case for Flux](https://medium.com/swlh/the-case-for-flux-379b7d1982c6) - explaining the benefits of Flux style of managing data (applicable also to Redux)

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

As we can see, in [standard event-flow](http://redux.js.org/docs/basics/DataFlow.html) there's no room for event async events. All the processing is done right away!

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

## Immutable Data

**Source:** [Immutable Data @ Redux](http://redux.js.org/docs/faq/ImmutableData.html)

Redux & React detect changes on objects by doing a shallow compare (by comparing references).
In order for a change of an object be detactable, instead of changing the object directly we duplicate the object and then make change on the copy.
Redux will know that the object has changed by comparing the reference to the original object with the reference to the new object. Since objects are not the same, Redux will conclude that something has changed.

The following snippet shows how this works:


```javascript
	var store = {
		originalObj: {
			a: 5,
			b: 6
		}
	};

	function myReducer(store) {
		// creating a duplicate
		var objCopy = {
			a: store.originalObj.a,
			b: store.originalObj.b
		};

		// mutating the duplicate
		objCopy.a = 100;
		
		return({
				originalObj: objCopy
			});
	};

	// calling the reducer
	var newStore = myReducer(store);

	// detecting changes
	if(newStore.originalObj !== store.originalObj) {
		// ... here we implement some logic which handles the changes
	}
}
```
### Immutable is hard in JS

JavaScript doesnt support immutability out of the box. Instead, whenever we want to change some data in the store, we need to **take great care** to do it the immutable way. This produces a lot of boilerplate code, who's only purpose tu assure immutability.

Here's an example:

```javascript
var store = {
	car: {
		brand: 'BMW',
		color: 'white'
	}
};


function myReducer(store) {

	// creating a duplicate - here we assure the immutability
	var carCopy = {
		brand: store.car.brand,
		color: store.car.color
	};

	// mutating the duplicate - here we change the data
	carCopy.color = 'red';
	
	return({
			car: carCopy
		});
};
```

The task of assuring immutability can be made a bit easier by using libraries such as [Immutable.js](https://github.com/facebook/immutable-js)

If we apply Immutable.js to the previous example, we get the following:

```javascript
var store = {
	car: Immutable.Map({
		brand: 'BMW',
		color: 'white'
	})
};

function myReducer(store) {
	return({
			car: store.car.set('color', 'white') // [set] method returns a new copy of an object
		});
};
```

### Immutability pitfalls and anti-patterns

**Sources:** [React.js pure render performance anti-pattern](https://medium.com/@esamatti/react-js-pure-render-performance-anti-pattern-fb88c101332f)

Since React heavily relies on shallow equality checks, we need to be extra carefull **not to create new object instances** when they aren't neccecery. This is especially true in functions along the store > renderer pipeline, such as:

* mapStateToProps function
* mapDispatchToProps function
* render function itself

In following example a new Array object is created each time the ``render`` method is called (as long the ``options`` is ``undefined``), which causes the component to be re-rendered, although nothing ha changes.

```javascript
class Table extends PureComponent {
  render() {
    return (
      <div>
        {this.props.items.map(i =>
          <Cell data={i} options={this.props.options || []} />
         )}
       </div>
     );
  }
}
```

To fix this problem we need to create one shared instance on empty array, which is reused each time the ``render`` function is called. The fixed source can be found at [React.js pure render performance anti-pattern](https://medium.com/@esamatti/react-js-pure-render-performance-anti-pattern-fb88c101332f)

Things to remember:

* use (autobind-decorator)[https://www.npmjs.com/package/] to automatically bind methods to instance
	* use [jsx-no-bind esLint plugin](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md) to detect bad practices via build tool
* use memoization in ``mapStateToProps`` function (i.e. via [Reselect](https://github.com/reactjs/reselect))


# ToDo

Read the following:
* http://reactkungfu.com/2015/08/pros-and-cons-of-using-immutability-with-react-js/
* https://auth0.com/blog/intro-to-immutable-js/
* http://redux.js.org/docs/recipes/reducers/ImmutableUpdatePatterns.html


* continue the tutorial from
	* http://redux.js.org/docs/faq/ImmutableData.html
	* http://redux.js.org/docs/recipes/StructuringReducers.html