import {
    IonContent,
    IonHeader,
    IonItem,
    IonLabel,
    IonList,
    IonPage,
    IonRefresher,
    IonRefresherContent,
    IonSkeletonText,
    IonThumbnail,
    IonTitle,
    IonToolbar,
    RefresherEventDetail
} from "@ionic/react";
import {useAppSelector} from "../../../../store/hooks";
import React from "react";

export default function Feed() {
    const handleRefresh = (event: CustomEvent<RefresherEventDetail>) => {
        setTimeout(() => {
            event.detail.complete();
        }, 1000);
    };

    const isFetching = useAppSelector((state) => state.seeker.isFetching);
    const seekerId = useAppSelector((state) => state.seeker.id);

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
                        <IonTitle size="large">Öneriler {seekerId}</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
                    <IonRefresherContent></IonRefresherContent>
                </IonRefresher>
                {
                    isFetching && (
                        <IonList>
                            <IonItem>
                                <IonThumbnail slot="start">
                                    <IonSkeletonText animated={true}></IonSkeletonText>
                                </IonThumbnail>
                                <IonLabel>
                                    <h3>
                                        <IonSkeletonText animated={true} style={{width: '80%'}}></IonSkeletonText>
                                    </h3>
                                    <p>
                                        <IonSkeletonText animated={true} style={{width: '60%'}}></IonSkeletonText>
                                    </p>
                                    <p>
                                        <IonSkeletonText animated={true} style={{width: '30%'}}></IonSkeletonText>
                                    </p>
                                </IonLabel>
                            </IonItem>
                            <IonItem>
                                <IonThumbnail slot="start">
                                    <IonSkeletonText animated={true}></IonSkeletonText>
                                </IonThumbnail>
                                <IonLabel>
                                    <h3>
                                        <IonSkeletonText animated={true} style={{width: '80%'}}></IonSkeletonText>
                                    </h3>
                                    <p>
                                        <IonSkeletonText animated={true} style={{width: '60%'}}></IonSkeletonText>
                                    </p>
                                    <p>
                                        <IonSkeletonText animated={true} style={{width: '30%'}}></IonSkeletonText>
                                    </p>
                                </IonLabel>
                            </IonItem>
                            <IonItem>
                                <IonThumbnail slot="start">
                                    <IonSkeletonText animated={true}></IonSkeletonText>
                                </IonThumbnail>
                                <IonLabel>
                                    <h3>
                                        <IonSkeletonText animated={true} style={{width: '80%'}}></IonSkeletonText>
                                    </h3>
                                    <p>
                                        <IonSkeletonText animated={true} style={{width: '60%'}}></IonSkeletonText>
                                    </p>
                                    <p>
                                        <IonSkeletonText animated={true} style={{width: '30%'}}></IonSkeletonText>
                                    </p>
                                </IonLabel>
                            </IonItem>
                            <IonItem>
                                <IonThumbnail slot="start">
                                    <IonSkeletonText animated={true}></IonSkeletonText>
                                </IonThumbnail>
                                <IonLabel>
                                    <h3>
                                        <IonSkeletonText animated={true} style={{width: '80%'}}></IonSkeletonText>
                                    </h3>
                                    <p>
                                        <IonSkeletonText animated={true} style={{width: '60%'}}></IonSkeletonText>
                                    </p>
                                    <p>
                                        <IonSkeletonText animated={true} style={{width: '30%'}}></IonSkeletonText>
                                    </p>
                                </IonLabel>
                            </IonItem>
                            <IonItem>
                                <IonThumbnail slot="start">
                                    <IonSkeletonText animated={true}></IonSkeletonText>
                                </IonThumbnail>
                                <IonLabel>
                                    <h3>
                                        <IonSkeletonText animated={true} style={{width: '80%'}}></IonSkeletonText>
                                    </h3>
                                    <p>
                                        <IonSkeletonText animated={true} style={{width: '60%'}}></IonSkeletonText>
                                    </p>
                                    <p>
                                        <IonSkeletonText animated={true} style={{width: '30%'}}></IonSkeletonText>
                                    </p>
                                </IonLabel>
                            </IonItem>
                        </IonList>
                    )
                }
            </IonContent>
        </IonPage>
    );
}