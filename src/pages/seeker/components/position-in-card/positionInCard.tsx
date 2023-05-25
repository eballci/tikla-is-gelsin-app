import {Position} from "../../../../model";
import {IonAvatar, IonCol, IonGrid, IonRow} from "@ionic/react";
import {Positions} from "../../../../data/presetData";
import React from "react";

export default function PositionInCard({position}: { position: Position }) {
    return (
        <>
            <IonGrid className="ion-no-padding">
                <IonRow className="ion-no-padding">
                    <IonCol size="auto" className="ion-padding-end">
                        <IonAvatar style={{width: 52, height: 52}}>
                            <img alt="Profile image of the employer"
                                 src={
                                     position.employer.avatar === ""
                                         ?
                                         "https://ionicframework.com/docs/img/demos/avatar.svg"
                                         :
                                         "data:image/png;base64," + position.employer.avatar
                                 }/>
                        </IonAvatar>
                    </IonCol>
                    <IonCol
                        style={{
                            fontWeight: "bold",
                            fontSize: "1.4rem",
                            color: "black"
                        }}
                        className="ion-text-left ion-no-padding">
                        <IonRow>
                            {
                                Positions
                                    .filter(p => p.value === position.title)[0]
                                    .visual
                            }
                        </IonRow>
                        <IonRow style={{
                            fontSize: "1rem",
                            fontWeight: "bold",
                            color: "#666"
                        }}>
                            {position.employer.name}
                        </IonRow>
                    </IonCol>
                </IonRow>
                <IonRow
                    style={{textAlign: "justify"}}
                    className="ion-margin-top">
                    {position.description.slice(0, 200)}
                    {position.description.length > 200 && "..."}
                </IonRow>
            </IonGrid>
        </>
    )
}