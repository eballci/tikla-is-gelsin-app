import {IonApp} from "@ionic/react";
import {IonReactRouter} from "@ionic/react-router";
import {Switch} from "react-router";
import {Route} from "react-router-dom";
import Greeting from "../pages/greeting";
import Seeker from "../pages/seeker";
import Employer from "../pages/employer";

const Root = () => (
    <IonApp>
        <IonReactRouter>
            <Switch>
                <Route path="/" component={Greeting} exact/>
                <Route path="/seeker" component={Seeker}/>
                <Route path="/employer" component={Employer}/>
            </Switch>
        </IonReactRouter>
    </IonApp>
);

export default Root;