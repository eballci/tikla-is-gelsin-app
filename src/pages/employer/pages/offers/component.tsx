import {useAppDispatch, useAppSelector} from "../../../../store/hooks";
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
import {fetchEmployer} from "../../../../store/store";
import React from "react";
import Skeleton from "./skeleton";
import OfferList from "./offer-list";
import NoData from "./no-data";
import Error from "./error";

export default function Offers() {
    const dispatch = useAppDispatch();
    const isFetching = useAppSelector((state) => state.employer.isFetching);
    const isFetchingFailed = useAppSelector((state) => state.employer.isFetchingFailed);
    const offerCount = useAppSelector((state) => state.employer.me?.offers)?.length;

    const handleRefresh = (event: CustomEvent<RefresherEventDetail>) => {
        dispatch(fetchEmployer(() => {
            event.detail.complete();
        }));
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Teklifleriniz</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Teklifleriniz</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
                    <IonRefresherContent></IonRefresherContent>
                </IonRefresher>
                {(isFetching && !isFetchingFailed) && <Skeleton/>}
                {(!isFetching && !isFetchingFailed) && <OfferList/>}
                {(offerCount === 0 && !isFetchingFailed && !isFetching) && <NoData/>}
                {isFetchingFailed && <Error/>}
            </IonContent>
        </IonPage>
    );
}