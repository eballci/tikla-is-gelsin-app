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
import {useAppDispatch, useAppSelector} from "../../../../store/hooks";
import {fetchSeeker} from "../../../../store/store";
import Skeleton from "./skeleton";

export default function Feed() {
    const dispatch = useAppDispatch();
    const isFetching = useAppSelector((state) => state.seeker.isFetching);

    const handleRefresh = (event: CustomEvent<RefresherEventDetail>) => {
        dispatch(fetchSeeker(() => {
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
                {isFetching && <Skeleton/>}
            </IonContent>
        </IonPage>
    );
}