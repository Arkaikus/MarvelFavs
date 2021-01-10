import Cookies from "js-cookie";

export interface ComicData{
    comicId:string,
    title:string,
    thumbnail:string,
    description:string,
}

interface SignUpData {
    username:string,
    password:string
    email:string,
}

interface ApiEndpoints {
    auth : string,
    verify : string,
    signup : string,
    favorites : string,
    comics:string,
}

interface MarvelAuth {
    ts:string,
    apikey:string,
    hash:string
}

function urlParams(params:object):string {
    return Object.entries(params).map(kv => kv.join("=")).join("&")
}

export default class Api{
    private readonly apiHost: string;
    private readonly marvelApiHost: string;
    private readonly marvelAuth: MarvelAuth;
    private readonly endpoints: ApiEndpoints;

    constructor() {
        this.apiHost = "http://localhost:8080/";
        this.marvelApiHost = "http://gateway.marvel.com/";

        this.marvelAuth = {
            ts : "111111",
            apikey : "57422c4803fb8c8b6625b7f8b6151a6f",
            hash : "91147ef574e2e6026efd61f501616305",
        }
        this.endpoints = {
            auth:`${this.apiHost}auth/`,
            verify:`${this.apiHost}auth/verify/`,
            signup:`${this.apiHost}auth/signup/`,
            favorites:`${this.apiHost}favorites/`,
            comics:`${this.marvelApiHost}v1/public/comics`,
        }
    }

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
            let res = await fetch(this.endpoints.verify,{
                method:"POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body:JSON.stringify({
                    token:cookies.jwt
                })
            });
            if(res.status===401) this.signOut();
            return res.status === 200;
        }else{
            return false;
        }
    }

    signIn(username:string,password:string){
        return fetch(this.endpoints.auth,{
            method:"POST",
            mode:'cors',
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                username:username,
                password:password
            })
        })
    }

    signOut(){
        Cookies.remove('jwt');
    }

    async signUp(data:SignUpData){
        let res = await fetch(this.endpoints.signup,{
            method:"POST",
            mode:'cors',
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify(data)
        })
        return res.status===200;
    }

    favorites(comicId=""){
        return fetch(this.endpoints.favorites+comicId,{
            method:"GET",
            mode:'cors',
            headers:this.authorizationHeaders()
        })
    }

    addFavorite(data:ComicData){
        return fetch(this.endpoints.favorites,{
            method:"POST",
            mode:'cors',
            body:JSON.stringify(data),
            headers:this.authorizationHeaders()
        })
    }

    deleteFavorite(comicId:string){
        return fetch(this.endpoints.favorites+comicId,{
            method:"DELETE",
            mode:'cors',
            headers:this.authorizationHeaders()
        })
    }

    comics(params:object){
        return fetch(this.endpoints.comics+'?'+urlParams(this.marvelAuth)+'&'+urlParams(params))
            .then(res=>res.json());
    }

}
