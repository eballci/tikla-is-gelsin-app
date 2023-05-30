import React from "react";
import {IonItem, IonItemGroup, IonSkeletonText, IonThumbnail, IonTitle} from "@ionic/react";

export default function Skeleton() {
    return (
        <IonItemGroup>
            <IonItem lines="none" className="ion-padding">
                <IonThumbnail slot="start" style={{width: 100, height: 100}}>
                    <IonSkeletonText animated={true} style={{borderRadius: "50%"}}></IonSkeletonText>
                </IonThumbnail>
            </IonItem>
            <IonItem lines="none">
                <IonTitle size="large">
                    <IonSkeletonText animated={true} style={{width: '50%'}}></IonSkeletonText>
                </IonTitle>
            </IonItem>
            <IonItem lines="none">
                <IonTitle size="large">
                    <IonSkeletonText animated={true} style={{width: '70%'}}></IonSkeletonText>
                </IonTitle>
            </IonItem>
            <IonItem lines="none">
                <IonTitle size="large">
                    <IonSkeletonText animated={true} style={{width: '60%'}}></IonSkeletonText>
                </IonTitle>
            </IonItem>
            <IonItem lines="none">
                <IonTitle size="large">
                    <IonSkeletonText animated={true} style={{width: '40%'}}></IonSkeletonText>
                </IonTitle>
            </IonItem>
        </IonItemGroup>
    );
}