
'use server'
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


export async function saveToken (token: string){
    cookies().set('token', token)
}

export async function obtainToken (){
    return cookies().get('token')
}

export async function clearToken (){
    cookies().delete('token')
    redirect("/login")
}