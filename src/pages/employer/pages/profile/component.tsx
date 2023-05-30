import {useAppDispatch} from "../../../../store/hooks";
import {IonContent, IonPage, IonRefresher, IonRefresherContent, RefresherEventDetail} from "@ionic/react";
import {fetchEmployer} from "../../../../store/store";
import React from "react";

export default function Profile() {
    const dispatch = useAppDispatch();
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
            </IonContent>
        </IonPage>
    );
}