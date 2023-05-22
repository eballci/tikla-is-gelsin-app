import {useAppSelector} from "../../../../../store/hooks";
import React, {useState} from "react";
import {IonButton, IonButtons, IonIcon, IonItemDivider, IonItemGroup, IonList, IonText} from "@ionic/react";
import {addCircleOutline} from "ionicons/icons";
import EducationItem from "./education-item";
import CreateEducation from "./create-education";

export default function EducationList() {
    const educations = useAppSelector((state) => state.seeker.me?.educations);
    const [createModalOpen, setCreateModalOpen] = useState(false);
    return (
        <>
            <IonItemGroup
                className="ion-padding-top">
                <IonItemDivider>
                    <IonText>Eğitimler</IonText>
                    <IonButtons
                        slot="end">
                        <IonButton
                            onClick={() => setCreateModalOpen(true)}>
                            <IonIcon
                                color="dark"
                                slot="end"
                                icon={addCircleOutline}></IonIcon>
                        </IonButton>
                    </IonButtons>
                </IonItemDivider>
                {
                    educations?.map(education => (
                        <EducationItem
                            key={education.id}
                            education={education}/>
                    ))
                }
                {
                    educations?.length == 0 && (
                        <IonList className="ion-padding">
                            Sistemde kayıtlı eğitim bilginiz yok.
                        </IonList>
                    )
                }
            </IonItemGroup>
            <CreateEducation
                modalOpen={createModalOpen}
                setModalOpen={setCreateModalOpen}/>
        </>
    );
}