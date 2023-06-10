import {useAppDispatch, useAppSelector} from "../../../../store/hooks";
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
import React, {useState} from "react";
import {Camera, CameraResultType} from "@capacitor/camera";
import {updateAvatar, updateEmployer} from "../../../../service/employer.service";
import {
    alertOutline,
    checkmarkOutline,
    closeOutline,
    createOutline,
    earthOutline,
    peopleOutline,
    settingsOutline
} from "ionicons/icons";
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
                    <h2>{employer?.name}</h2>
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
                <IonItem lines="none"
                         className="ion-no-padding">
                    <IonIcon icon={peopleOutline}></IonIcon>
                    <IonText className="ion-margin-start">
                        {employer?.scale}
                    </IonText>
                </IonItem>
                <IonItem
                    className="ion-no-padding">
                    <IonIcon icon={earthOutline}></IonIcon>
                    <IonText className="ion-margin-start">
                        {employer?.webSite ?? "-"}
                    </IonText>
                </IonItem>
                <IonItem lines="none"
                         className="ion-no-padding ion-padding-top">
                    <IonText color="dark">
                        {employer?.description}
                    </IonText>
                </IonItem>
            </IonItemGroup>
            <IonModal isOpen={modalOpen}>
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonButton disabled={isUpdating}
                                       onClick={() => setModalOpen(false)}>
                                <IonIcon icon={closeOutline}/>
                            </IonButton>
                        </IonButtons>
                        <IonTitle>
                            Firma Profili Güncelle
                        </IonTitle>
                        <IonButtons slot="end">
                            <IonButton disabled={isUpdating}
                                       onClick={handleUpdate}>
                                {
                                    isUpdating ?
                                        <IonSpinner/> :
                                        <IonIcon icon={checkmarkOutline}></IonIcon>
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
                                label="Çalışan Sayısı"
                                labelPlacement="stacked"
                                value={copy.scale}
                                type="number"
                                onIonInput={(ev) => setCopy({
                                    ...copy,
                                    scale: parseInt(ev.detail.value ?? "0")
                                })}
                            />
                        </IonItem>
                        <IonItem>
                            <IonInput
                                disabled={isUpdating}
                                label="Web Sitesi"
                                labelPlacement="stacked"
                                value={copy.webSite}
                                type="url"
                                onIonInput={(ev) => setCopy({
                                    ...copy,
                                    webSite: ev.detail.value as string
                                })}
                            />
                        </IonItem>
                        <IonItem>
                            <IonTextarea
                                disabled={isUpdating}
                                label="Hakkında"
                                labelPlacement="stacked"
                                value={copy.description}
                                onIonInput={(ev) => setCopy({
                                    ...copy,
                                    description: ev.detail.value as string
                                })}
                                autoGrow={true}></IonTextarea>
                        </IonItem>
                    </IonList>
                </IonContent>
            </IonModal>
        </>
    );
}