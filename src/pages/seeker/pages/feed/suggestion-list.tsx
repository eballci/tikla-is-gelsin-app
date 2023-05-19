import {IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle} from "@ionic/react";
import {useAppSelector} from "../../../../store/hooks";
import React from "react";

export default function SuggestionList() {
    const suggestions = useAppSelector((state) => state.seeker.me?.suggestions);
    return (
        <>
            {
                suggestions?.map(suggestion => (
                    <IonCard key={suggestion.id}>
                        <IonCardHeader>
                            <IonCardTitle>{suggestion.position.title}</IonCardTitle>
                            <IonCardSubtitle>%{suggestion.matchRate} Uyumluluk</IonCardSubtitle>
                        </IonCardHeader>

                        <IonCardContent>{suggestion.position.description}</IonCardContent>
                    </IonCard>
                ))
            }
        </>
    )
}