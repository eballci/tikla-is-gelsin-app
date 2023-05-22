import {Phone} from "../../../../../model";
import {
    IonButton,
    IonButtons,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonIcon,
    IonInput,
    IonItem,
    IonList,
    IonModal,
    IonRow,
    IonSpinner,
    IonText,
    IonTitle,
    IonToolbar,
    useIonAlert, useIonToast
} from "@ionic/react";
import {alertOutline, checkmarkOutline, closeOutline, createOutline, trashOutline} from "ionicons/icons";
import React, {useState} from "react";
import {useAppDispatch} from "../../../../../store/hooks";
import {removePhone, updatePhone} from "../../../../../service/phone.service";
import {fetchSeeker} from "../../../../../store/store";

export default function PhoneItem({phone}: { phone: Phone }) {
    const dispatch = useAppDispatch();
    const [presentAlert] = useIonAlert();
    const [presentToast] = useIonToast();
    const [copy, setCopy] = useState<Phone>({...phone});
    const [modalOpen, setModalOpen] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isRemoving, setIsRemoving] = useState(false);

    const assurance = async () => {
        await presentAlert({
            header: "Uyarı",
            subHeader: "Telefon Silinecek",
            message: "Bu işlem geri alınamaz. Emin misiniz?",
            buttons: [
                {
                    text: "İptal",
                    role: "cancel"
                },
                {
                    text: "Evet",
                    role: "destructive",
                    handler: handleRemoving
                }
            ]
        });
    };
    const handleSaving = () => {
        setIsSaving(true);
        updatePhone(copy).then((data) => {
            if (!data) {
                setTimeout(async () => {
                    setIsSaving(false);
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
                    message: "Telefon güncellendi.",
                    duration: 5000,
                    position: "bottom",
                    icon: checkmarkOutline,
                    color: "success"
                });
                setIsSaving(false);
            }, 1500);
            setTimeout(() => dispatch(fetchSeeker()), 3500);
        });
    };
    const handleRemoving = () => {
        setIsRemoving(true);
        removePhone(copy).then((data) => {
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
                }, 1500)
                return;
            }
            setTimeout(async () => {
                await presentToast({
                    message: "Telefon silindi.",
                    duration: 5000,
                    position: "bottom",
                    icon: trashOutline
                });
                setIsRemoving(true);
            }, 1500);
            setTimeout(() => dispatch(fetchSeeker()), 3500);
        });
    };

    return (
        <>
            <IonItem>
                <IonText>
                    {phone.prefix}
                    {" "}
                    ({phone.number.slice(0, 3)})
                    {" "}
                    {phone.number.slice(3, 6)}
                    {" "}
                    {phone.number.slice(6, 8)}
                    {" "}
                    {phone.number.slice(-2)}
                </IonText>
                <IonButtons slot="end">
                    <IonButton
                        onClick={() => setModalOpen(true)}>
                        <IonIcon
                            color="dark"
                            slot="end"
                            icon={createOutline}></IonIcon>
                    </IonButton>
                </IonButtons>
            </IonItem>
            <IonModal isOpen={modalOpen}>
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonButton
                                disabled={isRemoving || isSaving}
                                onClick={() => setModalOpen(false)}>
                                <IonIcon icon={closeOutline}></IonIcon>
                            </IonButton>
                        </IonButtons>
                        <IonTitle>Telefon</IonTitle>
                        <IonButtons slot="end">
                            <IonButton
                                onClick={handleSaving}
                                disabled={isRemoving || isSaving}>
                                {
                                    !isSaving ? (
                                        <IonIcon icon={checkmarkOutline}/>
                                    ) : (
                                        <IonSpinner/>
                                    )
                                }
                            </IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent className="ion-padding-top">
                    <IonList>
                        <IonItem>
                            <IonInput
                                disabled={isRemoving || isSaving}
                                label="Alan kodu"
                                labelPlacement="stacked"
                                value={copy.prefix}
                                onInput={(ev) => {
                                    setCopy({
                                        ...copy,
                                        prefix: (ev.target as HTMLIonInputElement).value as string
                                    })
                                }}/>
                        </IonItem>
                        <IonItem>
                            <IonInput
                                disabled={isRemoving || isSaving}
                                label="Numara"
                                labelPlacement="stacked"
                                value={copy.number}
                                onInput={(ev) => {
                                    setCopy({
                                        ...copy,
                                        number: (ev.target as HTMLIonInputElement).value as string
                                    })
                                }}/>
                        </IonItem>
                        <IonItem
                            className="ion-padding"
                            lines="none">
                            <IonGrid>
                                <IonRow className="ion-align-items-center">
                                    <IonCol>
                                        <IonButton
                                            onClick={assurance}
                                            disabled={isRemoving || isSaving}
                                            color="dark"
                                            shape="round"
                                            size="default"
                                            fill="outline">
                                            <IonText>
                                                {
                                                    !isRemoving ? (
                                                        <IonText>Sil</IonText>
                                                    ) : (
                                                        <IonSpinner color="dark"/>
                                                    )
                                                }
                                            </IonText>
                                        </IonButton>
                                    </IonCol>
                                </IonRow>
                            </IonGrid>
                        </IonItem>
                    </IonList>
                </IonContent>
            </IonModal>
        </>
    );
}