import {
    IonContent,
    IonHeader,
    IonPage,
    IonRefresher,
    IonRefresherContent,
    IonTitle,
    IonToolbar,
    RefresherEventDetail
} from "@ionic/react";
import React from "react";
import {fetchEmployer} from "../../../../store/store";
import {useAppDispatch, useAppSelector} from "../../../../store/hooks";
import Skeleton from "./skeleton";
import SuggestionList from "./suggestion-list";
import NoData from "./no-data";
import Error from "./error";

export default function Feed() {
    const dispatch = useAppDispatch();
    const isFetching = useAppSelector((state) => state.employer.isFetching);
    const isFetchingFailed = useAppSelector((state) => state.employer.isFetchingFailed);
    const suggestionCount = useAppSelector((state) => state.employer.me?.suggestions)?.length;

    const handleRefresh = (event: CustomEvent<RefresherEventDetail>) => {
        dispatch(fetchEmployer(() => {
            event.detail.complete();
        }));
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Öneriler</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Öneriler</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
                    <IonRefresherContent></IonRefresherContent>
                </IonRefresher>
                {(isFetching && !isFetchingFailed) && <Skeleton/>}
                {(!isFetching && !isFetchingFailed) && <SuggestionList/>}
                {(suggestionCount === 0 && !isFetchingFailed && !isFetching) && <NoData/>}
                {isFetchingFailed && <Error/>}
            </IonContent>
        </IonPage>
    );
}