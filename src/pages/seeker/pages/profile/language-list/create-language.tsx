import {useAppDispatch, useAppSelector} from "../../../../../store/hooks";
import {
    IonButton,
    IonButtons,
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
    useIonToast
} from "@ionic/react";
import React, {useState} from "react";
import {Language} from "../../../../../model";
import {toLanguageLevel} from "../../../../../service/utils";
import {alertOutline, checkmarkOutline, closeOutline} from "ionicons/icons";
import {fetchSeeker} from "../../../../../store/store";
import {createLanguage} from "../../../../../service/language.service";
import {LanguageLevelTranslation, Languages} from "../../../../../data/presetData";

export default function CreateLanguage(
    {
        modalOpen,
        setModalOpen
    }: {
        modalOpen: boolean,
        setModalOpen: (data: boolean) => void
    }
) {
    const dispatch = useAppDispatch();
    const [presentToast] = useIonToast();
    const [isSaving, setIsSaving] = useState(false);
    const seekerId = useAppSelector(
        (state) => state.seeker.id);

    const [copy, setCopy] = useState({
        id: 0,
        level: 0,
        language: ""
    });

    const handleSaving = () => {
        const language: Language = {
            id: copy.id,
            level: toLanguageLevel(copy.level),
            language: copy.language
        };

        setIsSaving(true);
        createLanguage(seekerId, language).then((data) => {
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
                    message: "Dil bilgisi eklendi.",
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

    return (
        <IonModal isOpen={modalOpen}>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonButton
                            disabled={isSaving}
                            onClick={() => setModalOpen(false)}>
                            <IonIcon icon={closeOutline}/>
                        </IonButton>
                    </IonButtons>
                    <IonTitle>Dil Ekle</IonTitle>
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
                                        onClick={handleSaving}
                                        disabled={
                                            isSaving
                                            ||
                                            copy.language === ""
                                            ||
                                            copy.level === 0
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