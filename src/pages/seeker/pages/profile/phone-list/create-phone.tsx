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
    useIonToast
} from "@ionic/react";
import {alertOutline, checkmarkOutline, closeOutline} from "ionicons/icons";
import React, {useState} from "react";
import {Phone} from "../../../../../model";
import {createPhone} from "../../../../../service/phone.service";
import {fetchSeeker} from "../../../../../store/store";
import {useAppDispatch, useAppSelector} from "../../../../../store/hooks";

export default function CreatePhone(
    {
        modalOpen,
        setModalOpen
    }: {
        modalOpen: boolean,
        setModalOpen: (data: boolean) => any
    }
) {
    const dispatch = useAppDispatch();
    const [presentToast] = useIonToast();
    const [isSaving, setIsSaving] = useState(false);
    const seekerId = useAppSelector(
        (state) => state.seeker.id);
    const [phone, setPhone] = useState<Phone>({
        id: 0,
        prefix: "",
        number: ""
    });

    const handleSaving = () => {
        setIsSaving(true);
        createPhone(seekerId, phone).then((data) => {
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
                    message: "Telefon eklendi.",
                    duration: 5000,
                    position: "bottom",
                    icon: checkmarkOutline,
                    color: "success"
                });
                setIsSaving(false);
            }, 1500);
            setTimeout(() => dispatch(fetchSeeker()), 3500);
        })
    }

    return (
        <IonModal isOpen={modalOpen}>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonButton
                            disabled={isSaving}
                            onClick={() => setModalOpen(false)}>
                            <IonIcon icon={closeOutline}></IonIcon>
                        </IonButton>
                    </IonButtons>
                    <IonTitle>Telefon</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding-top">
                <IonList>
                    <IonItem>
                        <IonInput
                            disabled={isSaving}
                            label="Alan kodu"
                            labelPlacement="stacked"
                            value={phone.prefix}
                            onInput={(ev) => {
                                setPhone({
                                    ...phone,
                                    prefix: (ev.target as HTMLIonInputElement).value as string
                                })
                            }}/>
                    </IonItem>
                    <IonItem>
                        <IonInput
                            disabled={isSaving}
                            label="Numara"
                            labelPlacement="stacked"
                            value={phone.number}
                            onInput={(ev) => {
                                setPhone({
                                    ...phone,
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
                                        onClick={handleSaving}
                                        disabled={
                                            isSaving
                                            ||
                                            phone.prefix.length < 2
                                            ||
                                            phone.number.length < 10
                                        }
                                        shape="round"
                                        size="default"
                                        fill="outline">
                                        <IonText>
                                            {
                                                !isSaving ? (
                                                    <IonText>Ekle</IonText>
                                                ) : (
                                                    <IonSpinner/>
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
    );
}