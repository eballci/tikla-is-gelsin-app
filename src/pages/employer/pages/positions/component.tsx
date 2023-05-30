import {useAppDispatch} from "../../../../store/hooks";
import {
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonPage,
    IonRefresher,
    IonRefresherContent,
    IonTitle,
    IonToolbar,
    RefresherEventDetail
} from "@ionic/react";
import {fetchEmployer} from "../../../../store/store";
import React from "react";
import {addOutline} from "ionicons/icons";

export default function Positions() {
    const dispatch = useAppDispatch();
    const handleRefresh = (event: CustomEvent<RefresherEventDetail>) => {
        dispatch(fetchEmployer(() => {
            event.detail.complete();
        }));
    };

    const handleCreate = () => {
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>İlanlarınız</IonTitle>
                    <IonButtons slot="end">
                        <IonButton size="large"
                                   onClick={handleCreate}>
                            <IonIcon color="dark"
                                     icon={addOutline}/>
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">İlanlarınız</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
                    <IonRefresherContent></IonRefresherContent>
                </IonRefresher>
            </IonContent>
        </IonPage>
    );
}