import React from 'react'
import ImageFromPCEditor from '../../molecules/ImageFromPCProfileEditor'
import Description from '../../molecules/Description'
import ProfileData from '@/Components/molecules/profileView/ProfileData'
import { UserDefinition } from '@/interfaces/UserDefinition'

export default function ProfileLeftPanel({userData}:{userData:UserDefinition | null}) {

    return (
        <>

            <ProfileData userData={userData } />
        </>
    )

}
