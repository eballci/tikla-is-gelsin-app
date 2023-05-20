import {
    IonAvatar,
    IonButton,
    IonButtons,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonChip,
    IonContent,
    IonHeader,
    IonIcon,
    IonModal, IonSpinner,
    IonText,
    IonTitle,
    IonToolbar,
    useIonToast
} from "@ionic/react";
import React, {useState} from "react";
import {PositionSuggestion} from "../../../../model";
import {alertOutline, checkmarkOutline, closeOutline, trashOutline} from "ionicons/icons";
import {ignoreSuggestion, submitSuggestion} from "../../../../service/suggestion.service";
import {useAppDispatch} from "../../../../store/hooks";
import {fetchSeeker} from "../../../../store/store";

export default function SuggestionItem({suggestion}: { suggestion: PositionSuggestion }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isIgnoring, setIsIgnoring] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isIgnored, setIsIgnored] = useState(false);
    const [present] = useIonToast();
    const dispatch = useAppDispatch();

    const handleSubmit = () => {
        setIsSubmitting(true);
        submitSuggestion(suggestion).then((data) => {
            if (!data) {
                setTimeout(async () => {
                    setIsSubmitting(false);
                    await present({
                        message: "Bağlantı sağlanamadı.",
                        duration: 3000,
                        position: "bottom",
                        icon: alertOutline,
                        color: "danger"
                    });
                }, 1500);
                return;
            }
            setTimeout(async () => {
                await present({
                    message: "Başvuru yapıldı.",
                    duration: 5000,
                    position: "bottom",
                    icon: checkmarkOutline,
                    color: "success"
                });
                setIsSubmitted(true);
            }, 1500);
            setTimeout(() => dispatch(fetchSeeker()), 3500);
        });
    };

    const handleIgnore = () => {
        setIsIgnoring(true);
        ignoreSuggestion(suggestion).then((data) => {
            if (!data) {
                setTimeout(async () => {
                    setIsIgnoring(false);
                    await present({
                        message: "Bağlantı sağlanamadı.",
                        duration: 3000,
                        position: "bottom",
                        icon: alertOutline,
                        color: "danger"
                    });
                }, 1500);
                return;
            }
            setTimeout(async () => {
                await present({
                    message: "Öneri kaldırıldı.",
                    duration: 5000,
                    position: "bottom",
                    icon: trashOutline
                });
                setIsIgnored(true);
            }, 1500);
            setTimeout(() => dispatch(fetchSeeker()), 3500);
        });
    };

    return (
        <IonCard>
            <IonCardHeader>
                <IonAvatar>
                    <img alt="Silhouette of a person's head"
                         src="https://ionicframework.com/docs/img/demos/avatar.svg"/>
                </IonAvatar>
                <IonCardTitle>{suggestion.position.title}</IonCardTitle>
                <IonCardSubtitle>%{suggestion.matchRate} Uyumluluk</IonCardSubtitle>
            </IonCardHeader>

            <IonCardContent>{suggestion.position.description}</IonCardContent>
            <IonButton onClick={() => {
                setModalOpen(true)
            }} expand="block">Detaylar</IonButton>
            <IonModal isOpen={modalOpen}>
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonButton onClick={() => {
                                setModalOpen(false);
                            }}>
                                <IonIcon icon={closeOutline}></IonIcon>
                            </IonButton>
                        </IonButtons>
                        <IonTitle>{suggestion.position.title}</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent className="ion-padding">
                    <IonText>{suggestion.position.description}</IonText>
                    <IonChip>%{suggestion.matchRate} Uyumluluk</IonChip>
                    {
                        (!isSubmitted && !isIgnored) && (
                            <>
                                <IonButton
                                    disabled={isSubmitting || isIgnoring}
                                    expand="block"
                                    onClick={handleSubmit}>
                                    {isSubmitting && <IonSpinner/>}
                                    {!isSubmitting && "Başvur"}
                                </IonButton>
                                <IonButton
                                    disabled={isSubmitting || isIgnoring}
                                    expand="block"
                                    fill="outline"
                                    onClick={handleIgnore}>
                                    {isIgnoring && <IonSpinner/>}
                                    {!isIgnoring && "Kaldır"}
                                </IonButton>
                            </>
                        )
                    }
                    {
                        isSubmitted && (
                            <IonButton disabled fill="clear" expand="block">Başvuruldu</IonButton>
                        )
                    }
                    {
                        isIgnored && (
                            <IonButton disabled fill="clear" expand="block">Kaldırıldı</IonButton>
                        )
                    }
                </IonContent>
            </IonModal>
        </IonCard>
    );
}