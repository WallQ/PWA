import { useState, useEffect } from 'react';

import { signEd } from '../services/auth';

const useAuthenticated = () => {
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        signEd()
            .then((result) => {
                if(result.auth === true) {
                    console.log(result);
                    setAuthenticated(true);
                }
            })
            .catch((error) => {
                console.log(error);
                setAuthenticated(false);
            })
    }, []);

    return { authenticated }
}

export default useAuthenticated;