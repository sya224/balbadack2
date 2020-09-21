import React from "react";
import { Router, Route } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import history from "./history";

import Main from "./screens/Main/Main";

import SignIn from './screens/SignIn/SignIn';
import SignUp from './screens/SignUp/SignUp';
import MyPage from "./screens/MyPage/MyPage";
import MyPetList from './components/MyPetList/MyPetList'; //..?왜있지?

import ResTab from "./screens/Res/ResTab";
import HosRes from "./screens/Res/HosRes";
import ReviewRes from './screens/Res/ReviewRes';

import HosDetail from "./screens/HosDetail/HosDetail";
import ReviewDetail from "./screens/ReviewDetail/ReviewDetail";

import SelectOption from "./screens/ReviewForm/selectOption";
import ReviewForm from "./screens/ReviewForm/ReviewForm";

import hosRevForDetail from './screens/HosDetail/hosRevForDetail';
const App = () => {
  return (
    <div>
      <Router history={history}>
        <Navigation>
          <div>
            <Route path="/" exact component={Main} />
            <Route path="/Main" exact component={Main} />
            <Route path="/SignIn" exact component={SignIn} />
            <Route path="/SignUp" exact component={SignUp} />
            <Route path="/MyPage" exact component={MyPage} />
            <Route path="/MyPetList" exact component={MyPetList} />
            <Route path="/ResTab" exact component={ResTab} />
            <Route path="/HosRes" exact component={HosRes} />
            <Route path="/ReviewRes" exact component={ReviewRes} />
            <Route path="/HosDetail" exact component={HosDetail} />
            <Route path="/ReviewDetail" exact component={ReviewDetail} />
            <Route path="/SelectOption" exact component={SelectOption} />
            <Route path="/ReviewForm" exact component={ReviewForm} />
            <Route path="/hosRevForDetail" exact component={hosRevForDetail} />
          </div>
        </Navigation>

      </Router>
    </div>
  );
};

export default App;

