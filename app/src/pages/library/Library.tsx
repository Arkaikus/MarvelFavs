import React from "react";
import {
    IonCol,
    IonContent, IonGrid,
    IonHeader,
    IonItem,
    IonLabel,
    IonPage,
    IonRow,
    IonText,
    IonTitle,
    IonToolbar
} from "@ionic/react";
// import {IonItem, IonLabel} from "@ionic/react";

export default class Library extends React.Component{
    state = {
        favorites:[]
    }

    render() {
        return (
            <React.Fragment>
                <IonPage>
                    <IonHeader>
                        <IonToolbar>
                            <IonTitle>Library</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <IonContent fullscreen>
                        <IonGrid>
                            <IonRow className="ion-padding ion-justify-content-center">
                                <IonCol size="12" sizeLg="8" sizeXl="6">
                                    <IonItem color="secondary">
                                        No Favorite Comics Yet!
                                    </IonItem>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                    </IonContent>
                </IonPage>
            </React.Fragment>
        );
    }
}