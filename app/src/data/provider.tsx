import React from "react";
import {useContext} from "react";
import AppContext from "./context";
import {IonToast} from "@ionic/react";

export const AppProvider: React.FC = (props) => {
    let context = useContext(AppContext);
    return (
        <AppContext.Provider value={context}>
            {props.children}
        </AppContext.Provider>
    );
}