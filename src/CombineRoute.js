import React, { Fragment, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, StatusBar, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootNavigation, AppNavigation } from './Navigation';
import { setAuthLoader, setUsersId } from './store/reducerSlicer';

const CombineRoute = () => {
    const dispatch = useDispatch();
    const { authLoading, UsersList } = useSelector(state => state?.reducerSlicer);
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        const onIsAuth = async () => {
            const data = await AsyncStorage.getItem('isAuth');
            const ParseData = JSON.parse(data)

            if (ParseData?.isAuth) {
                dispatch(setAuthLoader(false))
                dispatch(setUsersId(ParseData))
                setIsAuth(true)
            } else {
                setIsAuth(false)
                dispatch(setAuthLoader(false))
            }
        }
        onIsAuth();
    }, [authLoading]);

    if (authLoading) {
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor: '#FFFFFF' }}>
                <StatusBar translucent={false} barStyle='dark-content' backgroundColor="#FFFFFF" />
                <ActivityIndicator animating={true} size={'large'} color={'#6CCF7F'} />
            </View>
        )
    }

    return (
        <Fragment>
            {isAuth ?
                <AppNavigation />
                :
                <RootNavigation />}
        </Fragment>
    )
}

export default CombineRoute