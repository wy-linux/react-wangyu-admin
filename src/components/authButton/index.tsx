
import React from 'react'
import { useAppSelector } from "@/store/hooks";
import { selectUser } from "@/store/slicers/userSlice"

interface AuthButtonProps {
    authKey: string,
    children: React.ReactElement
}
const AuthButton: React.FC<AuthButtonProps> = (props) => {
    const { authKey, children } = props;
    const { buttons } = useAppSelector(selectUser);
    const authorized = buttons?.includes(authKey);
    return (
        authorized ? children : null
    )
}

export default AuthButton
