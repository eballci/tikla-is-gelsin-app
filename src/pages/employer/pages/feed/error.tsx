import {IonChip, IonCol, IonContent, IonGrid, IonIcon, IonRow, IonText} from "@ionic/react";
import {alertOutline} from "ionicons/icons";

export default function Error() {
    return (
        <IonContent className="ion-padding">
            <IonChip style={{height: 80}}
                     outline={true}
                     color="danger">
                <IonGrid>
                    <IonRow class="ion-align-items-center">
                        <IonCol size="auto">
                            <IonIcon icon={alertOutline}></IonIcon>
                        </IonCol>
                        <IonCol className="ion-padding-start ion-padding-end"
                                style={{textAlign: "justify"}}>
                            <IonText>
                                Bağlantıda problem meydana geldi. Lütfen daha sonra tekrar deneyiniz.
                            </IonText>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonChip>
        </IonContent>
    );
}