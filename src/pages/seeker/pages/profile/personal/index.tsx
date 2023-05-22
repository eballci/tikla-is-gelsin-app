import {IonAvatar, IonIcon, IonItem, IonItemGroup, IonLabel, IonText, IonTitle} from "@ionic/react";
import {createOutline} from "ionicons/icons";
import React from "react";
import {useAppSelector} from "../../../../../store/hooks";

export default function Personal() {
    const seeker = useAppSelector((state) => state.seeker.me);

    return (
        <IonItemGroup>
            <IonItem lines="none">
                <IonAvatar style={{width: 100, height: 100}}>
                    <img alt="Profile image of the seeker"
                         src={seeker?.avatar === "" ? "https://ionicframework.com/docs/img/demos/avatar.svg" : seeker?.avatar}/>
                </IonAvatar>
            </IonItem>
            <IonItem lines="none" className="ion-padding-top">
                <IonTitle className="ion-text-left">
                    {seeker?.name} {seeker?.surname}
                </IonTitle>
            </IonItem>
            <IonItem lines="none" className="ion-padding-top">
                <IonText>{seeker?.biography !== undefined ? (
                    <>
                        <IonIcon icon={createOutline}></IonIcon>
                        <IonLabel>Kendinizi tanıtın...</IonLabel>
                    </>
                ) : seeker?.biography}</IonText>
            </IonItem>
        </IonItemGroup>
    );
}