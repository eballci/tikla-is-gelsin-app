import {
    IonAvatar,
    IonButton,
    IonButtons,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonIcon,
    IonItem,
    IonItemGroup,
    IonModal,
    IonRow,
    IonText,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import {Position} from "../../../../model";
import React, {useState} from "react";
import {closeOutline, globeOutline, walkOutline} from "ionicons/icons";

export default function PositionInModal({position}: { position: Position }) {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <>
            <IonGrid>
                <IonRow>
                    <IonCol style={{textAlign: "justify"}}
                            className="ion-margin-top">
                        {position.description}
                    </IonCol>
                </IonRow>
                <IonButton
                    expand="full"
                    className="ion-no-margin ion-no-padding ion-margin-top"
                    style={{
                        "--background": "#fff",
                        "--background-hover": "#ddd",
                        "--background-activated": "#ddd",
                        "--background-focused": "#ddd",
                        borderTop: "1px solid rgba(0,0,0,.1)"
                    }}
                    onClick={() => setModalOpen(true)}>
                    <IonRow className="ion-no-padding ion-align-items-center"
                            style={{width: "100%"}}>
                        <IonCol size="auto" className="ion-padding-end">
                            <IonAvatar style={{width: 34, height: 34}}>
                                <img alt="Profile image of the employer"
                                     src={
                                         position.employer.avatar === ""
                                             ?
                                             "https://ionicframework.com/docs/img/demos/avatar.svg"
                                             :
                                             "data:image/png;base64," + position.employer.avatar
                                     }/>
                            </IonAvatar>
                        </IonCol>
                        <IonCol
                            style={{
                                fontWeight: "bold",
                                fontSize: "1.1rem",
                                color: "black"
                            }}
                            className="ion-text-left ion-no-padding">
                            {position.employer.name}
                        </IonCol>
                    </IonRow>
                </IonButton>
            </IonGrid>
            <IonModal isOpen={modalOpen}>
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonButton onClick={() => setModalOpen(false)}>
                                <IonIcon icon={closeOutline}/>
                            </IonButton>
                        </IonButtons>
                        <IonTitle>İşveren</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonItemGroup style={{paddingTop: 40}}>
                        <IonItem lines="none">
                            <IonAvatar
                                style={{width: 100, height: 100}}>
                                <img alt="Profile image of the seeker"
                                     src={position.employer.avatar === ""
                                         ?
                                         "https://ionicframework.com/docs/img/demos/avatar.svg"
                                         :
                                         "data:image/png;base64," + position.employer.avatar
                                     }/>
                            </IonAvatar>
                        </IonItem>
                        <IonItem
                            style={{paddingTop: 20}}
                            lines="none"
                            className="ion-no-padding">
                            <IonTitle size="large">
                                {position.employer.name}
                            </IonTitle>
                        </IonItem>
                        <IonItem lines="none">
                            <IonIcon icon={walkOutline}/>
                            <IonText className="ion-padding-start">{position.employer.scale}</IonText>
                        </IonItem>
                        <IonItem lines="none">
                            <IonIcon icon={globeOutline}/>
                            <IonText className="ion-padding-start">
                                {
                                    position.employer.webSite ?? "-"
                                }
                            </IonText>
                        </IonItem>
                        <IonItem lines="none">
                            <IonText className="ion-padding-start ion-padding-top">
                                {
                                    position.employer.description
                                }
                            </IonText>
                        </IonItem>
                    </IonItemGroup>
                </IonContent>
            </IonModal>
        </>
    );
}