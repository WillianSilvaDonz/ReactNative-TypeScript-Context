import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import * as auth from '../services/auth';

interface AuthContextData{
    signed: boolean;
    user: object | null;
    signIn(): Promise<void>;
    signOut(): void;
    loading: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({children}) =>{
    const [user, setUser] = useState<object | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        async function loadStorageData(){
            const storageUser = await AsyncStorage.getItem('@Tbest:user');
            const storageToken = await AsyncStorage.getItem('@Tbest:token');

            await new Promise((resolve)=> setTimeout(resolve, 2000));

            if(storageToken && storageUser){
                setUser(JSON.parse(storageUser));
            }

            setLoading(false);
        }
        loadStorageData();
    }, [])

    async function signIn(){
        setLoading(true);
        const response = await auth.signIn();
        setUser(response.user);

        await AsyncStorage.setItem('@Tbest:user', JSON.stringify(response.user));
        await AsyncStorage.setItem('@Tbest:token', response.token);
        setLoading(false);
    }

    function signOut(){
        setLoading(true);
        AsyncStorage.clear().then(()=>{
            setUser(null);
            setLoading(false);
        });
    }

    return(
        <AuthContext.Provider value={{ signed: !!user, user, loading, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;