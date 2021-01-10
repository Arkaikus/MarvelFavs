import React, {useState} from "react";
import AppContext from "./context";
import {IonToast} from "@ionic/react";
import Api from "./api";

export const AppProvider: React.FC = (props) => {
    // let context = useContext(AppContext);
    let [validJwt, setValidJwt]=useState(false);
    let [fetchFavorites, setFetchFavorites]=useState(true);
    let [toast,setToast] = useState({
        msg:'', color:'primary'
    })

    let state = {
        api:new Api(),
        validJwt:validJwt,
        toast:toast,
        fetchFavorites:fetchFavorites,
        setValidJwt:setValidJwt,
        setToast: setToast,
        setFetchFavorites:setFetchFavorites,
    }

    return (
        <AppContext.Provider value={state}>
            <IonToast
                isOpen={!!toast.msg}
                duration={4000}
                position="top"
                color={toast.color}
                message={toast.msg}
            />
            {props.children}
        </AppContext.Provider>
    );
}