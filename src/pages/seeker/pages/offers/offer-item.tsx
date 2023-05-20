import {Offer, OfferSubmissionStatus} from "../../../../model";
import {
    IonAvatar,
    IonBadge,
    IonButton,
    IonButtons,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonContent,
    IonHeader,
    IonIcon,
    IonModal, IonSpinner,
    IonText,
    IonTitle,
    IonToolbar,
    useIonAlert,
    useIonToast
} from "@ionic/react"
import React, {useState} from "react";
import {useAppDispatch} from "../../../../store/hooks";
import {acceptOffer, refuseOffer} from "../../../../service/offer.service";
import {alertOutline, checkmarkOutline, closeOutline, trashOutline} from "ionicons/icons";
import {fetchSeeker} from "../../../../store/store";

export default function OfferItem({offer}: { offer: Offer }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [isAccepting, setIsAccepting] = useState(false);
    const [isRefusing, setIsRefusing] = useState(false);
    const [isAccepted, setIsAccepted] = useState(offer.status === OfferSubmissionStatus.ACCEPTED);
    const [isRefused, setIsRefused] = useState(false);
    const [presentToast] = useIonToast();
    const [presentAlert] = useIonAlert();
    const dispatch = useAppDispatch();

    const handleAccept = () => {
        setIsAccepting(true);
        acceptOffer(offer).then((data) => {
            if (!data) {
                setTimeout(async () => {
                    setIsAccepting(false);
                    await presentToast({
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
                await presentToast({
                    message: "Teklif kabul edildi.",
                    duration: 5000,
                    position: "bottom",
                    icon: checkmarkOutline,
                    color: "success"
                });
                setIsAccepted(true);
            }, 1500);
            setTimeout(() => dispatch(fetchSeeker()), 3500);
        });
    };

    const handleRefuse = () => {
        setIsRefusing(true);
        refuseOffer(offer).then((data) => {
            if (!data) {
                setTimeout(async () => {
                    setIsRefusing(false);
                    await presentToast({
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
                await presentToast({
                    message: "Teklif reddedildi.",
                    duration: 5000,
                    position: "bottom",
                    icon: trashOutline
                });
                setIsRefused(true);
            }, 1500);
            setTimeout(() => dispatch(fetchSeeker()), 3500);
        });
    };

    const assurance = async () => {
        await presentAlert({
            header: "Uyarı",
            subHeader: "Teklif Reddedileccek",
            message: "Bu işlem geri alınamaz. Emin misiniz?",
            buttons: [
                {
                    text: "İptal",
                    role: "cancel"
                },
                {
                    text: "Evet",
                    role: "destructive",
                    handler: handleRefuse
                }
            ]
        });
    };

    return (
        <IonCard
            style={{backgroundColor: offer.status === OfferSubmissionStatus.ISSUED ? "rgba(163, 255, 229, 0.5)" : ""}}>
            <IonCardHeader>
                <IonAvatar>
                    <img alt="Silhouette of a person's head"
                         src="https://ionicframework.com/docs/img/demos/avatar.svg"/>
                </IonAvatar>
                <IonCardTitle>{offer.position.title}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>{offer.position.description}</IonCardContent>
            {isAccepted && (
                <IonBadge color="success">
                    <IonIcon icon={checkmarkOutline}></IonIcon>
                    Kabul Edildi
                </IonBadge>
            )}
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
                        <IonTitle>{offer.position.title}</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent className="ion-padding">
                    <IonText>{offer.position.description}</IonText>
                    {
                        (!isAccepted && !isRefused) && (
                            <>
                                <IonButton
                                    disabled={isAccepting || isRefusing}
                                    expand="block"
                                    onClick={handleAccept}>
                                    {isAccepting && <IonSpinner/>}
                                    {!isAccepting && "Kabul Et"}
                                </IonButton>
                                <IonButton
                                    disabled={isAccepting || isRefusing}
                                    expand="block"
                                    fill="outline"
                                    onClick={assurance}>
                                    {isRefusing && <IonSpinner/>}
                                    {!isRefusing && "Reddet"}
                                </IonButton>
                            </>
                        )
                    }
                    {
                        isAccepted && (
                            <IonButton disabled fill="clear" expand="block">Kabul Edildi</IonButton>
                        )
                    }
                    {
                        isRefused && (
                            <IonButton disabled fill="clear" expand="block">Reddedildi</IonButton>
                        )
                    }
                </IonContent>
            </IonModal>
        </IonCard>
    )
}