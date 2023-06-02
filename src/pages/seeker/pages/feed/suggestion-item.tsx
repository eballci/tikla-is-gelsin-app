import {
    IonButton,
    IonButtons,
    IonCard,
    IonCardContent,
    IonCol,
    IonContent,
    IonHeader,
    IonIcon,
    IonModal,
    IonRow,
    IonSpinner,
    IonTitle,
    IonToolbar,
    useIonToast,
} from '@ionic/react';
import React, {useState} from 'react';
import {PositionSuggestion} from '../../../../model';
import {alertOutline, checkmarkOutline, closeOutline, trashOutline,} from 'ionicons/icons';
import {ignoreSuggestion, submitSuggestion,} from '../../../../service/suggestion.service';
import {useAppDispatch} from '../../../../store/hooks';
import {fetchSeeker} from '../../../../store/store';
import {Positions} from '../../../../data/presetData';
import PositionInCard from '../../components/position-in-card';
import PositionInModal from '../../components/position-in-modal';
import styles from './feed.module.css';

export default function SuggestionItem({
                                           suggestion,
                                       }: {
    suggestion: PositionSuggestion;
}) {
    const [modalOpen, setModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isIgnoring, setIsIgnoring] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isIgnored, setIsIgnored] = useState(false);
    const [present] = useIonToast();
    const dispatch = useAppDispatch();

    const handleSubmit = () => {
        setIsSubmitting(true);
        submitSuggestion(suggestion).then((data) => {
            if (!data) {
                setTimeout(async () => {
                    setIsSubmitting(false);
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
                    message: 'Başvuru yapıldı.',
                    duration: 5000,
                    position: 'bottom',
                    icon: checkmarkOutline,
                    color: 'success',
                });
                setIsSubmitted(true);
            }, 1500);
            setTimeout(() => dispatch(fetchSeeker()), 3500);
        });
    };

    const handleIgnore = () => {
        setIsIgnoring(true);
        ignoreSuggestion(suggestion).then((data) => {
            if (!data) {
                setTimeout(async () => {
                    setIsIgnoring(false);
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
                    message: 'Öneri kaldırıldı.',
                    duration: 5000,
                    position: 'bottom',
                    icon: trashOutline,
                });
                setIsIgnored(true);
            }, 1500);
            setTimeout(() => dispatch(fetchSeeker()), 3500);
        });
    };

    return (
        <IonCard className={styles.card}>
            <IonRow className={[styles['compatibility-low'], styles.badge].join(' ')}>
                %{suggestion.matchRate} Uyumluluk
            </IonRow>
            <IonCardContent className={styles['card-content']}>
                <PositionInCard position={suggestion.position}/>
                <IonRow className={styles.gap}>
                    <IonCol className='ion-no-padding'>
                        <IonButton disabled={isIgnoring || isIgnored}
                                   className={styles['ignore-button']}
                                   size='small'
                                   onClick={handleIgnore}>
                            {!isIgnoring && !isIgnored && "Yok say"}
                            {isIgnoring && !isIgnored && <IonSpinner/>}
                            {isIgnored && "Kaldırıldı"}
                        </IonButton>
                    </IonCol>
                    <IonCol className='ion-no-padding'>
                        <IonButton disabled={isIgnoring || isIgnored}
                                   className={styles['details-button']}
                                   onClick={() => setModalOpen(true)}
                                   size='small'>
                            Detaylar
                        </IonButton>
                    </IonCol>
                </IonRow>
            </IonCardContent>

            <IonModal isOpen={modalOpen}>
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot='start'>
                            <IonButton
                                onClick={() => {
                                    setModalOpen(false);
                                }}
                            >
                                <IonIcon icon={closeOutline}></IonIcon>
                            </IonButton>
                        </IonButtons>
                        <IonTitle>
                            {
                                Positions.filter(
                                    (p) => p.value === suggestion.position.title
                                )[0].visual
                            }
                        </IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonRow
                        className={[styles['compatibility-low'], styles.badge].join(' ')}
                    >
                        %{suggestion.matchRate} Uyumluluk
                    </IonRow>
                    <PositionInModal position={suggestion.position}/>

                    {!isSubmitted && !isIgnored && (
                        <IonRow className={[styles.gap, 'ion-padding'].join(' ')}>
                            <IonCol className='ion-no-padding'>
                                <IonButton
                                    disabled={isSubmitting || isIgnoring}
                                    className={styles['ignore-button']}
                                    size='small'
                                    onClick={handleIgnore}
                                >
                                    {isIgnoring && <IonSpinner/>}
                                    {!isIgnoring && 'Kaldır'}
                                </IonButton>
                            </IonCol>
                            <IonCol className='ion-no-padding'>
                                <IonButton
                                    disabled={isSubmitting || isIgnoring}
                                    className={styles['details-button']}
                                    size='small'
                                    onClick={handleSubmit}
                                >
                                    {isSubmitting && <IonSpinner/>}
                                    {!isSubmitting && 'Başvur'}
                                </IonButton>
                            </IonCol>
                        </IonRow>
                    )}
                    {isSubmitted && (
                        <IonButton
                            disabled
                            expand='block'
                            className={styles['applied']}
                            size='small'
                        >
                            Başvuruldu
                        </IonButton>
                    )}
                    {isIgnored && (
                        <IonButton
                            disabled
                            expand='block'
                            className={styles['removed']}
                            size='small'
                        >
                            Kaldırıldı
                        </IonButton>
                    )}
                </IonContent>
            </IonModal>
        </IonCard>
    );
}
