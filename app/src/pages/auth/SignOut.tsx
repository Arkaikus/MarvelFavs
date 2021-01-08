import React from "react";
import AppContext from "../../data/context";
import {IonPage, IonLoading, IonContent} from "@ionic/react";

export default class SignOut extends React.Component <any,any>{
    static contextType = AppContext;

    componentDidMount() {
        this.context.api.signOut();
        this.context.validJwt=false;
        window.location.href='/';
    }

    render() {
        return (<IonPage><IonContent><IonLoading isOpen={true} message="Exiting App..." /></IonContent></IonPage>);
    }
}