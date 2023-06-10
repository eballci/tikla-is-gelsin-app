import {
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonList,
    IonModal,
    IonSearchbar,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import {Submission} from "../../../../model";
import CandidateItem from "./candidate-item";
import {useState} from "react";
import {closeOutline} from "ionicons/icons";
import {Positions} from "../../../../data/presetData";

function TypeAhead(
    {
        submissions,
        setModalOpen
    }: {
        submissions: Array<Submission>,
        setModalOpen: (data: boolean) => void
    }
) {
    const [key, setKey] = useState("");

    return (
        <>
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
                                    (p) => p.value === submissions[0].position.title
                                )
                                [0]
                                .visual
                        }
                    </IonTitle>
                </IonToolbar>
                <IonToolbar>
                    <IonSearchbar
                        placeholder="Adaylar arasında arayın..."
                        onIonInput={(e) => setKey(e.target.value as string)}
                    ></IonSearchbar>
                </IonToolbar>
            </IonHeader>
            <IonContent color="light">
                <IonList className="ion-padding" inset={true}>
                    {
                        submissions
                            .filter(submission => {
                                if (key.includes(" ")) {
                                    return submission.seeker.name.toLowerCase().startsWith(key.split(" ")[0])
                                        || submission.seeker.surname.toLowerCase().startsWith(key.split(" ")[1])
                                } else {
                                    return submission.seeker.name.toLowerCase().includes(key)
                                        || submission.seeker.surname.toLowerCase().includes(key);
                                }
                            })
                            .map(submission => (
                                <CandidateItem key={submission.seeker.id} submission={submission}/>
                            ))
                    }
                </IonList>
            </IonContent>
        </>
    )
}

export default function CandidateList({submissions}: { submissions: Array<Submission> }) {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <>
            <IonList className="ion-padding-top">
                {
                    submissions
                        .slice(0, 2)
                        .map(submission => (
                            <CandidateItem key={submission.seeker.id} submission={submission}/>
                        ))
                }
                {
                    submissions.length > 2 && (
                        <IonButton className="ion-no-margin ion-margin-top"
                                   expand="block"
                                   onClick={() => setModalOpen(true)}>
                            +{submissions.length - 2} aday daha
                        </IonButton>
                    )
                }
            </IonList>
            <IonModal isOpen={modalOpen}>
                <TypeAhead submissions={submissions}
                           setModalOpen={setModalOpen}/>
            </IonModal>
        </>
    );
}