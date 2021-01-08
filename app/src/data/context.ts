import React from 'react';
import Cookies from 'js-cookie';

interface ComicData{
    comicId:string,
    title:string,
    thumbnail:string
}

interface SignUpData {
    username:string,
    password:string
    email:string,
}

class Api{
    apiHost="https://marvel-favs-api.herokuapp.com/";

    authorizationHeaders(){
        let jwt = Cookies.get('jwt');
        return {
            "Authorization":`Bearer ${jwt}`,
            "Content-Type": "application/json"
        }
    }

    async loggedIn(){
        const cookies = Cookies.get();
        if(cookies.hasOwnProperty('jwt')){
            let res = await this.verify(cookies.jwt);
            return res.status === 200;
        }else{
            return false;
        }
    }

    async verify(jwt:string){
        return await fetch(this.apiHost+'auth/verify/',{
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                token:jwt
            })
        })
    }

    signIn(username:string,password:string){
        return fetch(this.apiHost+"auth/",{
            method:"POST",
            mode:'cors',
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                username:username,
                password:password
            })
        }).then(res=>res.json())
    }

    signOut(){
        Cookies.remove('jwt');
    }

    async signUp(data:SignUpData){
        let res = await fetch(this.apiHost+"auth/signup/",{
            method:"POST",
            mode:'cors',
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify(data)
        })
        console.log("sign up status", res);
        return res.status===200;
    }

    addFavorite(data:ComicData){
        return fetch(this.apiHost+'favorites/',{
            method:"POST",
            mode:'cors',
            body:JSON.stringify(data),
            headers:this.authorizationHeaders()
        }).then(res=>res.json())
    }

    favorites(){
        return fetch(this.apiHost+'favorites/',{
            method:"GET",
            mode:'cors',
            headers:this.authorizationHeaders()
        }).then(res=>res.json())
    }

    deleteFavorite(){
        return fetch(this.apiHost+'favorites/',{
            method:"DELETE",
            mode:'cors',
            headers:this.authorizationHeaders()
        })
    }
}

const AppContext = React.createContext<any>({
    ts:"111111",
    apiKey:"57422c4803fb8c8b6625b7f8b6151a6f",
    hash:"91147ef574e2e6026efd61f501616305",
    api:new Api(),
    validJwt:false,
    toastMsg:'',
    toastColor:'primary',
});

export default AppContext;
