import {IonChip, IonCol, IonContent, IonGrid, IonIcon, IonRow, IonText} from "@ionic/react";
import {informationOutline} from "ionicons/icons";

export default function NoData() {
    return (
        <IonContent className="ion-padding">
            <IonChip style={{height: 130}}
                     outline={true}
                     color="secondary">
                <IonGrid>
                    <IonRow class="ion-align-items-center">
                        <IonCol size="auto">
                            <IonIcon icon={informationOutline}></IonIcon>
                        </IonCol>
                        <IonCol className="ion-padding-start ion-padding-end"
                                style={{textAlign: "justify"}}>
                            <IonText>
                                Herhangi bir ilanınıza başvuru yapılmamış bulunmakta.
                                Daha çok başvuru için ilanlarınızı daha detaylı oluşturmanızı öneririz.
                            </IonText>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonChip>
        </IonContent>
    )
}