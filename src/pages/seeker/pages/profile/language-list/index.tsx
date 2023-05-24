import {useAppSelector} from "../../../../../store/hooks";
import React, {useState} from "react";
import {IonButton, IonButtons, IonIcon, IonItemDivider, IonItemGroup, IonList, IonText} from "@ionic/react";
import {addCircleOutline} from "ionicons/icons";
import CreateLanguage from "./create-language";
import LanguageItem from "./language-item";

export default function LanguageList() {
    const languages = useAppSelector((state) => state.seeker.me?.languages);
    const [createModalOpen, setCreateModalOpen] = useState(false);

    return (
        <>
            <IonItemGroup className="ion-padding-top">
                <IonItemDivider>
                    <IonText>Diller</IonText>
                    <IonButtons slot="end">
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
                    languages?.map(language => (
                        <LanguageItem
                            key={language.id}
                            language={language}/>
                    ))
                }
                {
                    languages?.length === 0 && (
                        <IonList className="ion-padding">
                            Sistemde kayıtlı dil bilginiz yok.
                        </IonList>
                    )
                }
            </IonItemGroup>
            <CreateLanguage modalOpen={createModalOpen} setModalOpen={setCreateModalOpen}/>
        </>
    );
}