import {useAppDispatch, useAppSelector} from "../../../../store/hooks";
import {
    IonAvatar,
    IonButton,
    IonButtons,
    IonIcon,
    IonItem,
    IonItemGroup, IonTitle,
    useIonActionSheet,
    useIonAlert,
    useIonToast
} from "@ionic/react";
import React, {useState} from "react";
import {Camera, CameraResultType} from "@capacitor/camera";
import {updateAvatar, updateEmployer} from "../../../../service/employer.service";
import {alertOutline, checkmarkOutline, createOutline, settingsOutline} from "ionicons/icons";
import {fetchEmployer} from "../../../../store/store";
import {Employer} from "../../../../model";

export default function Details() {
    const dispatch = useAppDispatch();
    const [present] = useIonActionSheet();
    const [presentToast] = useIonToast();
    const [presentAlert] = useIonAlert();
    const employer = useAppSelector((state) => state.employer.me);
    const [modalOpen, setModalOpen] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [copy, setCopy] = useState({...employer});

    const handleAvatarClick = async () => {
        await present({
            header: "Fotoğraf",
            buttons: [
                {
                    text: 'Fotoğrafı Güncelle',
                    handler: handleUpdateAvatar
                },
                {
                    text: 'İptal',
                    role: 'cancel',
                    data: {
                        action: 'cancel',
                    },
                }
            ]
        })
    };

    const handleUpdateAvatar = async () => {
        const image = await Camera.getPhoto({
            quality: 90,
            resultType: CameraResultType.Uri
        });
        const response = await fetch(image.webPath ?? "");
        const blob = await response.blob();
        const file = new File([blob], 'photo.jpg', {
            type: 'image/jpeg',
        });

        const data = await updateAvatar(employer?.id ?? 0, file);

        if (!data) {
            await presentToast({
                message: "Firma fotoğrafı güncellenemedi.",
                duration: 3000,
                position: "bottom",
                icon: alertOutline,
                color: "danger"
            });
            return;
        }
        await presentToast({
            message: "Firma fotoğrafı güncellendi.",
            duration: 5000,
            position: "bottom",
            icon: checkmarkOutline,
            color: "success"
        });
        setTimeout(() => dispatch(fetchEmployer()), 3500);
    };

    const handleUpdate = async () => {
        setIsUpdating(true);
        const data = await updateEmployer(copy as Employer);
        if (!data) {
            setTimeout(async () => {
                setIsUpdating(false);
                await presentToast({
                    message: "Bağlantı sağlanamadı.",
                    duration: 3000,
                    position: "bottom",
                    icon: alertOutline,
                    color: "danger"
                });
            }, 1500);
            return;
        }
        setTimeout(async () => {
            await presentToast({
                message: "Firma bilgileri güncellendi.",
                duration: 5000,
                position: "bottom",
                icon: checkmarkOutline,
                color: "success"
            });
            setIsUpdating(false);
        }, 1500);
        setTimeout(() => dispatch(fetchEmployer()), 3500);
    };

    const handleSetting = async () => {
        await present({
            header: "Ayarlar",
            buttons: [
                {
                    text: 'Çıkış Yap',
                    role: 'destructive',
                    handler: async () => {
                        await presentAlert({
                            header: "Uyarı",
                            subHeader: "Çıkış Yapılıyor",
                            message: "Çıkış yapmak istediğinizden emin misiniz?",
                            buttons: [
                                {
                                    text: "İptal",
                                    role: "cancel"
                                },
                                {
                                    text: "Evet",
                                    role: "destructive",
                                    handler: () => {
                                        localStorage.clear();
                                        window.location.pathname = "";
                                    }
                                }
                            ]
                        });
                    }
                },
                {
                    text: 'İptal',
                    role: 'cancel',
                    data: {
                        action: 'cancel',
                    },
                }
            ]
        })
    };

    return (
        <>
            <IonItemGroup style={{padding: 40}}>
                <IonItem lines="none">
                    <IonAvatar
                        onClick={handleAvatarClick}
                        style={{width: 100, height: 100}}>
                        <img alt="Profile image of the seeker"
                             src={
                                 employer?.avatar === ""
                                     ?
                                     "https://ionicframework.com/docs/img/demos/avatar.svg"
                                     :
                                     "data:image/png;base64," + employer?.avatar
                             }/>
                    </IonAvatar>
                    <IonButtons slot="end">
                        <IonButton
                            onClick={handleSetting}
                            size="large">
                            <IonIcon
                                color="dark"
                                icon={settingsOutline}/>
                        </IonButton>
                    </IonButtons>
                </IonItem>
                <IonItem
                    style={{paddingTop: 20}}
                    lines="none"
                    className="ion-no-padding">
                    <IonTitle size="large">
                        {employer?.name}
                    </IonTitle>
                    <IonButtons slot="end">
                        <IonButton
                            onClick={() => setModalOpen(true)}
                            size="large">
                            <IonIcon
                                color="dark"
                                icon={createOutline}/>
                        </IonButton>
                    </IonButtons>
                </IonItem>
            </IonItemGroup>
        </>
    );
}