import {IonApp} from "@ionic/react";
import {IonReactRouter} from "@ionic/react-router";
import {Redirect, Switch} from "react-router";
import {Route} from "react-router-dom";
import Greeting from "../pages/greeting";
import Seeker from "../pages/seeker";
import Employer from "../pages/employer";
import React from "react";
import {retrievePageType} from "./service";

const Root = () => (
    <IonApp>
        <IonReactRouter>
            <Switch>
                <Redirect
                    exact
                    path="/"
                    to={`/${retrievePageType().toString().toLowerCase()}`}/>
                <Route path="/greeting" component={Greeting} exact/>
                <Route path="/seeker" component={Seeker}/>
                <Route path="/employer" component={Employer}/>
                <Route>
                    <Redirect to="/"/>
                </Route>
            </Switch>
        </IonReactRouter>
    </IonApp>
);

export default Root;