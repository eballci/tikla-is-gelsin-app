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
import {Offer} from "../../../../model";
import CandidateItem from "./candidate-item";
import {useState} from "react";
import {closeOutline} from "ionicons/icons";
import {Positions} from "../../../../data/presetData";

function TypeAhead(
    {
        offers,
        setModalOpen
    }: {
        offers: Array<Offer>,
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
                                    (p) => p.value === offers[0].position.title
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
                        offers
                            .filter(offer => {
                                if (key.includes(" ")) {
                                    return offer.seeker.name.toLowerCase().startsWith(key.split(" ")[0])
                                        || offer.seeker.surname.toLowerCase().startsWith(key.split(" ")[1])
                                } else {
                                    return offer.seeker.name.toLowerCase().includes(key)
                                        || offer.seeker.surname.toLowerCase().includes(key);
                                }
                            })
                            .map(offer => (
                                <CandidateItem key={offer.seeker.id} offer={offer}/>
                            ))
                    }
                </IonList>
            </IonContent>
        </>
    )
}

export default function CandidateList({offers}: { offers: Array<Offer> }) {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <>
            <IonList className="ion-padding-top">
                {
                    offers
                        .slice(0, 2)
                        .map(suggestion => (
                            <CandidateItem key={suggestion.seeker.id} offer={suggestion}/>
                        ))
                }
                {
                    offers.length > 2 && (
                        <IonButton className="ion-no-margin ion-margin-top"
                                   expand="block"
                                   onClick={() => setModalOpen(true)}>
                            +{offers.length - 2} aday daha
                        </IonButton>
                    )
                }
            </IonList>
            <IonModal isOpen={modalOpen}>
                <TypeAhead offers={offers}
                           setModalOpen={setModalOpen}/>
            </IonModal>
        </>
    );
}