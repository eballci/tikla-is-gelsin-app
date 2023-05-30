import {IonBadge, IonIcon, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, TabsCustomEvent} from "@ionic/react";
import React, {useEffect} from "react";
import {PageType, savePageType} from "../../root/persistent";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {fetchEmployer, resetSubmissionNews} from "../../store/store";
import {readAllSubmissions} from "../../service/submission.service";
import {IonReactRouter} from "@ionic/react-router";
import {albumsOutline, briefcaseOutline, businessOutline, paperPlaneOutline, peopleCircleOutline} from "ionicons/icons";
import {Route} from "react-router-dom";
import {Redirect} from "react-router";
import Feed from "./pages/feed";
import Offers from "./pages/offers";
import Submissions from "./pages/submissions";
import Profile from "./pages/profile";
import Login from "./pages/login";
import Positions from "./pages/positions";

export default function Employer() {
    const submissionNews = useAppSelector((state) => state.employer.submissionNews);
    const employerId = useAppSelector((state) => state.employer.id);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (employerId !== 0)
            dispatch(fetchEmployer());
    }, [employerId]);

    const handleWhenTabChangedToSubmissions = (event: TabsCustomEvent): void => {
        if (event.detail.tab === "submissions") {
            setTimeout(async () => {
                dispatch(resetSubmissionNews());
                await readAllSubmissions(employerId);
            }, 250);
        }
    }

    savePageType(PageType.EMPLOYER);

    return (
        <IonReactRouter>
            <IonTabs onIonTabsDidChange={handleWhenTabChangedToSubmissions}>
                <IonRouterOutlet>
                    <Route exact path="/employer">
                        {
                            employerId !== 0 ? (
                                <Redirect to="/employer/feed"/>
                            ) : (
                                <Redirect to="/employer/login"/>
                            )
                        }
                    </Route>
                    {
                        employerId !== 0 ? (
                            <>
                                <Route path="/employer/feed" exact component={Feed}/>
                                <Route path="/employer/positions" exact component={Positions}/>
                                <Route path="/employer/offers" exact component={Offers}/>
                                <Route path="/employer/submissions" exact component={Submissions}/>
                                <Route path="/employer/profile" exact component={Profile}/>
                                <Route path="/employer/">
                                    <Redirect to="/employer/feed"/>
                                </Route>
                            </>
                        ) : (
                            <>
                                <Route path="/employer/login" exact render={() => <Login/>}/>
                                <Route path="/employer/">
                                    <Redirect to="/employer/login"/>
                                </Route>
                            </>
                        )
                    }
                </IonRouterOutlet>
                <IonTabBar slot="bottom">
                    <IonTabButton tab="feed" href="/employer/feed">
                        <IonIcon aria-hidden="true" icon={albumsOutline}/>
                    </IonTabButton>
                    <IonTabButton tab="positions" href="/employer/positions">
                        <IonIcon aria-hidden="true" icon={briefcaseOutline}/>
                    </IonTabButton>
                    <IonTabButton tab="offers" href="/employer/offers">
                        <IonIcon aria-hidden="true" icon={paperPlaneOutline}/>
                    </IonTabButton>
                    <IonTabButton tab="submissions" href="/employer/submissions">
                        {
                            submissionNews > 0 ? (<IonBadge>{submissionNews}</IonBadge>) : (<></>)
                        }
                        <IonIcon aria-hidden="true" icon={peopleCircleOutline}/>
                    </IonTabButton>
                    <IonTabButton tab="profile" href="/employer/profile">
                        <IonIcon aria-hidden="true" icon={businessOutline}/>
                    </IonTabButton>
                </IonTabBar>
            </IonTabs>
        </IonReactRouter>
    );
}