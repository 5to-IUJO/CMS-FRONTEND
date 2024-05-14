
'use server'
import { cookies } from "next/headers";


export async function saveToken (token: string){
    cookies().set('token', token)
}
export async function obtainToken (token: string){
    return cookies().get('token')
}