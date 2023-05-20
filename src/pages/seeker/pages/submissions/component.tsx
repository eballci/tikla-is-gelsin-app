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
import {useAppDispatch, useAppSelector} from "../../../../store/hooks";
import {fetchSeeker} from "../../../../store/store";
import Skeleton from "./skeleton";
import NoData from "./no-data";
import Error from "./error";
import SubmissionList from "./submission-list";

export default function Submissions() {
    const dispatch = useAppDispatch();
    const isFetching = useAppSelector((state) => state.seeker.isFetching);
    const isFetchingFailed = useAppSelector((state) => state.seeker.isFetchingFailed);
    const submissionCount = useAppSelector((state) => state.seeker.me?.submissions)?.length;

    const handleRefresh = (event: CustomEvent<RefresherEventDetail>) => {
        dispatch(fetchSeeker(() => {
            event.detail.complete();
        }));
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
                {(isFetching && !isFetchingFailed) && <Skeleton/>}
                {(!isFetching && !isFetchingFailed) && <SubmissionList/>}
                {(submissionCount === 0 && !isFetchingFailed && !isFetching) && <NoData/>}
                {isFetchingFailed && <Error/>}
            </IonContent>
        </IonPage>
    );
}