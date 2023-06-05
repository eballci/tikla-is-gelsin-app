import {Position} from "../../../../model";
import {IonActionSheet, IonAlert, IonCard, IonCardContent, useIonToast} from "@ionic/react";
import PositionInCard from "../../../../components/position-in-card";
import React, {useState} from "react";
import PositionDetail from "./position-detail";
import PositionUpdate from "./position-update";
import {useAppDispatch} from "../../../../store/hooks";
import {removePosition} from "../../../../service/position.service";
import {alertOutline, trashOutline} from "ionicons/icons";
import {fetchEmployer} from "../../../../store/store";

export default function PositionItem({position}: { position: Position }) {
    const dispatch = useAppDispatch();
    const [present] = useIonToast();
    const [actionOpen, setActionOpen] = useState(false);
    const [detailModal, setDetailModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const handleOptions = () => {
        setActionOpen(true);
    };

    const handleRemove = async () => {
        const data = await removePosition(position);
        if (!data) {
            await present({
                message: 'Bağlantı sağlanamadı.',
                duration: 3000,
                position: 'bottom',
                icon: alertOutline,
                color: 'danger',
            });
            return;
        }
        await present({
            message: 'İlan kaldırıldı.',
            duration: 5000,
            position: 'bottom',
            icon: trashOutline,
        });
        setTimeout(() => dispatch(fetchEmployer()), 3500);
    };

    return (
        <>
            <IonCard>
                <IonCardContent style={{cursor: "pointer"}}
                                onClick={() => setDetailModal(true)}>
                    <PositionInCard position={position}
                                    optionsAction={handleOptions}/>
                </IonCardContent>
            </IonCard>
            <IonActionSheet header="Seçenekler"
                            onDidDismiss={() => setActionOpen(false)}
                            isOpen={actionOpen}
                            buttons={[
                                {
                                    text: "İlanı görüntüle",
                                    handler: () => setDetailModal(true)
                                },
                                {
                                    text: "İlanı düzenle",
                                    handler: () => setUpdateModal(true)
                                },
                                {
                                    text: "İlanı kaldır",
                                    role: "destructive",
                                    handler: () => setShowAlert(true)
                                },
                                {
                                    text: "İptal",
                                    role: "cancel"
                                }
                            ]}/>
            <PositionDetail position={position}
                            modalOpen={detailModal}
                            setModalOpen={setDetailModal}/>
            <PositionUpdate position={position}
                            modalOpen={updateModal}
                            setModalOpen={setUpdateModal}/>
            <IonAlert isOpen={showAlert}
                      header="Uyarı"
                      subHeader="İlan Kaldırılacak"
                      message="İlana ilişkin öneriler, başvurular ve teklifler de kaldırılacak. Emin misiniz?"
                      onDidDismiss={() => setShowAlert(false)}
                      buttons={[
                          {
                              text: "İptal",
                              role: "cancel"
                          },
                          {
                              text: "Evet",
                              role: "destructive",
                              handler: handleRemove
                          }
                      ]}/>
        </>
    );
}