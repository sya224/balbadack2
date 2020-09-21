import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import reduxThunk from "redux-thunk";
import App from './App';
import './index.css';
import reducers from './reducers';
import { hos } from './actions'
// import {getNearHospitals, getNearHosByStar, getHosSearchList} from './actions'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(reduxThunk))
);



// console.log(store.getState())

// const unsubscribe = store.subscribe(() => console.log(store.getState()))

// store.dispatch(hos.likeHos(10))
// .then(() =>
//   console.log(store.getState().hos)
// )

// store.dispatch(getMyReviewList('sim'))
// .then(() =>
// console.log(store.getState().review_info.mylist))


// store.dispatch(getNearHospitals(37.504909, 127.048463, 0))
// .then(() => console.log('near', store.getState().hos_info.nearHosList, store.getState().status.nearHos))

// store.dispatch(getNearHosByStar(37.504909, 127.048463, 0))
// .then(() => console.log('bystar', store.getState().hos_info.nearHosByStar, store.getState().status.nearHosByStar))

// store.dispatch(getHosSearchList('동물병원', 0))
// .then(() => console.log('search', store.getState().hos_info, store.getState().status))

// unsubscribe()

ReactDOM.render(

  <Provider store={store}>
    <React.StrictMode>
    <App />
    </React.StrictMode>
  </Provider>,
  document.querySelector("#root")
);


