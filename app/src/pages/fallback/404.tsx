import {
    IonRow,IonCol,
    IonButton,
    IonContent,
    IonPage,
} from '@ionic/react';
import React from 'react';

export function http404(){
    return (
        <React.Fragment>
            <IonPage>
                <IonContent fullscreen>
                    <IonRow className="ion-justify-content-center ion-text-center">
                        <IonCol sizeLg="4">
                            <h1 style={{fontSize:"8rem"}}>404</h1>
                            <p>La página que estabas buscando no existe</p>
                            <IonButton onClick={()=>{
                                window.location.href='/';
                            }}>Volver al Inicio</IonButton>
                        </IonCol>
                    </IonRow>
                </IonContent>
            </IonPage>
        </React.Fragment>
    );
};