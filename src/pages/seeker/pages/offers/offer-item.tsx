import {Offer, OfferSubmissionStatus} from "../../../../model";
import {
    IonBadge,
    IonButton,
    IonButtons,
    IonCard,
    IonCardContent,
    IonContent,
    IonHeader,
    IonIcon,
    IonModal,
    IonSpinner,
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
import {Positions} from "../../../../data/presetData";
import PositionInCard from "../../../../components/position-in-card";
import PositionInModal from "../../../../components/position-in-modal";

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
            <IonCardContent>
                <PositionInCard position={offer.position}/>
                {isAccepted && (
                    <IonBadge color="success">
                        <IonIcon icon={checkmarkOutline}></IonIcon>
                        Kabul Edildi
                    </IonBadge>
                )}
                <IonButton className="ion-no-margin ion-margin-top"
                           onClick={() => {
                               setModalOpen(true)
                           }}
                           expand="block">Detaylar</IonButton>
            </IonCardContent>
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
                        <IonTitle>
                            {
                                Positions
                                    .filter(p => p.value === offer.position.title)[0].visual
                            }
                        </IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent className="ion-padding">
                    <PositionInModal position={offer.position}/>
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