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
import {alertOutline, checkmarkOutline, closeOutline} from "ionicons/icons";
import {EducationLevelTranslation, Studies} from "../../../../../data/presetData";
import {fetchSeeker} from "../../../../../store/store";
import {createEducation} from "../../../../../service/education.service";
import {Education} from "../../../../../model";
import {toEducationLevel} from "../../../../../service/utils";

export default function CreateEducation(
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
        study: "0",
        institution: "",
        description: "",
        GPA: "",
        start: "",
        end: "",

        educationLevel: "0"
    });

    const handleSaving = () => {
        const education: Education = {
            id: 0,
            study: copy.study,
            institution: copy.institution,
            description: copy.description,
            GPA: parseFloat(copy.GPA),
            start: new Date(copy.start),
            end: new Date(copy.end),
            educationLevel: toEducationLevel(parseInt(copy.educationLevel))
        };

        setIsSaving(true);
        createEducation(seekerId, education).then((data) => {
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
                    message: "Eğitim bilgisi eklendi.",
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
                    <IonTitle>Eğitim</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding-top">
                <IonList>
                    <IonItem>
                        <IonSelect
                            label="Alan"
                            labelPlacement="stacked"
                            placeholder="Seçiniz..."
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
                            placeholder="Eğitimi aldığınız kurum"
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
                                start: ev.detail.value as string
                            })}
                            value={copy.start}
                            type="date"/>
                    </IonItem>
                    <IonItem>
                        <IonInput
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
                        <IonSelect
                            label="Tür"
                            labelPlacement="stacked"
                            value={copy.educationLevel}
                            placeholder="Seçiniz..."
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
                            placeholder="Geçmiş ya da güncel ortalamanız"
                            type="number"
                            value={copy.GPA}
                            onIonInput={(ev) => setCopy({
                                ...copy,
                                GPA: ev.detail.value as string
                            })}/>
                    </IonItem>
                    <IonItem>
                        <IonTextarea
                            label="Açıklama"
                            labelPlacement="stacked"
                            value={copy.description}
                            placeholder="Alınan dersler, projeler, klüpler, vs."
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
                                            copy.study === "0"
                                            ||
                                            copy.institution === ""
                                            ||
                                            copy.description === ""
                                            ||
                                            copy.GPA === ""
                                            ||
                                            copy.start === ""
                                            ||
                                            copy.end === ""
                                            ||
                                            copy.educationLevel === "0"
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