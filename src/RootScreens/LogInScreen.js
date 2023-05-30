import React, { useState, Fragment } from 'react'
import { View, Text, TextInput, ScrollView, Pressable, ToastAndroid, TouchableOpacity, Modal, ActivityIndicator } from 'react-native'
import { FocusAwareStatusBar } from '../useFocusedStatusBar/FocusAwareStatusBar'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector, useDispatch } from 'react-redux';
import { setAuthLoader } from '../store/reducerSlicer'
import AsyncStorage from '@react-native-async-storage/async-storage';

const LogInScreen = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigation();
  const [value, setValue] = useState({ email: '', password: '' });
  const [loader, setLoader] = useState(false)


  const onSubmit = async () => {
    const data = await AsyncStorage.getItem('AppUser')
    const ParseData = JSON.parse(data)

    if (!ParseData?.find((item) => item?.email == value?.email)) {
      ToastAndroid.showWithGravity(
        'User not exit',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
      return;
    }

    if ((ParseData?.find((item) => item?.password == value?.password))) {
      setLoader(true)
      await AsyncStorage.setItem('isAuth', JSON.stringify({ isAuth: true, UserId: ParseData?.find((item) => item?.email == value?.email)?.id }))
        .then(() => {
          dispatch(setAuthLoader(true))
        })
        .catch(() => {

        })
    } else {
      ToastAndroid.showWithGravity(
        'Password missmatch',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
      return;
    }
  }



  return (
    <Fragment>
      <FocusAwareStatusBar barStyle={'dark-content'} backgroundColor={'#FFFFFF'} />
      <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', paddingHorizontal: 15, paddingTop: 20, paddingBottom: 20 }}>
          <View style={{ alignItems: 'center' }}>
            <View style={{ width: 115, height: 115, backgroundColor: '#F5F5FC', justifyContent: "center", alignItems: 'center', borderRadius: 100 }}>
              <FontAwesome name={'user'} size={50} color={'#000000'} />
            </View>

            <Text style={{ color: '#000000', fontSize: 30, fontFamily: 'OpenSans-Bold', textAlign: 'center', paddingTop: 35 }}>Log In</Text>
            <View style={{ marginTop: 10, marginBottom: 20 }}>
              <Text style={{ color: 'gray', fontSize: 16, fontFamily: 'OpenSans-SemiBold', textAlign: 'center' }}>Enter your credentials to continue</Text>
            </View>
          </View>
          <LoginInput
            value={value} setValue={setValue}
          />

          <LinearGradient
            start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }}
            colors={['#14bc66', '#14a062', '#16685a', '#183f53']}
            style={{ marginTop: 25, height: 50, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity
              onPress={() => { onSubmit() }}
              disabled={!value?.email || !value?.password}
              style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}
            >
              <Text style={{ color: '#FFFFFF', fontFamily: 'OpenSans-Bold', fontSize: 16 }}>
                Log In
              </Text>
            </TouchableOpacity>
          </LinearGradient>

          <View style={{ height: 40, width: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
            <Text style={{ color: '#000000', fontFamily: 'OpenSans-Bold', fontSize: 14 }}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => { Navigate.navigate('RegisterScreen') }} style={{}}>
              <Text style={{ color: '#14bb66', fontFamily: 'OpenSans-Bold', fontSize: 14 }}>Register</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>


      <Modal visible={loader} transparent>
        <FocusAwareStatusBar barStyle={'dark-content'} backgroundColor={'#00000075'} />
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#00000075' }}>
          <ActivityIndicator size={'large'} color={'#8ab4f8'} />
        </View>
      </Modal>
    </Fragment>
  )
}

export default LogInScreen

const LoginInput = ({ value, setValue }) => {
  const [show, setShow] = useState(false);

  return (
    <Fragment>
      <View style={{ marginTop: 15, width: '100%', height: 40, borderBottomWidth: 1, borderColor: '#000000', borderRadius: 0, paddingHorizontal: 10, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <FontAwesome name='user' color={'#252F40'} size={22} />
        <TextInput value={value?.email} autoCorrect={false} autoCapitalize={'none'} textContentType={'username'} onChangeText={(Text) => setValue({ ...value, email: Text })} placeholderTextColor={'gray'} placeholder={'Email/Phone number'} style={{ flex: 1, paddingHorizontal: 12, fontSize: 14, fontFamily: 'OpenSans-Regular', color: '#252F40' }} />
      </View>
      <View style={{ marginTop: 15, width: '100%', height: 40, borderBottomWidth: 1, borderColor: '#000000', borderRadius: 0, paddingHorizontal: 10, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <Ionicons name='lock-closed' color={'#252F40'} size={22} />
        <TextInput secureTextEntry={!show} autoCorrect={false} autoCapitalize={'none'} textContentType={'password'} value={value?.password} onChangeText={(Text) => setValue({ ...value, password: Text })} placeholderTextColor={'gray'} placeholder={'Password'} style={{ flex: 1, paddingHorizontal: 12, fontSize: 14, fontFamily: 'OpenSans-Regular', color: '#252F40' }} />
        <Pressable onPress={() => setShow(state => !state)}>
          <Ionicons name={show ? 'eye-off' : 'eye'} color={'#252F40'} size={22} />
        </Pressable>
      </View>
    </Fragment>
  )
}