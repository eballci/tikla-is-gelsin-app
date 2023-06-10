import {Position} from '../../../../model';
import {IonCard, IonCardContent, IonRow} from "@ionic/react";
import {Positions} from "../../../../data/presetData";
import CandidateList from "./candidate-list";
import {useAppSelector} from "../../../../store/hooks";

export default function SubmissionItem({position}: { position: Position }) {
    const submissions = (useAppSelector((state) => state.employer.me?.submissions) ?? [])
        .filter((submission) => submission.position.id === position.id && submission.status < 3)
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    return (
        <IonCard>
            <IonCardContent>
                <IonRow style={{fontSize: "18px", fontWeight: "bold", color: "#2b2b2b"}}>
                    {Positions.filter((p) => p.value === position.title)[0].visual}
                </IonRow>
                <CandidateList submissions={submissions}/>
            </IonCardContent>
        </IonCard>
    );
}
