import {Position} from '../../../../model';
import {IonCard, IonCardContent, IonRow} from "@ionic/react";
import {Positions} from "../../../../data/presetData";
import CandidateList from "./candidate-list";
import {useAppSelector} from "../../../../store/hooks";

export default function OfferItem({position}: { position: Position }) {
    const offers = (useAppSelector((state) => state.employer.me?.offers) ?? [])
        .filter((suggestion) => suggestion.position.id === position.id);

    return (
        <IonCard>
            <IonCardContent>
                <IonRow style={{fontSize: "18px", fontWeight: "bold", color: "#2b2b2b"}}>
                    {Positions.filter((p) => p.value === position.title)[0].visual}
                </IonRow>
                <CandidateList offers={offers}/>
            </IonCardContent>
        </IonCard>
    );
}
