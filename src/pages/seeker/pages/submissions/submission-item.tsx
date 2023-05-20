import {Submission} from "../../../../model";
import {
    IonAvatar,
    IonButton,
    IonButtons,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
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
                <IonCardHeader>
                    <IonAvatar>
                        <img alt="Silhouette of a person's head"
                             src="https://ionicframework.com/docs/img/demos/avatar.svg"/>
                    </IonAvatar>
                    <IonCardTitle>{submission.position.title}</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                    <IonText>
                        {submission.position.description}
                    </IonText>
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
                        <IonTitle>{submission.position.title}</IonTitle>
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