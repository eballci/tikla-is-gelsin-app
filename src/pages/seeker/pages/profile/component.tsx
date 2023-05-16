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

export default function Profile() {
    const handleRefresh = (event: CustomEvent<RefresherEventDetail>) => {
        setTimeout(() => {
            event.detail.complete();
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
            </IonContent>
        </IonPage>
    );
}