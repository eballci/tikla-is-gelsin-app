import {SeekerSuggestion} from "../../../../model";
import {
    IonAvatar,
    IonButton,
    IonButtons, IonCol,
    IonContent,
    IonFooter, IonGrid,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonModal, IonRow, IonTitle,
    IonToolbar
} from "@ionic/react";
import React, {useState} from "react";
import {closeOutline} from "ionicons/icons";
import styles from "./feed.module.css";
import Candidate from "./candidate";

export default function CandidateItem({suggestion}: { suggestion: SeekerSuggestion }) {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <>
            <IonItem button
                     onClick={() => setModalOpen(true)}
                     className="ion-no-padding">
                <IonAvatar slot="start">
                    <img alt="Profile image of the seeker"
                         src={suggestion.seeker.avatar === ""
                             ?
                             "https://ionicframework.com/docs/img/demos/avatar.svg"
                             :
                             "data:image/png;base64," + suggestion.seeker.avatar
                         }/>
                </IonAvatar>
                <IonLabel>
                    <h2>
                        {suggestion.seeker.name}
                        {" "}
                        {suggestion.seeker.surname}
                    </h2>
                    <p>%{suggestion.matchRate} Uyumluluk</p>
                </IonLabel>
            </IonItem>
            <IonModal isOpen={modalOpen}>
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonButton onClick={() => setModalOpen(false)}>
                                <IonIcon icon={closeOutline}/>
                            </IonButton>
                        </IonButtons>
                        <IonTitle>Aday</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <Candidate seeker={suggestion.seeker}/>
                </IonContent>
                <IonFooter className="ion-padding">
                    <IonGrid>
                        <IonRow className={[styles['compatibility-high'], styles.badge].join(' ')}>
                            %{suggestion.matchRate} Uyumluluk
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonButton shape="round"
                                           expand="block"
                                           style={{}}
                                           fill="outline">Yok say</IonButton>
                            </IonCol>
                            <IonCol>
                                <IonButton shape="round"
                                           expand="block"
                                           style={{}}
                                           fill="solid">Teklif gönder</IonButton>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonFooter>
            </IonModal>
        </>
    )
}