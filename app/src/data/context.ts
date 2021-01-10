import React from 'react';
import Api from "./api";

export interface State {
    api:Api,
    validJwt:boolean,
    toast:object,
    fetchFavorites:boolean,
    setValidJwt:any,
    setToast: any,
    setFetchFavorites:any,
}

export let initialState = {
    api:new Api(),
    validJwt:false,
    toast:{
        msg:'',
        color:''
    },
    fetchFavorites:true,
    setValidJwt:()=>{},
    setToast: ()=>{},
    setFetchFavorites:()=>{},
}

const AppContext = React.createContext<State>(initialState);

export default AppContext;
