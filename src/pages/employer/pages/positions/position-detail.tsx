import {IonButton, IonButtons, IonHeader, IonIcon, IonModal, IonTitle, IonToolbar} from "@ionic/react";
import {closeOutline} from "ionicons/icons";
import {Position} from "../../../../model";
import {Positions} from "../../../../data/presetData";

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
        </IonModal>
    )
}