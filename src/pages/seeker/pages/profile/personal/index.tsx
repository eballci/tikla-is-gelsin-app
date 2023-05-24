import {
    IonAvatar,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonInput,
    IonItem,
    IonItemGroup,
    IonList,
    IonModal,
    IonSpinner,
    IonText,
    IonTextarea,
    IonTitle,
    IonToolbar,
    useIonActionSheet,
    useIonAlert,
    useIonToast
} from "@ionic/react";
import {
    alertOutline,
    balloonOutline,
    checkmarkOutline,
    closeOutline,
    createOutline,
    settingsOutline,
    trashOutline
} from "ionicons/icons";
import React, {useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../../../store/hooks";
import {Camera, CameraResultType} from "@capacitor/camera";
import {updateAvatar, updateSeeker} from "../../../../../service/seeker.service";
import {fetchSeeker} from "../../../../../store/store";
import {Seeker} from "../../../../../model";

export default function Personal() {
    const dispatch = useAppDispatch();
    const [present] = useIonActionSheet();
    const [presentToast] = useIonToast();
    const [presentAlert] = useIonAlert();
    const seeker = useAppSelector((state) => state.seeker.me);
    const [modalOpen, setModalOpen] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [copy, setCopy] = useState({...seeker});

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

    const handleUpdate = async () => {
        setIsUpdating(true);
        const data = await updateSeeker(copy as Seeker);
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
                message: "Profil güncellendi.",
                duration: 5000,
                position: "bottom",
                icon: checkmarkOutline,
                color: "success"
            });
            setIsUpdating(false);
        }, 1500);
        setTimeout(() => dispatch(fetchSeeker()), 3500);
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
            <IonItemGroup style={{paddingTop: 40}}>
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
                        {seeker?.name} {seeker?.surname}
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
                <IonItem lines="none">
                    <IonIcon icon={balloonOutline}/>
                    <IonText>
                        {
                            ("0" + seeker?.birth.getDay()).slice(-2)
                        }
                        {" "}
                        {
                            seeker?.birth.toLocaleString("tr-TR", {month: "long"})
                        }
                        {" "}
                        {
                            seeker?.birth.getFullYear()
                        }
                    </IonText>
                </IonItem>
                <IonItem lines="none">
                    <IonText>
                        {
                            seeker?.biography
                        }
                    </IonText>
                </IonItem>
            </IonItemGroup>
            <IonModal isOpen={modalOpen}>
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonButton
                                disabled={isUpdating}
                                onClick={() => setModalOpen(false)}>
                                <IonIcon icon={closeOutline}/>
                            </IonButton>
                        </IonButtons>
                        <IonTitle>Profili Güncelle</IonTitle>
                        <IonButtons slot="end">
                            <IonButton
                                disabled={isUpdating}
                                onClick={handleUpdate}>
                                {
                                    isUpdating ? (
                                        <IonSpinner/>
                                    ) : (
                                        <IonIcon icon={checkmarkOutline}/>
                                    )
                                }
                            </IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonList className="ion-padding-top">
                        <IonItem>
                            <IonInput
                                disabled={isUpdating}
                                label="Ad"
                                labelPlacement="stacked"
                                value={copy.name}
                                onIonInput={(ev) => setCopy({
                                    ...copy,
                                    name: ev.detail.value as string
                                })}
                            />
                        </IonItem>
                        <IonItem>
                            <IonInput
                                disabled={isUpdating}
                                label="Soyad"
                                labelPlacement="stacked"
                                value={copy.surname}
                                onIonInput={(ev) => setCopy({
                                    ...copy,
                                    surname: ev.detail.value as string
                                })}
                            />
                        </IonItem>
                        <IonItem>
                            <IonInput
                                disabled={isUpdating}
                                type="date"
                                label="Doğum"
                                labelPlacement="stacked"
                                value={
                                    (copy.birth ?? new Date()).getFullYear()
                                    +
                                    "-"
                                    +
                                    ("0" + (copy.birth ?? new Date()).getMonth()).slice(-2)
                                    +
                                    "-"
                                    +
                                    ("0" + (copy.birth ?? new Date()).getDay()).slice(-2)
                                }
                                onIonInput={(ev) => setCopy({
                                    ...copy,
                                    birth: new Date(ev.detail.value as string)
                                })}
                            />
                        </IonItem>
                        <IonItem>
                            <IonTextarea
                                disabled={isUpdating}
                                label="Biyografi"
                                labelPlacement="stacked"
                                value={copy.biography}
                                onIonInput={(ev) => setCopy({
                                    ...copy,
                                    biography: ev.detail.value as string
                                })}
                                autoGrow={true}></IonTextarea>
                        </IonItem>
                    </IonList>
                </IonContent>
            </IonModal>
        </>
    );
}