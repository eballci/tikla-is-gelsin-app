import {
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonModal,
    IonSpinner,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import {checkmarkOutline, closeOutline} from "ionicons/icons";
import {useState} from "react";

export default function CreatePosition(
    {
        modalOpen,
        setModalOpen
    }: {
        modalOpen: boolean,
        setModalOpen: (data: boolean) => void
    }
) {
    const [isCreating, setIsCreating] = useState(false);
    const handleCreate = () => {
        setIsCreating(true);
        setTimeout(() => setIsCreating(false), 1500);
    };

    return (
        <IonModal isOpen={modalOpen}>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonButton disabled={isCreating}
                                   onClick={() => setModalOpen(false)}>
                            <IonIcon icon={closeOutline}/>
                        </IonButton>
                    </IonButtons>
                    <IonTitle>
                        İlan Oluştur
                    </IonTitle>
                    <IonButtons slot="end">
                        <IonButton disabled={isCreating}
                                   onClick={handleCreate}>
                            {
                                isCreating ? (
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
                ...
            </IonContent>
        </IonModal>
    );
}