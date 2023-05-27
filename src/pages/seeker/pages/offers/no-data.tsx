import {IonChip, IonCol, IonContent, IonGrid, IonIcon, IonRow, IonText} from "@ionic/react";
import {informationOutline} from "ionicons/icons";

export default function NoData() {
    return (
        <IonContent className="ion-padding">
            <IonChip style={{height: 140}}
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
                                İş ilanı teklifiniz bulunmamaktadır. Teklif almanın yolu
                                profil/ilan eşleşmesinden geçmektedir. Bu sebeple profilinizi
                                zenginleştirmenizi öneiriz.
                            </IonText>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonChip>
        </IonContent>
    )
}