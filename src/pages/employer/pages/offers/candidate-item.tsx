import {Offer} from "../../../../model";
import {
    IonAvatar,
    IonButton,
    IonButtons,
    IonContent,
    IonFooter,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonModal,
    IonSpinner,
    IonText,
    IonTitle,
    IonToolbar,
    useIonToast
} from "@ionic/react";
import React, {useState} from "react";
import {alertOutline, closeOutline, trashOutline} from "ionicons/icons";
import Candidate from "./candidate";
import {useAppDispatch} from "../../../../store/hooks";
import {removeOffer} from "../../../../service/offer.service";
import {fetchEmployer} from "../../../../store/store";

export default function CandidateItem({offer}: { offer: Offer }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [isDealing, setIsDealing] = useState(false);
    const [present] = useIonToast();
    const dispatch = useAppDispatch();

    const handle = async () => {
        setIsDealing(true);
        const data = await removeOffer(offer);
        if (!data) {
            setTimeout(async () => {
                setIsDealing(false);
                await present({
                    message: 'Bağlantı sağlanamadı.',
                    duration: 3000,
                    position: 'bottom',
                    icon: alertOutline,
                    color: 'danger',
                });
            }, 1500);
            return;
        }
        setTimeout(async () => {
            await present({
                message: 'Teklif kaldırıldı.',
                duration: 5000,
                position: 'bottom',
                icon: trashOutline,
            });
        }, 1500);
        setTimeout(() => dispatch(fetchEmployer()), 3500);
    };

    return (
        <>
            <IonItem button
                     onClick={() => setModalOpen(true)}
                     className="ion-no-padding">
                <IonAvatar slot="start">
                    <img alt="Profile image of the seeker"
                         src={offer.seeker.avatar === ""
                             ?
                             "https://ionicframework.com/docs/img/demos/avatar.svg"
                             :
                             "data:image/png;base64," + offer.seeker.avatar
                         }/>
                </IonAvatar>
                <IonLabel>
                    <h2>
                        {offer.seeker.name}
                        {" "}
                        {offer.seeker.surname}
                    </h2>
                    <p>
                        {
                            offer.status < 3 && "Beklemede"
                        }
                        {
                            offer.status === 3 && <IonText color="success">Onaylandı</IonText>
                        }
                        {
                            offer.status === 4 && <IonText color="danger">Reddedildi</IonText>
                        }
                    </p>
                </IonLabel>
            </IonItem>
            <IonModal isOpen={modalOpen}>
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonButton onClick={() => setModalOpen(false)}>
                                <IonIcon icon={closeOutline}/>
                            </IonButton>
                        </IonButtons>
                        <IonTitle>Aday</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <Candidate seeker={offer.seeker}/>
                </IonContent>
                <IonFooter className="ion-padding">
                    {
                        offer.status < 3 &&
                        <>
                            <IonButton
                                disabled={true}
                                color="medium"
                                expand="block">Beklemede</IonButton>
                            <IonButton fill="outline"
                                       onClick={handle}
                                       expand="block">
                                {
                                    isDealing ? <IonSpinner/> : "Geri çek"
                                }
                            </IonButton>
                        </>
                    }
                    {
                        offer.status === 4 &&
                        <>
                            <IonButton
                                disabled={true}
                                color="danger"
                                expand="block">Reddedildi</IonButton>
                            <IonButton fill="outline"
                                       onClick={handle}
                                       expand="block">
                                {
                                    isDealing ? <IonSpinner/> : "Kaldır"
                                }
                            </IonButton>
                        </>
                    }
                    {
                        offer.status === 3 &&
                        <IonButton
                            disabled={true}
                            color="success"
                            expand="block">Kabul edildi</IonButton>
                    }
                </IonFooter>
            </IonModal>
        </>
    )
}