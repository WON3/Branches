import React from "react";
import { Switch, Route } from "react-router-dom";

import Login from "./Components/Views/Login/Login";
import User from "./Components/Views/User/User";
import View_Story from "./Components/Views/View_Story/View_Story";
import StoryWizardOne from "./Components/Views/CreateStory/StoryWizardOne/StoryWizardOne";
import StoryWizardTwo from "./Components/Views/CreateStory/StoryWizardTwo/StoryWizardTwo";
import StoryWizardThree from "./Components/Views/CreateStory/StoryWizardThree/StoryWizardThree";
import StoryWizardFour from "./Components/Views/CreateStory/StoryWizardFour/StoryWizardFour";
import Dashboard from "./Components/Views/Dashboard/Dashboard";
import Write_Contribution from "./Components/Views/Write_Contribution/Write_Contribution";



export default (
  <Switch>
  <Route path="/user/:user_id" component={User}/>
  <Route path="/contribute/:story_id" component={Write_Contribution} />
  <Route path="/view_story/:story_id" component={View_Story} />
  <Route path="/create_one" component={StoryWizardOne} />
  <Route path="/create_two" component={StoryWizardTwo} />
  <Route path="/create_three" component={StoryWizardThree} />
  <Route path="/create_four" component={StoryWizardFour} />
  <Route path="/login" component={Login} />
  <Route path="/" component={Dashboard} />
  </Switch>
);