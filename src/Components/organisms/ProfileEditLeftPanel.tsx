import React, { Component } from 'react'
import ImageFromPCEditor from '../molecules/ImageFromPCProfileEditor'
import Description from '../molecules/Description'
interface UserDefinition {
    id: number,
    username: string,
    email: string,
    gender: number,
    date_of_birth: string,
    profile_image: string
}
export default function ProfileEditLeftPanel({userData}:{userData:UserDefinition}) {

    return (
        <>

            <ImageFromPCEditor namebd='profile_image' userData={userData} />

            <Description />
        </>
    )

}
