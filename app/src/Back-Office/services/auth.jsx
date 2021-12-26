const API_URL = '/auth';

export const signUp = async ({ name, surname, email, password }) => {
    try {
        const response = await fetch(`${API_URL}/sign-up`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ name, surname, email, password }),
        });
        return await response.json();
    } catch (error) {
        console.error('Error fetching data: ', error);
    }
};

export const signIn = async (email, password) => {
    try {
        const response = await fetch(`${API_URL}/sign-in`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ email, password }),
        });
        return await response.json();
    } catch (error) {
        console.error('Error fetching data: ', error);
    }
};

export const signOut = () =>{
    fetch('/auth/sign-out',{
       headers: {'Accept': 'application/json'} 
    })
    .then((response)=>{response.json()})
    .then((response)=>{
        if(response.logout){
            setUserlogged(false);
        }
    })
    .catch(()=>{
        setUserlogged(false);
    })
};