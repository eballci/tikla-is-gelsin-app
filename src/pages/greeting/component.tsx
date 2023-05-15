import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonImg,
  IonPage,
  IonRow,
  IonText,
} from '@ionic/react';
import { PageType, savePageType } from './service';
import { useHistory } from 'react-router-dom';
import InterviewImg from '../../assets/landing-img.jpg';
import useCheckPageType from './use-check-page-type';
import styles from './greeting.module.css';

export default function Greeting() {
  const history = useHistory();
  const handlePageSelection = (pageType: PageType): void => {
    savePageType(pageType);
    history.push(`/${pageType.toString()}`);
  };

  useCheckPageType();

  return (
    <IonPage>
      <IonContent>
        <div className={styles.flex}>
          <IonGrid className={styles.center}>
            <IonRow>
              <IonCol>
                <IonText>Tıkla: İş Gelsin'e Hoşgeldin</IonText>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonButton
                  expand='block'
                  onClick={() => handlePageSelection(PageType.SEEKER)}
                >
                  İş Arayanlar
                </IonButton>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                {' '}
                <IonButton
                  expand='block'
                  onClick={() => handlePageSelection(PageType.SEEKER)}
                >
                  İş Verenler
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>

          <IonImg
            src={InterviewImg}
            alt='People waiting for job interview'
          ></IonImg>
        </div>
      </IonContent>
    </IonPage>
  );
}
