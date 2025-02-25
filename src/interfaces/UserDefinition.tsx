export interface UserDefinition {
    id: number,
    username: string,
    first_name: string,
    second_name: string | undefined,
    last_name: string,
    second_last_name: string | undefined,
    cedula: string,
    type: string,
    nationality:number,
    nationality_name:string,
    email: string,
    gender: number,
    gender_name:string,
    date_of_birth: string,
    profile_image: string,
    description: TrustedHTML,
    address: {
        id: number,
        reference: string,
        country: number,
        state: number | null,
        city: number | null,
        municipality: number | null,
        parish: number | null,
        postalcode: number | null
    },
    url:string,
    urlImage:string,
    x:string,
    instagram:string,
    tiktok:string,
    facebook:string,
    is_staff: boolean,
}