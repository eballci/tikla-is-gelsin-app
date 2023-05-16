import {IonBadge, IonIcon, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, TabsCustomEvent,} from "@ionic/react";
import React from "react";
import {IonReactRouter} from "@ionic/react-router";
import {Route} from "react-router-dom";
import Login from "./pages/login";
import Feed from "./pages/feed";
import Offers from "./pages/offers";
import Submissions from "./pages/submissions";
import Profile from "./pages/profile";
import {albumsOutline, briefcaseOutline, paperPlaneOutline, personOutline} from "ionicons/icons";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {resetOfferNews} from "../../store/store";
import {Redirect} from "react-router";
import {PageType, savePageType} from "../../root/service";

export default function Seeker() {
    const offerNews = useAppSelector((state) => state.offerNews);
    const dispatch = useAppDispatch();

    const handleWhenTabChangedToOffers = (event: TabsCustomEvent): void => {
        if (event.detail.tab === "offers") {
            setTimeout(() => {
                dispatch(resetOfferNews());
            }, 250);
        }
    }

    savePageType(PageType.SEEKER);

    return (
        <IonReactRouter>
            <Route path="/seeker/login" exact component={Login}/>
            <IonTabs onIonTabsDidChange={handleWhenTabChangedToOffers}>
                <IonRouterOutlet>
                    <Redirect exact path="/seeker" to="/seeker/feed"/>
                    <Route path="/seeker/feed" exact component={Feed}/>
                    <Route path="/seeker/offers" exact component={Offers}/>
                    <Route path="/seeker/submissions" exact component={Submissions}/>
                    <Route path="/seeker/profile" exact component={Profile}/>
                </IonRouterOutlet>
                <IonTabBar slot="bottom">
                    <IonTabButton tab="feed" href="/seeker/feed">
                        <IonIcon aria-hidden="true" icon={albumsOutline}/>
                    </IonTabButton>
                    <IonTabButton tab="offers" href="/seeker/offers">
                        {
                            offerNews > 0 ? (<IonBadge>{offerNews}</IonBadge>) : (<></>)
                        }
                        <IonIcon aria-hidden="true" icon={briefcaseOutline}/>
                    </IonTabButton>
                    <IonTabButton tab="submissions" href="/seeker/submissions">
                        <IonIcon aria-hidden="true" icon={paperPlaneOutline}/>
                    </IonTabButton>
                    <IonTabButton tab="profile" href="/seeker/profile">
                        <IonIcon aria-hidden="true" icon={personOutline}/>
                    </IonTabButton>
                </IonTabBar>
            </IonTabs>
        </IonReactRouter>
    );
}