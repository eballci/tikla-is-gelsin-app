import {SeekerSuggestion} from "../../../../model";
import {
    IonAvatar,
    IonButton,
    IonButtons,
    IonCol,
    IonContent,
    IonFooter,
    IonGrid,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonModal,
    IonRow,
    IonSpinner,
    IonTitle,
    IonToolbar,
    useIonToast
} from "@ionic/react";
import React, {useState} from "react";
import {alertOutline, checkmarkOutline, closeOutline, trashOutline} from "ionicons/icons";
import styles from "./feed.module.css";
import Candidate from "./candidate";
import {useAppDispatch} from "../../../../store/hooks";
import {ignoreSuggestion, offerSuggestion} from "../../../../service/suggestion.service";
import {fetchEmployer} from "../../../../store/store";

export default function CandidateItem({suggestion}: { suggestion: SeekerSuggestion }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [isOffering, setIsOffering] = useState(false);
    const [isIgnoring, setIsIgnoring] = useState(false);
    const [isOffered, setIsOffered] = useState(false);
    const [isIgnored, setIsIgnored] = useState(false);
    const [present] = useIonToast();
    const dispatch = useAppDispatch();

    const handleOffer = async () => {
        setIsOffering(true);
        const data = await offerSuggestion(suggestion);
        if (!data) {
            setTimeout(async () => {
                setIsOffering(false);
                await present({
                    message: 'Bağlantı sağlanamadı.',
                    duration: 3000,
                    position: 'bottom',
                    icon: alertOutline,
                    color: 'danger',
                });
            }, 1500);
            return;
        }
        setTimeout(async () => {
            await present({
                message: 'Teklif sunuldu.',
                duration: 5000,
                position: 'bottom',
                icon: checkmarkOutline,
                color: 'success',
            });
            setIsOffered(true);
        }, 1500);
        setTimeout(() => dispatch(fetchEmployer()), 3500);
    };

    const handleIgnore = () => {
        setIsIgnoring(true);
        ignoreSuggestion(suggestion).then((data) => {
            if (!data) {
                setTimeout(async () => {
                    setIsIgnoring(false);
                    await present({
                        message: 'Bağlantı sağlanamadı.',
                        duration: 3000,
                        position: 'bottom',
                        icon: alertOutline,
                        color: 'danger',
                    });
                }, 1500);
                return;
            }
            setTimeout(async () => {
                await present({
                    message: 'Aday önerisi kaldırıldı.',
                    duration: 5000,
                    position: 'bottom',
                    icon: trashOutline,
                });
                setIsIgnored(true);
            }, 1500);
            setTimeout(() => dispatch(fetchEmployer()), 3500);
        });
    };


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
                        {
                            (!isOffered && !isIgnored) && (
                                <IonRow>
                                    <IonCol>
                                        <IonButton shape="round"
                                                   disabled={isOffering || isIgnoring}
                                                   expand="block"
                                                   onClick={handleIgnore}
                                                   fill="outline">
                                            {
                                                isIgnoring ? <IonSpinner/> : "Yok say"
                                            }
                                        </IonButton>
                                    </IonCol>
                                    <IonCol>
                                        <IonButton shape="round"
                                                   disabled={isOffering || isIgnoring}
                                                   expand="block"
                                                   onClick={handleOffer}
                                                   fill="solid">
                                            {
                                                isOffering ? <IonSpinner/> : "Teklif gönder"
                                            }
                                        </IonButton>
                                    </IonCol>
                                </IonRow>
                            )
                        }
                        {
                            isOffered && (
                                <IonRow>
                                    <IonCol>
                                        <IonButton shape="round"
                                                   expand="block"
                                                   fill="clear"
                                                   disabled={true}>
                                            Teklif sunuldu.
                                        </IonButton>
                                    </IonCol>
                                </IonRow>
                            )
                        }
                        {
                            isIgnored && (
                                <IonRow>
                                    <IonCol>
                                        <IonButton shape="round"
                                                   expand="block"
                                                   fill="clear"
                                                   disabled={true}>
                                            Öneri kaldırıldı.
                                        </IonButton>
                                    </IonCol>
                                </IonRow>
                            )
                        }
                    </IonGrid>
                </IonFooter>
            </IonModal>
        </>
    )
}