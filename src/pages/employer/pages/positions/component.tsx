import {useAppDispatch, useAppSelector} from "../../../../store/hooks";
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
import React, {useState} from "react";
import {addOutline} from "ionicons/icons";
import Skeleton from "./skeleton";
import NoData from "./no-data";
import Error from "./error";
import PositionList from "./position-list";
import CreatePosition from "./create-position";

export default function Positions() {
    const dispatch = useAppDispatch();
    const [modalOpen, setModalOpen] = useState(false);
    const isFetching = useAppSelector((state) => state.employer.isFetching);
    const isFetchingFailed = useAppSelector((state) => state.employer.isFetchingFailed);
    const positionCount = useAppSelector((state) => state.employer.me?.openPositions)?.length;

    const handleRefresh = (event: CustomEvent<RefresherEventDetail>) => {
        dispatch(fetchEmployer(() => {
            event.detail.complete();
        }));
    };

    return (
        <>
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>İlanlarınız</IonTitle>
                        <IonButtons slot="end">
                            <IonButton size="large"
                                       onClick={() => setModalOpen(true)}>
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
                    {(isFetching && !isFetchingFailed) && <Skeleton/>}
                    {(!isFetching && !isFetchingFailed) && <PositionList/>}
                    {(positionCount === 0 && !isFetchingFailed && !isFetching) && <NoData/>}
                    {isFetchingFailed && <Error/>}
                </IonContent>
            </IonPage>
            <CreatePosition modalOpen={modalOpen} setModalOpen={setModalOpen}/>
        </>
    );
}