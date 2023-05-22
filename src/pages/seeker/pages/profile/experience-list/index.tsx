import React, {useState} from "react";
import {useAppSelector} from "../../../../../store/hooks";
import {IonButton, IonButtons, IonIcon, IonItemDivider, IonItemGroup, IonList, IonText} from "@ionic/react";
import {addCircleOutline} from "ionicons/icons";
import ExperienceItem from "./experience-item";
import CreateExperience from "./create-experience";

export default function ExperienceList() {
    const experiences = useAppSelector((state) => state.seeker.me?.experiences);
    const [createModalOpen, setCreateModalOpen] = useState(false);

    return (
        <>
            <IonItemGroup
                className="ion-padding-top">
                <IonItemDivider>
                    <IonText>Tecrübeler</IonText>
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
                    experiences?.map(experience => (
                        <ExperienceItem
                            key={experience.id}
                            experience={experience}/>
                    ))
                }
                {
                    experiences?.length == 0 && (
                        <IonList className="ion-padding">
                            Sistemde kayıtlı tecrübe bilginiz yok.
                        </IonList>
                    )
                }
            </IonItemGroup>
            <CreateExperience
                modalOpen={createModalOpen}
                setModalOpen={setCreateModalOpen}/>
        </>
    );
}