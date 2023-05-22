import {Experience} from "../../../../../model";
import {useAppDispatch} from "../../../../../store/hooks";
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
import {removeExperience, updateExperience} from "../../../../../service/experience.service";
import {Positions} from "../../../../../data/presetData";

export default function ExperienceItem({experience}: { experience: Experience }) {
    const dispatch = useAppDispatch();
    const [presentAlert] = useIonAlert();
    const [presentToast] = useIonToast();
    const [copy, setCopy] = useState<Experience>({...experience});
    const [modalOpen, setModalOpen] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isRemoving, setIsRemoving] = useState(false);

    const assurance = async () => {
        await presentAlert({
            header: "Uyarı",
            subHeader: "Tecrübe Silinecek",
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
        updateExperience(copy).then((data) => {
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
                    message: "Tecrübe güncellendi.",
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
        removeExperience(copy).then((data) => {
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
                    message: "Tecrübe bilgisi silindi.",
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
                                Positions.filter(position => position.value === experience.position)[0].visual
                            }
                        </IonText>
                    </IonRow>
                    <IonRow>
                        <IonText
                            color="medium"
                            className="ion-padding-top">{experience.company} / {experience.department}</IonText>
                    </IonRow>
                    <IonRow>
                        <IonText
                            className="ion-padding-top">
                            {experience.start.toLocaleString("tr-TR", {month: "long"})}
                            {" "}
                            {experience.start.getFullYear()}
                            {" - "}
                            {
                                experience.start.getTime() > experience.end.getTime() ?
                                    (
                                        "halen"
                                    ) : (
                                        experience.end.toLocaleString("tr-TR", {month: "long"})
                                        +
                                        " "
                                        +
                                        experience.end.getFullYear()
                                    )
                            }
                        </IonText>
                    </IonRow>
                    <IonRow>
                        <IonText className="ion-padding-top">
                            {experience.description.slice(0, 200)}
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
                        <IonTitle>Tecrübe</IonTitle>
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
                                disabled={isRemoving || isSaving}
                                label="Pozisyon"
                                labelPlacement="stacked"
                                placeholder="Seçiniz..."
                                value={copy.position}
                                onIonChange={(ev) => setCopy({
                                    ...copy,
                                    position: ev.detail.value as string
                                })}
                            >
                                {
                                    Positions
                                        .map(position => (
                                            <IonSelectOption
                                                value={position.value}>
                                                {position.visual}
                                            </IonSelectOption>
                                        ))
                                }
                            </IonSelect>
                        </IonItem>
                        <IonItem>
                            <IonInput
                                disabled={isRemoving || isSaving}
                                label="Şirket"
                                labelPlacement="stacked"
                                value={copy.company}
                                onIonChange={(ev) => setCopy({
                                    ...copy,
                                    company: ev.detail.value as string
                                })}/>
                        </IonItem>
                        <IonItem>
                            <IonInput
                                disabled={isRemoving || isSaving}
                                label="Departman"
                                labelPlacement="stacked"
                                value={experience.department}
                                onIonChange={(ev) => setCopy({
                                    ...copy,
                                    department: ev.detail.value as string
                                })}/>
                        </IonItem>
                        <IonItem>
                            <IonInput
                                disabled={isRemoving || isSaving}
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
                                disabled={isRemoving || isSaving}
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
                            <IonTextarea
                                disabled={isRemoving || isSaving}
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