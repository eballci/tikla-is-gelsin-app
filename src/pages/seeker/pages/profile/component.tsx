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
import {useAppDispatch, useAppSelector} from "../../../../store/hooks";
import {fetchSeeker} from "../../../../store/store";
import Skeleton from "./skeleton";
import Error from "./error";
import Details from "./details";

export default function Profile() {
    const dispatch = useAppDispatch();
    const isFetching = useAppSelector((state) => state.seeker.isFetching);
    const isFetchingFailed = useAppSelector((state) => state.seeker.isFetchingFailed);

    const handleRefresh = (event: CustomEvent<RefresherEventDetail>) => {
        setTimeout(() => {
            dispatch(fetchSeeker(() => event.detail.complete()));
        }, 1000);
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Profil</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Profil</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
                    <IonRefresherContent></IonRefresherContent>
                </IonRefresher>
                {(isFetching && !isFetchingFailed) && <Skeleton/>}
                {(!isFetching && !isFetchingFailed) && <Details/>}
                {isFetchingFailed && <Error/>}
            </IonContent>
        </IonPage>
    );
}