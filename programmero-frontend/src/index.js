import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import { compose, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import "./style/index.css";
import App from "./components/App";
import allReducers from "./reducers/_combineReducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(allReducers,
	composeEnhancers(applyMiddleware(thunk)),
);

const mainComponent = (<Provider store={store}><App /></Provider>);

ReactDOM.render(mainComponent, document.getElementById("root"));
