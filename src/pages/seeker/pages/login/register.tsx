import {
    IonButton,
    IonCol,
    IonContent,
    IonGrid,
    IonInput,
    IonModal,
    IonRow,
    IonSpinner,
    IonTitle,
    useIonToast
} from "@ionic/react";
import React, {useState} from "react";
import {registerSeeker} from "../../../../service/seeker.service";
import {alertOutline, checkmarkOutline} from "ionicons/icons";

export default function Register(
    {
        modalOpen,
        setModalOpen
    }: {
        modalOpen: boolean,
        setModalOpen: (data: boolean) => any
    }
) {
    const [present] = useIonToast();
    const [isRegistering, setIsRegistering] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [birth, setBirth] = useState("");

    const handleRegister = async () => {
        setIsRegistering(true);
        const data = await registerSeeker(
            email,
            password,
            name.split(" ")[0],
            name.split(" ")[1],
            new Date(birth)
        );

        if (!data) {
            setTimeout(async () => {
                setIsRegistering(false);
                await present({
                    message: "Aynı e-posta ile başka bir üye kayıtlı.",
                    duration: 3000,
                    position: "bottom",
                    icon: alertOutline,
                    color: "danger"
                });
            }, 1500);
            return;
        }

        setTimeout(async () => {
            await present({
                message: "Kayıt yapıldı.",
                duration: 5000,
                position: "bottom",
                icon: checkmarkOutline,
                color: "success"
            });
            setModalOpen(false);
        }, 1500);
    };

    return (
        <IonModal isOpen={modalOpen}>
            <IonContent>
                <IonGrid className="ion-padding-top">
                    <IonRow style={{paddingTop: 100}}>
                        <IonCol>
                            <IonTitle size="large">
                                Kayıt Olun
                            </IonTitle>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol className="ion-padding">
                            <IonInput
                                disabled={isRegistering}
                                className="ion-text-left"
                                type="email"
                                fill="solid"
                                label="e-posta"
                                labelPlacement="floating"
                                helperText="örnek: misal@alan.com"
                                value={email}
                                onIonInput={(ev) => setEmail(ev.detail.value as string)}/>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol className="ion-padding">
                            <IonInput
                                disabled={isRegistering}
                                className="ion-text-left"
                                type="password"
                                fill="solid"
                                label="parola"
                                labelPlacement="floating"
                                helperText="basit parola tercih etmeyin"
                                value={password}
                                onIonInput={(ev) => setPassword(ev.detail.value as string)}/>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol className="ion-padding">
                            <IonInput
                                disabled={isRegistering}
                                className="ion-text-left"
                                type="text"
                                fill="solid"
                                label="ad soyad"
                                labelPlacement="floating"
                                helperText="örnek: aziz sancar"
                                value={name}
                                onIonInput={(ev) => setName(ev.detail.value as string)}/>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol className="ion-padding">
                            <IonInput
                                disabled={isRegistering}
                                className="ion-text-left"
                                type="date"
                                fill="solid"
                                label="doğum tarihi"
                                labelPlacement="floating"
                                helperText="örnek: 29.10.1923"
                                value={birth}
                                onIonInput={(ev) => setBirth(ev.detail.value as string)}/>
                        </IonCol>
                    </IonRow>
                    <IonRow className="ion-align-items-center">
                        <IonCol>
                            <IonButton
                                style={{width: 100}}
                                onClick={handleRegister}
                                disabled={isRegistering}
                                fill="outline">
                                {
                                    (isRegistering) ? (
                                        <IonSpinner/>
                                    ) : (
                                        "Kayıt Ol"
                                    )
                                }
                            </IonButton>
                        </IonCol>
                    </IonRow>
                    <IonRow className="ion-align-items-center">
                        <IonCol>
                            <IonButton
                                style={{width: 100}}
                                onClick={() => setModalOpen(false)}
                                disabled={isRegistering}
                                color="dark">
                                Giriş Yap
                            </IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonModal>
    );
}