import {Submission} from "../../../../model";
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
    IonTitle,
    IonToolbar,
    useIonToast
} from "@ionic/react";
import React, {useState} from "react";
import {alertOutline, checkmarkOutline, closeOutline, trashOutline} from "ionicons/icons";
import Candidate from "./candidate";
import {useAppDispatch} from "../../../../store/hooks";
import {acceptSubmission, refuseSubmission} from "../../../../service/submission.service";
import {fetchEmployer} from "../../../../store/store";

const getLocaleLastedTimeFromNow = (date: Date): string => {
    return `${date.getDate()} ${date
        .toLocaleDateString('tr-TR', {month: 'long'})} tarihinde`;
};

export default function CandidateItem({submission}: { submission: Submission }) {
    const [modalOpen, setModalOpen] = useState(false);
    const [isAccepting, setIsAccepting] = useState(false);
    const [isRefusing, setIsRefusing] = useState(false);
    const [present] = useIonToast();
    const dispatch = useAppDispatch();

    const handleAccept = async () => {
        setIsAccepting(true);
        const data = await acceptSubmission(submission);
        if (!data) {
            setTimeout(async () => {
                setIsAccepting(false);
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
                message: 'Başvuru kabul edildi.',
                duration: 5000,
                position: 'bottom',
                icon: checkmarkOutline,
                color: 'success',
            });
        }, 1500);
        setTimeout(() => dispatch(fetchEmployer()), 3500);
    };
    const handleRefuse = async () => {
        setIsRefusing(true);
        const data = await refuseSubmission(submission);
        if (!data) {
            setTimeout(async () => {
                setIsRefusing(false);
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
                message: 'Başvuru reddedildi.',
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
                         src={submission.seeker.avatar === ""
                             ?
                             "https://ionicframework.com/docs/img/demos/avatar.svg"
                             :
                             "data:image/png;base64," + submission.seeker.avatar
                         }/>
                </IonAvatar>
                <IonLabel>
                    <h2>
                        {submission.seeker.name}
                        {" "}
                        {submission.seeker.surname}
                    </h2>
                    <p>
                        {getLocaleLastedTimeFromNow(submission.createdAt)}
                        {" "}
                        başvuruldu
                    </p>
                </IonLabel>
            </IonItem>
            <IonModal isOpen={modalOpen}>
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonButton disabled={isAccepting || isRefusing}
                                       onClick={() => setModalOpen(false)}>
                                <IonIcon icon={closeOutline}/>
                            </IonButton>
                        </IonButtons>
                        <IonTitle>Aday</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <Candidate seeker={submission.seeker}/>
                </IonContent>
                <IonFooter className="ion-padding">
                    <IonButton expand="block"
                               disabled={isAccepting || isRefusing}
                               onClick={handleAccept}>
                        {
                            isAccepting ? <IonSpinner/> : "Kabul Et"
                        }
                    </IonButton>
                    <IonButton expand="block"
                               color="medium"
                               disabled={isAccepting || isRefusing}
                               onClick={handleRefuse}>
                        {
                            isRefusing ? <IonSpinner/> : "Reddet"
                        }
                    </IonButton>
                </IonFooter>
            </IonModal>
        </>
    )
}