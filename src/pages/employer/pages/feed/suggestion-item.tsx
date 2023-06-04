import {Position} from '../../../../model';
import {IonCard, IonCardContent, IonRow} from "@ionic/react";
import {Positions} from "../../../../data/presetData";
import CandidateList from "./candidate-list";
import {useAppSelector} from "../../../../store/hooks";

export default function SuggestionItem({position}: { position: Position }) {
    const suggestions = (useAppSelector((state) => state.employer.me?.suggestions) ?? [])
        .filter((suggestion) => suggestion.position.id === position.id);

    return (
        <IonCard>
            <IonCardContent>
                <IonRow style={{fontSize: "18px", fontWeight: "bold", color: "#2b2b2b"}}>
                    {Positions.filter((p) => p.value === position.title)[0].visual}
                </IonRow>
                <CandidateList suggestions={suggestions}/>
            </IonCardContent>
        </IonCard>
    );
}
