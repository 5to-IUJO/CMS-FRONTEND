import React from 'react'
import ProfileData from '@/componentes/molecules/profileView/ProfileData'
import { UserDefinition } from '@/interfaces/UserDefinition'

export default function ProfileLeftPanel({userData}:{userData:UserDefinition | null}) {

    return (
        <>

            <ProfileData userData={userData } />
        </>
    )

}
