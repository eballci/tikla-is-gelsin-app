import {useAppDispatch, useAppSelector} from "../../../../store/hooks";
import {IonContent, IonPage, IonRefresher, IonRefresherContent, RefresherEventDetail} from "@ionic/react";
import {fetchEmployer} from "../../../../store/store";
import React from "react";
import Skeleton from "./skeleton";
import Details from "./details";
import Error from "./error";

export default function Profile() {
    const dispatch = useAppDispatch();
    const isFetching = useAppSelector((state) => state.employer.isFetching);
    const isFetchingFailed = useAppSelector((state) => state.employer.isFetchingFailed);

    const handleRefresh = (event: CustomEvent<RefresherEventDetail>) => {
        dispatch(fetchEmployer(() => {
            event.detail.complete();
        }));
    };

    return (
        <IonPage>
            <IonContent fullscreen>
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