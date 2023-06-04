import {
    IonAvatar,
    IonChip,
    IonGrid,
    IonItem,
    IonItemDivider,
    IonItemGroup,
    IonList,
    IonRow,
    IonText,
    IonTitle
} from "@ionic/react";
import React from "react";
import {VisitSeeker} from "../../../../model";
import {
    EducationLevelTranslation,
    LanguageLevelTranslation,
    Languages,
    Positions,
    Studies
} from "../../../../data/presetData";

export default function Candidate({seeker}: { seeker: VisitSeeker }) {
    return (
        <>
            <IonItemGroup style={{paddingTop: 40}}>
                <IonItem lines="none">
                    <IonAvatar style={{width: 100, height: 100}}>
                        <img alt="Profile image of the seeker"
                             src={seeker?.avatar === ""
                                 ?
                                 "https://ionicframework.com/docs/img/demos/avatar.svg"
                                 :
                                 "data:image/png;base64," + seeker?.avatar
                             }/>
                    </IonAvatar>
                </IonItem>
                <IonItem
                    style={{paddingTop: 20}}
                    lines="none"
                    className="ion-no-padding">
                    <IonTitle size="large">
                        {seeker?.name} {seeker?.surname}
                    </IonTitle>
                </IonItem>
                <IonItem lines="none">
                    <IonText>
                        {
                            seeker?.biography
                        }
                    </IonText>
                </IonItem>
            </IonItemGroup>
            <IonItemGroup
                className="ion-padding-top">
                <IonItemDivider>
                    <IonText>Eğitimler</IonText>
                </IonItemDivider>
                {
                    seeker.educations.map(education => (
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
                                        {
                                            education.start.getTime() > education.end.getTime() ?
                                                (
                                                    "halen"
                                                ) : (
                                                    education.end.toLocaleString("tr-TR", {month: "long"})
                                                    +
                                                    " "
                                                    +
                                                    education.end.getFullYear()
                                                )
                                        }
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
                        </IonItem>
                    ))
                }
                {
                    seeker.educations.length == 0 && (
                        <IonList className="ion-padding">
                            Adayın sistemde kayıtlı eğitim bilgisi yok.
                        </IonList>
                    )
                }
            </IonItemGroup>
            <IonItemGroup
                className="ion-padding-top">
                <IonItemDivider>
                    <IonText>Tecrübeler</IonText>
                </IonItemDivider>
                {
                    seeker.experiences.map(experience => (
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
                        </IonItem>
                    ))
                }
                {
                    seeker.experiences.length == 0 && (
                        <IonList className="ion-padding">
                            Adayın sistemde kayıtlı tecrübe bilgisi yok.
                        </IonList>
                    )
                }
            </IonItemGroup>
            <IonItemGroup className="ion-padding-top">
                <IonItemDivider>
                    <IonText>Diller</IonText>
                </IonItemDivider>
                {
                    seeker.languages.map(language => (
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
                        </IonItem>
                    ))
                }
                {
                    seeker.languages.length === 0 && (
                        <IonList className="ion-padding">
                            Adayın sistemde kayıtlı dil bilgisi yok.
                        </IonList>
                    )
                }
            </IonItemGroup>
        </>
    );
}