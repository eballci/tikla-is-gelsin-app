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
import {SeekerSuggestion} from "../../../../model";
import CandidateItem from "./candidate-item";
import {useState} from "react";
import {closeOutline} from "ionicons/icons";
import {Positions} from "../../../../data/presetData";

function TypeAhead(
    {suggestions, setModalOpen}: {
        suggestions: Array<SeekerSuggestion>,
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
                                    (p) => p.value === suggestions[0].position.title
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
                        suggestions
                            .filter(suggestion => {
                                if (key.includes(" ")) {
                                    return suggestion.seeker.name.toLowerCase().startsWith(key.split(" ")[0])
                                        || suggestion.seeker.surname.toLowerCase().startsWith(key.split(" ")[1])
                                } else {
                                    return suggestion.seeker.name.toLowerCase().includes(key)
                                        || suggestion.seeker.surname.toLowerCase().includes(key);
                                }
                            })
                            .sort((a, b) => b.matchRate - a.matchRate)
                            .map(suggestion => (
                                <CandidateItem key={suggestion.seeker.id} suggestion={suggestion}/>
                            ))
                    }
                </IonList>
            </IonContent>
        </>
    )
}

export default function CandidateList({suggestions}: { suggestions: Array<SeekerSuggestion> }) {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <>
            <IonList className="ion-padding-top">
                {
                    suggestions
                        .sort((a, b) => b.matchRate - a.matchRate)
                        .slice(0, 2)
                        .map(suggestion => (
                            <CandidateItem key={suggestion.seeker.id} suggestion={suggestion}/>
                        ))
                }
                {
                    suggestions.length > 2 && (
                        <IonButton className="ion-no-margin ion-margin-top"
                                   expand="block"
                                   onClick={() => setModalOpen(true)}>
                            +{suggestions.length - 2} aday daha
                        </IonButton>
                    )
                }
            </IonList>
            <IonModal isOpen={modalOpen}>
                <TypeAhead suggestions={suggestions}
                           setModalOpen={setModalOpen}/>
            </IonModal>
        </>
    );
}