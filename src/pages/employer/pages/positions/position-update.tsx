import {Position} from "../../../../model";
import {
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonInput,
    IonItem,
    IonItemDivider,
    IonItemGroup,
    IonList,
    IonModal,
    IonSelect,
    IonSelectOption,
    IonSpinner,
    IonTextarea,
    IonTitle,
    IonToolbar,
    useIonToast
} from "@ionic/react";
import {alertOutline, checkmarkOutline, closeOutline, createOutline, trashOutline} from "ionicons/icons";
import {useAppDispatch} from "../../../../store/hooks";
import React, {useState} from "react";
import {updatePosition} from "../../../../service/position.service";
import {fetchEmployer} from "../../../../store/store";
import {
    EducationLevelTranslation,
    LanguageLevelTranslation,
    Languages,
    Positions,
    Studies
} from "../../../../data/presetData";

export default function PositionUpdate(
    {
        position,
        modalOpen,
        setModalOpen
    }: {
        position: Position,
        modalOpen: boolean,
        setModalOpen: (data: boolean) => any
    }
) {
    const dispatch = useAppDispatch();
    const [present] = useIonToast();
    const [isUpdating, setIsUpdating] = useState(false);
    const [copy, setCopy] = useState({...position});
    const [languageCriteriaList, setLanguageCriteriaList] = useState([
        ...position.languageCriteriaList]);
    const [educationCriteriaList, setEducationCriteriaList] = useState([
        ...position.educationCriteriaList]);
    const [experienceCriteriaList, setExperienceCriteriaList] = useState([
        ...position.experienceCriteriaList]);
    const [newLanguageCriteria, setNewLanguageCriteria] = useState({
        expectedLanguage: "",
        expectedLevel: 0
    });
    const [newEducationCriteria, setNewEducationCriteria] = useState({
        study: "",
        minEducationLevel: 0
    });
    const [newExperienceCriteria, setNewExperienceCriteria] = useState({
        title: "",
        minimumYears: 0
    });

    const handleUpdate = async () => {
        setIsUpdating(true);
        const data = await updatePosition({
            ...copy,
            languageCriteriaList,
            educationCriteriaList,
            experienceCriteriaList
        });
        if (!data) {
            setTimeout(async () => {
                setIsUpdating(false);
                await present({
                    message: 'Bağlantı sağlanamadı.',
                    duration: 3000,
                    position: 'bottom',
                    icon: alertOutline,
                    color: 'danger',
                });
            }, 1500);
            return;
        }
        setTimeout(async () => {
            await present({
                message: 'İlan güncellendi.',
                duration: 5000,
                position: 'bottom',
                color: 'success',
                icon: checkmarkOutline,
            });
        }, 1500);
        setTimeout(() => dispatch(fetchEmployer()), 3500);
    };

    const addNewLanguageCriteria = () => {
        setLanguageCriteriaList([
            ...languageCriteriaList,
            newLanguageCriteria
        ]);
        setNewLanguageCriteria({
            expectedLanguage: "",
            expectedLevel: 0
        });
    };

    const addNewEducationCriteria = () => {
        setEducationCriteriaList([
            ...educationCriteriaList,
            newEducationCriteria
        ]);
        setNewEducationCriteria({
            study: "",
            minEducationLevel: 0
        });
    };

    const addNewExperienceCriteria = () => {
        setExperienceCriteriaList([
            ...experienceCriteriaList,
            newExperienceCriteria
        ]);
        setNewExperienceCriteria({
            title: "",
            minimumYears: 0
        });
    };

    const checkIsUpdatable = () => {
        if (copy.title === "") return false;
        return copy.description !== "";
    };

    return (
        <IonModal isOpen={modalOpen}>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonButton disabled={isUpdating}
                                   onClick={() => setModalOpen(false)}>
                            <IonIcon icon={closeOutline}/>
                        </IonButton>
                    </IonButtons>
                    <IonTitle>
                        İlanı Güncelle
                    </IonTitle>
                    <IonButtons slot="end">
                        <IonButton disabled={isUpdating || !checkIsUpdatable()}
                                   onClick={handleUpdate}>
                            {
                                (isUpdating) ? (
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
                    <IonItemGroup>
                        <IonItem>
                            <IonSelect
                                disabled={isUpdating}
                                label="Pozisyon"
                                labelPlacement="stacked"
                                placeholder="Seçiniz..."
                                value={copy.title}
                                onIonChange={(ev) => setCopy({
                                    ...copy,
                                    title: ev.detail.value as string
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
                            <IonTextarea
                                disabled={isUpdating}
                                label="Açıklama"
                                labelPlacement="stacked"
                                value={copy.description}
                                autoGrow={true}
                                onIonInput={(ev) => setCopy({
                                    ...copy,
                                    description: ev.detail.value as string
                                })}/>
                        </IonItem>
                    </IonItemGroup>
                    <IonItemGroup>
                        <IonItemDivider>
                            Dil Kriterleri
                        </IonItemDivider>
                        {
                            languageCriteriaList.map((languageCriteria, index) => (
                                <IonItem>
                                    <IonSelect
                                        disabled={isUpdating}
                                        label="Dil"
                                        labelPlacement="stacked"
                                        placeholder="Seçiniz..."
                                        value={languageCriteria.expectedLanguage}
                                        onIonChange={(ev) => setLanguageCriteriaList([
                                            ...languageCriteriaList.map((lc, i) => {
                                                if (i === index) {
                                                    return {
                                                        ...lc,
                                                        expectedLanguage: ev.detail.value as string
                                                    };
                                                }
                                                return lc;
                                            })
                                        ])}>
                                        {
                                            Languages.map(language => (
                                                <IonSelectOption
                                                    value={language.value}>
                                                    {language.visual}
                                                </IonSelectOption>
                                            ))
                                        }
                                    </IonSelect>
                                    <IonSelect
                                        className="ion-margin-start ion-margin-end"
                                        disabled={isUpdating}
                                        label="Seviye"
                                        labelPlacement="stacked"
                                        placeholder="Seçiniz..."
                                        value={languageCriteria.expectedLevel}
                                        onIonChange={(ev) => setLanguageCriteriaList([
                                            ...languageCriteriaList.map((lc, i) => {
                                                if (i === index) {
                                                    return {
                                                        ...lc,
                                                        expectedLevel: ev.detail.value
                                                    };
                                                }
                                                return lc;
                                            })
                                        ])}>
                                        {
                                            LanguageLevelTranslation.map(level => (
                                                <IonSelectOption
                                                    value={level.value}>
                                                    {level.visual}
                                                </IonSelectOption>
                                            ))
                                        }
                                    </IonSelect>
                                    <IonButtons slot="end">
                                        <IonButton disabled={isUpdating}
                                                   onClick={() => {
                                                       setLanguageCriteriaList([
                                                           ...languageCriteriaList
                                                               .filter((v, i) => (
                                                                   i !== index
                                                               ))
                                                       ])
                                                   }}>
                                            <IonIcon color="danger" icon={trashOutline}/>
                                        </IonButton>
                                    </IonButtons>
                                </IonItem>
                            ))
                        }
                        <IonItem>
                            <IonSelect
                                disabled={isUpdating}
                                label="Dil"
                                labelPlacement="stacked"
                                placeholder="Seçiniz..."
                                value={newLanguageCriteria.expectedLanguage}
                                onIonChange={(ev) => setNewLanguageCriteria({
                                    ...newLanguageCriteria,
                                    expectedLanguage: ev.detail.value
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
                            <IonSelect
                                className="ion-margin-start ion-margin-end"
                                disabled={isUpdating}
                                label="Seviye"
                                labelPlacement="stacked"
                                placeholder="Seçiniz..."
                                value={newLanguageCriteria.expectedLevel}
                                onIonChange={(ev) => setNewLanguageCriteria({
                                    ...newLanguageCriteria,
                                    expectedLevel: ev.detail.value
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
                            <IonButtons slot="end">
                                <IonButton onClick={addNewLanguageCriteria}
                                           disabled={
                                               isUpdating
                                               ||
                                               newLanguageCriteria.expectedLanguage === ""
                                               ||
                                               newLanguageCriteria.expectedLevel === 0
                                           }>
                                    <IonIcon icon={createOutline}/>
                                </IonButton>
                            </IonButtons>
                        </IonItem>
                    </IonItemGroup>
                    <IonItemGroup>
                        <IonItemDivider>
                            Eğitim Kriterleri
                        </IonItemDivider>
                        {
                            educationCriteriaList.map((educationCriteria, index) => (
                                <IonItem>
                                    <IonSelect
                                        disabled={isUpdating}
                                        label="Alan"
                                        labelPlacement="stacked"
                                        placeholder="Seçiniz..."
                                        value={educationCriteria.study}
                                        onIonChange={(ev) => setEducationCriteriaList([
                                            ...educationCriteriaList.map((ec, i) => {
                                                if (i === index) {
                                                    return {
                                                        ...ec,
                                                        study: ev.detail.value
                                                    };
                                                }
                                                return ec;
                                            })
                                        ])}
                                    >
                                        {
                                            Studies.map((study) => (
                                                <IonSelectOption
                                                    value={study.value}>{study.visual}</IonSelectOption>
                                            ))
                                        }
                                    </IonSelect>
                                    <IonSelect
                                        disabled={isUpdating}
                                        className="ion-margin-start ion-margin-end"
                                        label="Tür"
                                        labelPlacement="stacked"
                                        value={educationCriteria.minEducationLevel}
                                        placeholder="Seçiniz..."
                                        onIonChange={(ev) => setEducationCriteriaList([
                                            ...educationCriteriaList.map((ec, i) => {
                                                if (i === index) {
                                                    return {
                                                        ...ec,
                                                        minEducationLevel: ev.detail.value
                                                    };
                                                }
                                                return ec;
                                            })
                                        ])}>
                                        {
                                            EducationLevelTranslation
                                                .map(t => (
                                                    <IonSelectOption
                                                        value={t.value}>{t.visual}</IonSelectOption>
                                                ))
                                        }
                                    </IonSelect>
                                    <IonButtons slot="end">
                                        <IonButton disabled={isUpdating}
                                                   onClick={() => {
                                                       setEducationCriteriaList([
                                                           ...educationCriteriaList
                                                               .filter((v, i) => (
                                                                   i !== index
                                                               ))
                                                       ])
                                                   }}>
                                            <IonIcon color="danger" icon={trashOutline}/>
                                        </IonButton>
                                    </IonButtons>
                                </IonItem>
                            ))
                        }
                        <IonItem>
                            <IonSelect
                                disabled={isUpdating}
                                label="Alan"
                                labelPlacement="stacked"
                                placeholder="Seçiniz..."
                                value={newEducationCriteria.study}
                                onIonChange={(ev) => setNewEducationCriteria({
                                    ...newEducationCriteria,
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
                            <IonSelect
                                disabled={isUpdating}
                                className="ion-margin-start ion-margin-end"
                                label="Tür"
                                labelPlacement="stacked"
                                value={newEducationCriteria.minEducationLevel}
                                placeholder="Seçiniz..."
                                onIonChange={(ev) => setNewEducationCriteria({
                                    ...newEducationCriteria,
                                    minEducationLevel: ev.detail.value
                                })}>
                                {
                                    EducationLevelTranslation
                                        .map(t => (
                                            <IonSelectOption
                                                value={t.value}>{t.visual}</IonSelectOption>
                                        ))
                                }
                            </IonSelect>
                            <IonButtons slot="end">
                                <IonButton onClick={addNewEducationCriteria}
                                           disabled={
                                               isUpdating
                                               ||
                                               newEducationCriteria.study === ""
                                               ||
                                               newEducationCriteria.minEducationLevel === 0
                                           }>
                                    <IonIcon icon={createOutline}/>
                                </IonButton>
                            </IonButtons>
                        </IonItem>
                    </IonItemGroup>
                    <IonItemGroup>
                        <IonItemDivider>
                            Tecrübe Kriterleri
                        </IonItemDivider>
                        {
                            experienceCriteriaList.map((experienceCriteria, index) => (
                                <IonItem>
                                    <IonSelect
                                        disabled={isUpdating}
                                        label="Pozisyon"
                                        labelPlacement="stacked"
                                        placeholder="Seçiniz..."
                                        value={experienceCriteria.title}
                                        onIonChange={(ev) => setExperienceCriteriaList([
                                            ...experienceCriteriaList.map((ec, i) => {
                                                if (i === index) {
                                                    return {
                                                        ...ec,
                                                        title: ev.detail.value
                                                    };
                                                }
                                                return ec;
                                            })
                                        ])}>
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
                                    <IonInput
                                        disabled={isUpdating}
                                        className="ion-margin-start ion-margin-end"
                                        label="Beklenen yıl"
                                        labelPlacement="stacked"
                                        placeholder="En az 1 girebilirsiniz"
                                        value={
                                            experienceCriteria.minimumYears === 0
                                                ? "" : experienceCriteria.minimumYears
                                        }
                                        type="number"
                                        onIonInput={(ev) => setExperienceCriteriaList([
                                            ...experienceCriteriaList.map((ec, i) => {
                                                if (i === index) {
                                                    return {
                                                        ...ec,
                                                        minimumYears: parseInt(ev.detail.value ?? "0")
                                                    };
                                                }
                                                return ec;
                                            })
                                        ])}/>
                                    <IonButtons slot="end">
                                        <IonButton
                                            disabled={isUpdating || experienceCriteria.minimumYears === 0}
                                            onClick={() => setExperienceCriteriaList([
                                                ...experienceCriteriaList.filter((v, i) => (
                                                    i !== index
                                                ))
                                            ])}>
                                            <IonIcon color="danger" icon={trashOutline}/>
                                        </IonButton>
                                    </IonButtons>
                                </IonItem>
                            ))
                        }
                        <IonItem>
                            <IonSelect
                                disabled={isUpdating}
                                label="Pozisyon"
                                labelPlacement="stacked"
                                placeholder="Seçiniz..."
                                value={newExperienceCriteria.title}
                                onIonChange={(ev) => setNewExperienceCriteria({
                                    ...newExperienceCriteria,
                                    title: ev.detail.value as string
                                })}>
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
                            <IonInput
                                disabled={isUpdating}
                                className="ion-margin-start ion-margin-end"
                                label="Beklenen yıl"
                                labelPlacement="stacked"
                                placeholder="En az 1 girebilirsiniz"
                                value={
                                    newExperienceCriteria.minimumYears === 0
                                        ? "" : newExperienceCriteria.minimumYears
                                }
                                type="number"
                                onIonInput={(ev) => setNewExperienceCriteria({
                                    ...newExperienceCriteria,
                                    minimumYears: parseInt(ev.detail.value ?? "0")
                                })}/>
                            <IonButtons slot="end">
                                <IonButton onClick={addNewExperienceCriteria}
                                           disabled={
                                               isUpdating
                                               ||
                                               newExperienceCriteria.title === ""
                                               ||
                                               newExperienceCriteria.minimumYears === 0
                                           }>
                                    <IonIcon icon={createOutline}/>
                                </IonButton>
                            </IonButtons>
                        </IonItem>
                    </IonItemGroup>
                </IonList>
            </IonContent>
        </IonModal>
    );
}