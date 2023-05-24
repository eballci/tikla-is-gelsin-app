import {
    IonAvatar,
    IonIcon,
    IonItem,
    IonItemGroup,
    IonLabel,
    IonText,
    IonTitle,
    useIonActionSheet,
    useIonToast
} from "@ionic/react";
import {alertOutline, createOutline, trashOutline} from "ionicons/icons";
import React from "react";
import {useAppDispatch, useAppSelector} from "../../../../../store/hooks";
import {Camera, CameraResultType} from "@capacitor/camera";
import {updateAvatar} from "../../../../../service/seeker.service";
import {fetchSeeker} from "../../../../../store/store";

export default function Personal() {
    const dispatch = useAppDispatch();
    const [present] = useIonActionSheet();
    const [presentToast] = useIonToast();
    const seeker = useAppSelector((state) => state.seeker.me);

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

        const data = await updateAvatar(seeker?.id ?? 0, file);

        if (!data) {
            await presentToast({
                message: "Profil fotoğrafı güncellenemedi.",
                duration: 3000,
                position: "bottom",
                icon: alertOutline,
                color: "danger"
            });
            return;
        }
        await presentToast({
            message: "Profil fotoğrafı güncellendi.",
            duration: 5000,
            position: "bottom",
            icon: trashOutline,
            color: "success"
        });
        setTimeout(() => dispatch(fetchSeeker()), 3500);
    };

    return (
        <IonItemGroup>
            <IonItem lines="none">
                <IonAvatar
                    onClick={handleAvatarClick}
                    style={{width: 100, height: 100}}>
                    <img alt="Profile image of the seeker"
                         src={seeker?.avatar === ""
                             ?
                             "https://ionicframework.com/docs/img/demos/avatar.svg"
                             :
                             "data:image/png;base64," + seeker?.avatar
                         }/>
                </IonAvatar>
            </IonItem>
            <IonItem lines="none" className="ion-padding-top">
                <IonTitle className="ion-text-left">
                    {seeker?.name} {seeker?.surname}
                </IonTitle>
            </IonItem>
            <IonItem lines="none" className="ion-padding-top">
                <IonText>{seeker?.biography !== undefined ? (
                    <>
                        <IonIcon icon={createOutline}></IonIcon>
                        <IonLabel>Kendinizi tanıtın...</IonLabel>
                    </>
                ) : seeker?.biography}</IonText>
            </IonItem>
        </IonItemGroup>
    );
}