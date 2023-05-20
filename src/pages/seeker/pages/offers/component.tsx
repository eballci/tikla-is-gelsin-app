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
import Skeleton from "./skeleton";
import NoData from "./no-data";
import Error from "./error";
import OfferList from "./offer-list";
import {readAllOffers} from "../../../../service/offer.service";
import {fetchSeeker} from "../../../../store/store";

export default function Offers() {
    const dispatch = useAppDispatch();
    const seekerId = useAppSelector((state) => state.seeker.id);
    const isFetching = useAppSelector((state) => state.seeker.isFetching);
    const isFetchingFailed = useAppSelector((state) => state.seeker.isFetchingFailed);
    const offerCount = useAppSelector((state) => state.seeker.me?.offers)?.length;
    const handleRefresh = (event: CustomEvent<RefresherEventDetail>) => {
        setTimeout(() => {
            dispatch(fetchSeeker(() => {
                event.detail.complete();
                readAllOffers(seekerId).then();
            }))
        }, 1000);
    };


    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Teklifler</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Teklifler</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
                    <IonRefresherContent></IonRefresherContent>
                </IonRefresher>
                {(isFetching && !isFetchingFailed) && <Skeleton/>}
                {(!isFetching && !isFetchingFailed) && <OfferList/>}
                {(offerCount === 0 && !isFetchingFailed) && <NoData/>}
                {isFetchingFailed && <Error/>}
            </IonContent>
        </IonPage>
    );
}