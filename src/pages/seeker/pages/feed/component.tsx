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

export default function Feed() {
    const handleRefresh = (event: CustomEvent<RefresherEventDetail>) => {
        setTimeout(() => {
            event.detail.complete();
        }, 1000);
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
            </IonContent>
        </IonPage>
    );
}