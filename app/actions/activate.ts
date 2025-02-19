'use server'

import { ActivationRequest } from "/@/types/activation";
import { locales } from "/@/types/locales";


export async function getUser(pretoken:string): Promise<string> {
    const fetchData = async () => {
        const data = await fetch(process.env.API_URL +'/User/'+pretoken, { cache: 'no-store',
          method:'GET'});
        if(data.status !== 200) return "";
        const response : string = await data.text();
        return response;
    };
     const data:string = await fetchData();
     if(data) return data;
     return "";
}

export async function activateUser(pretoken:string, digits:string, username:string, password:string): Promise<{ success: boolean, message: string }> {
    const activationRequest:ActivationRequest = { activationToken: pretoken+digits, username: username, password: password };
    const fetchData = async () => {
        const data = await fetch( process.env.API_URL + '/Activation/Activate', { cache: 'no-store',
          method:'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(activationRequest)
        });
        if(data.status !== 200) return "";
        const response : string = await data.json();
        return response;
    };
     const data = await fetchData();
     if(data) return { success: true, message: locales.apiMessages.activationComplete };
     return { success: false, message: locales.apiMessages.checkData };
}