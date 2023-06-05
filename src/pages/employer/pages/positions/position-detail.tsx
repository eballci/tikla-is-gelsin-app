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
    IonItemDivider,
    IonItemGroup,
    IonList,
    IonModal,
    IonRow,
    IonText,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import {closeOutline} from "ionicons/icons";
import {EducationCriteria, ExperienceCriteria, LanguageCriteria, Position} from "../../../../model";
import {
    EducationLevelTranslation,
    LanguageLevelTranslation,
    Languages,
    Positions,
    Studies
} from "../../../../data/presetData";
import PositionInModal from "../../../../components/position-in-modal";
import React from "react";

function LanguageCriteriaList(
    {criteriaList}: { criteriaList: Array<LanguageCriteria> }
) {
    return (
        <IonItemGroup>
            <IonItemDivider>Dil Kriterleri</IonItemDivider>
            {
                criteriaList.map(criteria => (
                    <IonItem>
                        <IonText>
                            {
                                Languages
                                    .filter(l => l.value === criteria.expectedLanguage)
                                    [0]
                                    .visual
                            }
                            {" "}
                            <IonChip>
                                {
                                    LanguageLevelTranslation
                                        .filter(level => level.value === criteria.expectedLevel)
                                        [0]
                                        .visual
                                }
                            </IonChip>
                        </IonText>
                    </IonItem>
                ))
            }
            {
                criteriaList.length === 0 && (
                    <IonItem>
                        <IonText>Bu ilan dil kriteri içermiyor.</IonText>
                    </IonItem>
                )
            }
        </IonItemGroup>
    );
}

function EducationCriteriaList(
    {criteriaList}: { criteriaList: Array<EducationCriteria> }
) {
    return (
        <IonItemGroup>
            <IonItemDivider>Eğitim Kriterleri</IonItemDivider>
            {
                criteriaList.map(criteria => (
                    <IonItem>
                        <IonText>
                            {
                                Studies
                                    .filter(l => l.value === criteria.study)
                                    [0]
                                    .visual
                            }
                            {" "}
                            <IonChip>
                                {
                                    EducationLevelTranslation
                                        .filter(level => level.value === criteria.minEducationLevel)
                                        [0]
                                        .visual
                                }
                            </IonChip>
                        </IonText>
                    </IonItem>
                ))
            }
            {
                criteriaList.length === 0 && (
                    <IonItem>
                        <IonText>Bu ilan eğitim kriteri içermiyor.</IonText>
                    </IonItem>
                )
            }
        </IonItemGroup>
    );
}

function ExperienceCriteriaList(
    {criteriaList}: { criteriaList: Array<ExperienceCriteria> }
) {
    return (
        <IonItemGroup>
            <IonItemDivider>Tecrübe Kriterleri</IonItemDivider>
            {
                criteriaList.map(criteria => (
                    <IonItem>
                        <IonText>
                            {
                                Positions
                                    .filter(l => l.value === criteria.title)
                                    [0]
                                    .visual
                            }
                            {" "}
                            <IonChip>
                                +{criteria.minimumYears} yıl
                            </IonChip>
                        </IonText>
                    </IonItem>
                ))
            }
            {
                criteriaList.length === 0 && (
                    <IonItem>
                        <IonText>Bu ilan tecrübe kriteri içermiyor.</IonText>
                    </IonItem>
                )
            }
        </IonItemGroup>
    );
}

export default function PositionDetail(
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
    return (
        <IonModal isOpen={modalOpen}>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonButton onClick={() => setModalOpen(false)}>
                            <IonIcon icon={closeOutline}/>
                        </IonButton>
                    </IonButtons>
                    <IonTitle>
                        {
                            Positions
                                .filter(
                                    (p) => p.value === position.title
                                )
                                [0]
                                .visual
                        }
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <PositionInModal position={position}/>
                <IonGrid className="ion-padding">
                    <IonRow>
                        <IonCol>
                            <h2 className="ion-text-left">Kriterler</h2>
                        </IonCol>
                    </IonRow>
                    <IonList>
                        <LanguageCriteriaList criteriaList={position.languageCriteriaList}/>
                        <EducationCriteriaList criteriaList={position.educationCriteriaList}/>
                        <ExperienceCriteriaList criteriaList={position.experienceCriteriaList}/>
                    </IonList>
                </IonGrid>
            </IonContent>
        </IonModal>
    )
}