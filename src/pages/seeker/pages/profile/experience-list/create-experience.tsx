import {useAppDispatch, useAppSelector} from "../../../../../store/hooks";
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
    useIonToast
} from "@ionic/react";
import React, {useState} from "react";
import {Experience} from "../../../../../model";
import {alertOutline, checkmarkOutline, closeOutline} from "ionicons/icons";
import {fetchSeeker} from "../../../../../store/store";
import {createExperience} from "../../../../../service/experience.service";
import {Positions} from "../../../../../data/presetData";

export default function CreateExperience(
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

    const [copy, setCopy] = useState({
        id: 0,
        position: "",
        company: "",
        department: "",
        description: "",
        start: "",
        end: "",
    });

    const handleSaving = () => {
        const experience: Experience = {
            id: 0,
            position: copy.position,
            company: copy.company,
            department: copy.department,
            description: copy.description,
            start: new Date(copy.start),
            end: new Date(copy.end)
        };

        setIsSaving(true);
        createExperience(seekerId, experience).then((data) => {
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
                    message: "Tecrübe bilgisi eklendi.",
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
                            <IonIcon icon={closeOutline}></IonIcon>
                        </IonButton>
                    </IonButtons>
                    <IonTitle>Tecrübe</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding-top">
                <IonList>

                    <IonList>
                        <IonItem>
                            <IonSelect
                                disabled={isSaving}
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
                                disabled={isSaving}
                                label="Şirket"
                                labelPlacement="stacked"
                                placeholder="Giriniz..."
                                value={copy.company}
                                onIonChange={(ev) => setCopy({
                                    ...copy,
                                    company: ev.detail.value as string
                                })}/>
                        </IonItem>
                        <IonItem>
                            <IonInput
                                disabled={isSaving}
                                label="Departman"
                                labelPlacement="stacked"
                                placeholder="Giriniz..."
                                value={copy.department}
                                onIonChange={(ev) => setCopy({
                                    ...copy,
                                    department: ev.detail.value as string
                                })}/>
                        </IonItem>
                        <IonItem>
                            <IonInput
                                disabled={isSaving}
                                label="Başlangıç"
                                labelPlacement="stacked"
                                onIonInput={(ev) => setCopy({
                                    ...copy,
                                    start: ev.detail.value as string
                                })}
                                value={copy.start}
                                type="date"/>
                        </IonItem>
                        <IonItem>
                            <IonInput
                                disabled={isSaving}
                                label="Bitiş"
                                labelPlacement="stacked"
                                onIonInput={(ev) => setCopy({
                                    ...copy,
                                    end: ev.detail.value as string
                                })}
                                value={copy.end}
                                type="date"/>
                        </IonItem>
                        <IonItem>
                            <IonTextarea
                                disabled={isSaving}
                                label="Açıklama"
                                labelPlacement="stacked"
                                placeholder="Kullandığınız araçlar, teknikler, seminerler, eğitimler vs."
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
                                            onClick={handleSaving}
                                            disabled={
                                                isSaving
                                                ||
                                                copy.position === ""
                                                ||
                                                copy.company === ""
                                                ||
                                                copy.department === ""
                                                ||
                                                copy.description === ""
                                                ||
                                                copy.start === ""
                                                ||
                                                copy.end === ""
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
                </IonList>
            </IonContent>
        </IonModal>
    );
}