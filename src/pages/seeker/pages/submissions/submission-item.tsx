import {Submission} from "../../../../model";
import {
    IonButton,
    IonButtons,
    IonCard,
    IonCardContent,
    IonChip,
    IonContent,
    IonHeader,
    IonIcon,
    IonModal,
    IonSpinner,
    IonText,
    IonTitle,
    IonToolbar,
    useIonAlert,
    useIonToast
} from "@ionic/react";
import React, {useState} from "react";
import {alertOutline, checkmarkOutline, closeOutline} from "ionicons/icons";
import {useAppDispatch} from "../../../../store/hooks";
import {removeSubmission} from "../../../../service/submission.service";
import {fetchSeeker} from "../../../../store/store";
import {Positions} from "../../../../data/presetData";
import PositionInCard from "../../components/position-in-card/positionInCard";

export default function SubmissionItem({submission}: { submission: Submission }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [isRemoving, setIsRemoving] = useState(false);
    const [isRemoved, setIsRemoved] = useState(false);
    const [presentToast] = useIonToast();
    const [presentAlert] = useIonAlert();
    const dispatch = useAppDispatch();

    const assurance = async (e: any) => {
        e.stopPropagation();

        await presentAlert({
            header: "Uyarı",
            subHeader: "Başvuru Silinecek",
            message: "Bu işlem geri alınamaz. Emin misiniz?",
            buttons: [
                {
                    text: "İptal",
                    role: "cancel"
                },
                {
                    text: "Evet",
                    role: "destructive",
                    handler: handleRemove
                }
            ]
        });
    };

    const handleRemove = () => {
        setIsRemoving(true);
        removeSubmission(submission).then((data) => {
            if (!data) {
                setTimeout(async () => {
                    setIsRemoving(false);
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
                    message: "Başvuru iptal edildi.",
                    duration: 5000,
                    position: "bottom",
                    icon: checkmarkOutline,
                    color: "success"
                });
                setIsRemoved(true);
            }, 1500);
            setTimeout(() => dispatch(fetchSeeker()), 3500);
        });
    };

    const infoAndButton = () => {
        if (submission.status < 3)
            return (
                <>
                    <IonChip>Beklemede</IonChip>
                    <IonButton
                        className="ion-no-margin ion-margin-top"
                        disabled={isRemoved}
                        onClick={assurance}
                        expand="block"
                        fill="outline">
                        {
                            isRemoving && !isRemoved && <IonSpinner/>
                        }
                        {
                            !isRemoving && !isRemoved && "İptal et"
                        }
                        {
                            isRemoved && "İptal Edildi"
                        }
                    </IonButton>
                </>
            );
        if (submission.status === 4)
            return (
                <>
                    <IonChip color="danger">Reddedildi</IonChip>
                    <IonButton
                        className="ion-no-margin ion-margin-top"
                        disabled={isRemoved}
                        onClick={assurance}
                        expand="block"
                        fill="outline">
                        {
                            isRemoving && !isRemoved && <IonSpinner/>
                        }
                        {
                            !isRemoving && !isRemoved && "Kaldır"
                        }
                        {
                            isRemoved && "Kaldırıldı"
                        }
                    </IonButton>
                </>
            );
        if (submission.status === 3)
            return (
                <IonChip color="success">Kabul Edildi</IonChip>
            );

        return <></>
    };

    return (
        <>
            <IonCard onClick={() => setModalOpen(true)}>
                <IonCardContent>
                    <PositionInCard position={submission.position}/>
                    {infoAndButton()}
                </IonCardContent>
            </IonCard>
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
                                    .filter(p => p.value === submission.position.title)[0].visual
                            }
                        </IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent className="ion-padding">
                    <IonText>{submission.position.description}</IonText>
                    {infoAndButton()}
                </IonContent>
            </IonModal>
        </>
    );
}