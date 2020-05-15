interface Response{
    token: string,
    user:{
        name: string,
        email: string,
    }
}

export function signIn(): Promise<Response>{
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                token: 'aushdiaushiuahsiudhaisuhdiaushd',
                user:{
                    name: 'Willian',
                    email: 'willian@wmsdev.com.br',
                }
            });
        }, 2000);
    });
}