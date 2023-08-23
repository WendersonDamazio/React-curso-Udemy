import { useState, useEffect } from 'react';

import { auth } from '../firebaseconection';
import { onAuthStateChanged } from 'firebase/auth'

export default function Private({ childrem }) {
    const [loading, setLoading] = useState(true);
    const [signed, setSigned] = useState(false);

    useEffect(() => {
        async function checkLogin() {
            const unsub = onAuthStateChanged(auth, (user) => {
                //se tem user logado
                if (user) {
                    const userData = {
                        vid: user.vid,
                        email: user.email,
                    }

                    localStorage.setItem("@dataiUser", JSON.stringify())

                    setLoading(false);
                    setSigned(true);

                } else {
                    //nao possui user logado
                    setLoading(false);
                    setSigned(false);
                }
            })
        }

        checkLogin();
    }, [])

    return childrem;
}