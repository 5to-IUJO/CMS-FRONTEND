import React from 'react'
import ImageFromPCEditor from '../../molecules/ImageFromPCProfileEditor'
import Description from '../../molecules/Description'
import ProfileData from '@/Components/molecules/profileView/ProfileData'
interface UserDefinition {
    id: number,
    profile_image: string
    description: TrustedHTML
}
export default function ProfileLeftPanel({userData}:{userData:UserDefinition | null}) {

    return (
        <>

            <ProfileData userData={userData } />
        </>
    )

}
