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

export default function Submissions() {
    const handleRefresh = (event: CustomEvent<RefresherEventDetail>) => {
        setTimeout(() => {
            event.detail.complete();
        }, 1000);
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Başvurular</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Başvurular</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
                    <IonRefresherContent></IonRefresherContent>
                </IonRefresher>
            </IonContent>
        </IonPage>
    );
}