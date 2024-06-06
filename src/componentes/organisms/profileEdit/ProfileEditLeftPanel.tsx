import React from 'react'
import ImageFromPCEditor from '@/componentes/molecules/ImageFromPCProfileEditor'
import Description from '@/componentes/molecules/Description'
import { UserDefinition } from '@/interfaces/UserDefinition'

export default function ProfileEditLeftPanel({userData,reload}:{userData:UserDefinition | null, reload:Function}) {

    return (
        <>

            <ImageFromPCEditor namebd='profile_image' userData={userData } reload={reload} />

            <Description userData={userData } reload={reload} />
        </>
    )

}
