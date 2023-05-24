import {Language} from "../../../../../model";
import {useAppDispatch} from "../../../../../store/hooks";
import {
    IonButton,
    IonButtons,
    IonChip,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonIcon,
    IonItem,
    IonList,
    IonModal,
    IonRow,
    IonSelect,
    IonSelectOption,
    IonSpinner,
    IonText,
    IonTitle,
    IonToolbar,
    useIonAlert,
    useIonToast
} from "@ionic/react";
import React, {useState} from "react";
import {alertOutline, checkmarkOutline, closeOutline, createOutline, trashOutline} from "ionicons/icons";
import {fetchSeeker} from "../../../../../store/store";
import {removeLanguage, updateLanguage} from "../../../../../service/language.service";
import {LanguageLevelTranslation, Languages} from "../../../../../data/presetData";

export default function LanguageItem({language}: { language: Language }) {
    const dispatch = useAppDispatch();
    const [presentAlert] = useIonAlert();
    const [presentToast] = useIonToast();
    const [copy, setCopy] = useState<Language>({...language});
    const [modalOpen, setModalOpen] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isRemoving, setIsRemoving] = useState(false);

    const assurance = async () => {
        await presentAlert({
            header: "Uyarı",
            subHeader: "Dil Bilgisi Silinecek",
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
        updateLanguage(copy).then((data) => {
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
                    message: "Dil bilgisi güncellendi.",
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
        removeLanguage(copy).then((data) => {
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
                    message: "Dil bilgisi silindi.",
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
                <IonGrid>
                    <IonRow>
                        <IonText className="ion-padding-top">
                            {
                                Languages.filter(l => l.value === language.language)[0].visual
                            }
                            {" "}
                            <IonChip>
                                {
                                    LanguageLevelTranslation
                                        .filter(level => level.value === language.level)[0].visual
                                }
                            </IonChip>
                        </IonText>
                    </IonRow>
                </IonGrid>
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
                                <IonIcon icon={closeOutline}/>
                            </IonButton>
                        </IonButtons>
                        <IonTitle>Dil Güncelle</IonTitle>
                        <IonButtons slot="end">
                            <IonButton
                                disabled={isRemoving || isSaving}
                                onClick={handleSaving}>
                                {
                                    isSaving ? (
                                        <IonSpinner/>
                                    ) : (
                                        <IonIcon icon={checkmarkOutline}/>
                                    )
                                }
                            </IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonList className="ion-padding-top">
                        <IonItem>
                            <IonSelect
                                disabled={isSaving}
                                label="Dil"
                                labelPlacement="stacked"
                                placeholder="Seçiniz..."
                                value={copy.language}
                                onIonChange={(ev) => setCopy({
                                    ...copy,
                                    language: ev.detail.value
                                })}>
                                {
                                    Languages.map(language => (
                                        <IonSelectOption
                                            value={language.value}>
                                            {language.visual}
                                        </IonSelectOption>
                                    ))
                                }
                            </IonSelect>
                        </IonItem>
                        <IonItem>
                            <IonSelect
                                disabled={isSaving}
                                label="Seviye"
                                labelPlacement="stacked"
                                placeholder="Seçiniz..."
                                value={copy.level}
                                onIonChange={(ev) => setCopy({
                                    ...copy,
                                    level: ev.detail.value
                                })}>
                                {
                                    LanguageLevelTranslation.map(level => (
                                        <IonSelectOption
                                            value={level.value}>
                                            {level.visual}
                                        </IonSelectOption>
                                    ))
                                }
                            </IonSelect>
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
    )
}