import {Education} from "../../../../../model";
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
    IonInput,
    IonItem,
    IonList,
    IonModal,
    IonRow,
    IonSelect,
    IonSelectOption,
    IonSpinner,
    IonText,
    IonTextarea,
    IonTitle,
    IonToolbar,
    useIonAlert,
    useIonToast
} from "@ionic/react";
import React, {useState} from "react";
import {alertOutline, checkmarkOutline, closeOutline, createOutline, trashOutline} from "ionicons/icons";
import {fetchSeeker} from "../../../../../store/store";
import {removeEducation, updateEducation} from "../../../../../service/education.service";
import {EducationLevelTranslation, Studies} from "../../../../../data/presetData";

export default function EducationItem({education}: { education: Education }) {
    const dispatch = useAppDispatch();
    const [presentAlert] = useIonAlert();
    const [presentToast] = useIonToast();
    const [copy, setCopy] = useState<Education>({...education});
    const [isStartOpen, seeIsStartopen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isRemoving, setIsRemoving] = useState(false);

    const assurance = async () => {
        await presentAlert({
            header: "Uyarı",
            subHeader: "Eğitim Silinecek",
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
        updateEducation(copy).then((data) => {
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
                    message: "Eğitim güncellendi.",
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
        removeEducation(copy).then((data) => {
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
                    message: "Eğitim bilgisi silindi.",
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
                        <IonText
                            className="ion-padding-top">
                            {
                                Studies
                                    .filter(t => t.value === education.study)[0].visual
                            }
                            <IonChip>
                                {
                                    EducationLevelTranslation
                                        .filter(t => t.value === education.educationLevel)[0].visual
                                }
                            </IonChip>
                        </IonText>
                    </IonRow>
                    <IonRow>
                        <IonText
                            color="medium"
                            className="ion-padding-top">{education.institution}</IonText>
                    </IonRow>
                    <IonRow>
                        <IonText
                            className="ion-padding-top">
                            {education.start.toLocaleString("tr-TR", {month: "long"})}
                            {" "}
                            {education.start.getFullYear()}
                            {" - "}
                            {education.end.toLocaleString("tr-TR", {month: "long"})}
                            {" "}
                            {education.end.getFullYear()}
                        </IonText>
                    </IonRow>
                    <IonRow>
                        <IonText className="ion-padding-top">
                            GPA: {education.GPA}
                        </IonText>
                    </IonRow>
                    <IonRow>
                        <IonText className="ion-padding-top">
                            {education.description.slice(0, 200)}
                            ...
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
                                <IonIcon icon={closeOutline}></IonIcon>
                            </IonButton>
                        </IonButtons>
                        <IonTitle>Eğitim</IonTitle>
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
                            <IonSelect
                                label="Alan"
                                labelPlacement="stacked"
                                value={copy.study}
                                onIonChange={(ev) => setCopy({
                                    ...copy,
                                    study: ev.detail.value
                                })}
                            >
                                {
                                    Studies.map((study) => (
                                        <IonSelectOption
                                            value={study.value}>{study.visual}</IonSelectOption>
                                    ))
                                }
                            </IonSelect>
                        </IonItem>
                        <IonItem>
                            <IonInput
                                label="Kurum"
                                labelPlacement="stacked"
                                value={copy.institution}
                                onIonInput={(ev) => setCopy({
                                    ...copy,
                                    institution: ev.detail.value as string
                                })}></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonInput
                                label="Başlangıç"
                                labelPlacement="stacked"
                                onIonInput={(ev) => setCopy({
                                    ...copy,
                                    start: new Date(ev.detail.value ?? "")
                                })}
                                value={
                                    copy.start.getFullYear()
                                    +
                                    "-"
                                    +
                                    ("0" + copy.start.getMonth()).slice(-2)
                                    +
                                    "-"
                                    +
                                    ("0" + copy.start.getDay()).slice(-2)
                                }
                                type="date"/>
                        </IonItem>
                        <IonItem>
                            <IonInput
                                label="Bitiş"
                                labelPlacement="stacked"
                                onIonInput={(ev) => setCopy({
                                    ...copy,
                                    end: new Date(ev.detail.value ?? "")
                                })}
                                value={
                                    copy.end.getFullYear()
                                    +
                                    "-"
                                    +
                                    ("0" + copy.end.getMonth()).slice(-2)
                                    +
                                    "-"
                                    +
                                    ("0" + copy.end.getDay()).slice(-2)
                                }
                                type="date"/>
                        </IonItem>
                        <IonItem>
                            <IonSelect
                                label="Tür"
                                labelPlacement="stacked"
                                value={copy.educationLevel}
                                onIonChange={(ev) => setCopy({
                                    ...copy,
                                    educationLevel: ev.detail.value
                                })}>
                                {
                                    EducationLevelTranslation
                                        .map(t => (
                                            <IonSelectOption
                                                value={t.value}>{t.visual}</IonSelectOption>
                                        ))
                                }
                            </IonSelect>
                        </IonItem>
                        <IonItem>
                            <IonInput
                                label="Ortalama"
                                labelPlacement="stacked"
                                value={copy.GPA}
                                type="number"
                                onIonInput={(ev) => setCopy({
                                    ...copy,
                                    GPA: parseFloat(ev.detail.value ?? "0")
                                })}/>
                        </IonItem>
                        <IonItem>
                            <IonTextarea
                                label="Açıklama"
                                labelPlacement="stacked"
                                value={copy.description}
                                autoGrow={true}
                                onIonInput={(ev) => setCopy({
                                    ...copy,
                                    description: ev.detail.value as string
                                })}/>
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