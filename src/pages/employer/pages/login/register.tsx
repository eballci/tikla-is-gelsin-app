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
import {alertOutline, checkmarkOutline} from "ionicons/icons";
import {registerEmployer} from "../../../../service/employer.service";

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

    const handleRegister = async () => {
        setIsRegistering(true);
        const data = await registerEmployer(
            email,
            password,
            name
        );

        if (!data) {
            setTimeout(async () => {
                setIsRegistering(false);
                await present({
                    message: "Aynı e-posta ile başka bir işveren kayıtlı.",
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
                                Kurumunuzu
                                <br/>
                                Kaydedin
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
                                label="kurum adı"
                                labelPlacement="floating"
                                helperText="örnek: Facebook Inc."
                                value={name}
                                onIonInput={(ev) => setName(ev.detail.value as string)}/>
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
                                        "Kaydedin"
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