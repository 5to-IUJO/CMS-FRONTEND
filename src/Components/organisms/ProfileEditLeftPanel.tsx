import React from 'react'
import ImageFromPCEditor from '../molecules/ImageFromPCProfileEditor'
import Description from '../molecules/Description'
interface UserDefinition {
    id: number,
    profile_image: string
    description: TrustedHTML
}
export default function ProfileEditLeftPanel({userData,reload}:{userData:UserDefinition | null, reload:Function}) {

    return (
        <>

            <ImageFromPCEditor namebd='profile_image' userData={userData } reload={reload} />

            <Description userData={userData } reload={reload} />
        </>
    )

}
