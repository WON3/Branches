import React from "react";
import { Switch, Route } from "react-router-dom";

import Login from "./Components/Views/Login/Login";
import User from "./Components/Views/User/User";
import StoryWizardOne from "./Components/Views/CreateStory/StoryWizardOne/StoryWizardOne";
import StoryWizardTwo from "./Components/Views/CreateStory/StoryWizardTwo/StoryWizardTwo";
import StoryWizardThree from "./Components/Views/CreateStory/StoryWizardThree/StoryWizardThree";
import StoryWizardFour from "./Components/Views/CreateStory/StoryWizardFour/StoryWizardFour";
import Dashboard from "./Components/Views/Dashboard/Dashboard";
import Contribute from "./Components/Views/Contribute/Contribute"
<<<<<<< HEAD
import View_Story from './Components/Views/View_Story/View_Story';
=======
import View_Story from "./Components/Views/View_Story/View_Story"
>>>>>>> 0af5ad649e2e332b61e83eed5523220fe74c7c0d



export default (
  <Switch>
  <Route path="/user/:user_id" component={User}/>
  <Route path="/user" component={User}/>
  <Route path="/contribute" component={Contribute} />
  <Route path="/create_one" component={StoryWizardOne} />
  <Route path="/create_two" component={StoryWizardTwo} />
  <Route path="/create_three" component={StoryWizardThree} />
  <Route path="/create_four" component={StoryWizardFour} />
  <Route path="/login" component={Login} />
  <Route path="/" component={Dashboard} />
  </Switch>
);