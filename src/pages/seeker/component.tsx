import {
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import React from "react";

export default function Seeker() {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Tab 1</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Tab 1</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>Card Title</IonCardTitle>
                        <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
                    </IonCardHeader>

                    <IonCardContent>Here's a small text description for the card content. Nothing more, nothing
                        less.</IonCardContent>
                </IonCard>
            </IonContent>
        </IonPage>
    );
}