import {IonButton, IonButtons, IonIcon, IonItemDivider, IonItemGroup, IonList, IonText} from "@ionic/react";
import React, {useState} from "react";
import {addCircleOutline} from "ionicons/icons";
import {useAppSelector} from "../../../../../store/hooks";
import PhoneItem from "./phone-item";
import CreatePhone from "./create-phone";

export default function PhoneList() {
    const phones = useAppSelector((state) => state.seeker.me?.phones);
    const [createModalOpen, setCreateModalOpen] = useState(false);
    return (
        <>
            <IonItemGroup
                className="ion-padding-top">
                <IonItemDivider>
                    <IonText>Telefonlar</IonText>
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
                    phones?.map(phone => (
                        <PhoneItem phone={phone}/>
                    ))
                }
                {
                    phones?.length == 0 && (
                        <IonList className="ion-padding">
                            Sistemde kayıtlı telefon numaranız yok.
                        </IonList>
                    )
                }
            </IonItemGroup>
            <CreatePhone
                modalOpen={createModalOpen}
                setModalOpen={setCreateModalOpen}/>
        </>
    );
}