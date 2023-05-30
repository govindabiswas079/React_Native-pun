import React, { useState, Fragment } from 'react'
import { View, Text, TextInput, ScrollView, ToastAndroid, Pressable, TouchableOpacity } from 'react-native'
import { FocusAwareStatusBar } from '../useFocusedStatusBar/FocusAwareStatusBar'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { Button, HelperText } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { setRegisterData } from '../store/reducerSlicer'
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegisterScreen = () => {
  const dispatch = useDispatch()
  const Navigate = useNavigation();
  const [value, setValue] = useState({ name: '', mobile: '', email: '', password: '', confirmPassword: '' });

  const onSubmit = async () => {
    const data = await AsyncStorage.getItem('AppUser')
    const ParseData = JSON.parse(data)

    if (ParseData?.find((item) => item?.email == value?.email)) {
      ToastAndroid.showWithGravity(
        'Email Alrady exit',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
      return;
    }
    if (ParseData?.find((item) => item?.mobile == value?.mobile)) {
      ToastAndroid.showWithGravity(
        'Mobile Alrady exit',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
      return;
    }
    dispatch(setRegisterData({ id: Math.floor((Math.random() * 10000)) + 1, ...value }));
    Navigate.navigate('OtpVerifyScreen');
    ({ ...value, name: '', mobile: '', email: '', password: '', confirmPassword: '' })
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

            <Text style={{ color: '#000000', fontSize: 30, fontFamily: 'OpenSans-Bold', textAlign: 'center', paddingTop: 35 }}>Register</Text>
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
              disabled={!value?.name || !value?.mobile || !value?.email || !value?.password || !value?.confirmPassword || (value?.password !== value?.confirmPassword) || (value?.mobile?.length !== 10)}
              style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}
            >
              <Text style={{ color: '#FFFFFF', fontFamily: 'OpenSans-Bold', fontSize: 16 }}>
                Register
              </Text>
            </TouchableOpacity>
          </LinearGradient>
          <View style={{ height: 40, width: '100%', justifyContent: 'center', alignItems: 'center', /* position: 'absolute', bottom: 0, */ flexDirection: 'row' }}>
            <Text style={{ color: '#000000', fontFamily: 'OpenSans-Bold', fontSize: 14 }}>Alrady have an account? </Text>
            <TouchableOpacity onPress={() => { Navigate.goBack() }} style={{}}>
              <Text style={{ color: '#14bb66', fontFamily: 'OpenSans-Bold', fontSize: 14 }}>Login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </Fragment>
  )
}

export default RegisterScreen;


const LoginInput = ({ value, setValue }) => {
  const [show, setShow] = useState({ password: false, ConfirmPassword: false });

  const isValidEmail = RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);
  const isValidPassword = RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/);
  return (
    <Fragment>
      <View style={{ marginTop: 15, width: '100%', height: 40, borderBottomWidth: 1, borderColor: '#000000', borderRadius: 0, paddingHorizontal: 10, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <FontAwesome name='user' color={'#252F40'} size={22} />
        <TextInput keyboardType={'ascii-capable'} autoCorrect={false} autoCapitalize={'none'} textContentType={'name'} value={value?.name} onChangeText={(Text) => setValue({ ...value, name: Text })} placeholderTextColor={'gray'} placeholder={'Name'} style={{ flex: 1, paddingHorizontal: 12, fontSize: 14, fontFamily: 'OpenSans-Regular', color: '#252F40' }} />
      </View>
      <View>
        <View style={{ marginTop: 15, width: '100%', height: 40, borderBottomWidth: 1, borderColor: '#000000', borderRadius: 0, paddingHorizontal: 10, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <FontAwesome5 name='mobile' color={'#252F40'} size={22} />
          <TextInput value={value?.mobile} maxLength={10} keyboardType={'numeric'} autoCorrect={false} autoCapitalize={'none'} textContentType={'telephoneNumber'} onChangeText={(Text) => setValue({ ...value, mobile: Text })} placeholderTextColor={'gray'} placeholder={'Mobile'} style={{ flex: 1, paddingHorizontal: 12, fontSize: 14, fontFamily: 'OpenSans-Regular', color: '#252F40' }} />
        </View>
        {!value?.mobile ? null : value?.mobile?.length !== 10 ? <HelperText type="error" style={{ color: 'red', fontFamily: 'OpenSans-Regular', fontSize: 12 }}>Enter 10 digit mobile number</HelperText> : null}
      </View>
      <View>
        <View style={{ marginTop: 15, width: '100%', height: 40, borderBottomWidth: 1, borderColor: '#000000', borderRadius: 0, paddingHorizontal: 10, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <MaterialCommunityIcons name='email' color={'#252F40'} size={22} />
          <TextInput value={value?.email} autoCorrect={false} autoCapitalize={'none'} textContentType={'emailAddress'} maxLength={50} keyboardType={'email-address'} onChangeText={(Text) => setValue({ ...value, email: Text })} placeholderTextColor={'gray'} placeholder={'Email'} style={{ flex: 1, paddingHorizontal: 12, fontSize: 14, fontFamily: 'OpenSans-Regular', color: '#252F40' }} />
        </View>
        {(!value?.email || value?.email?.match(isValidEmail)) ? null : <HelperText type="error" style={{ color: 'red', fontFamily: 'OpenSans-Regular', fontSize: 12 }}>Enter valid email</HelperText>}
      </View>
      <View>
        <View style={{ marginTop: 15, width: '100%', height: 40, borderBottomWidth: 1, borderColor: '#000000', borderRadius: 0, paddingHorizontal: 10, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons name='lock-closed' color={'#252F40'} size={22} />
          <TextInput secureTextEntry={!show?.password} autoCorrect={false} autoCapitalize={'none'} textContentType={'password'} maxLength={50} value={value?.password} onChangeText={(Text) => setValue({ ...value, password: Text })} placeholderTextColor={'gray'} placeholder={'Password'} style={{ flex: 1, paddingHorizontal: 12, fontSize: 14, fontFamily: 'OpenSans-Regular', color: '#252F40' }} />
          <Pressable onPress={() => setShow({ ...show, password: !show?.password })}>
            <Ionicons name={show?.password ? 'eye-off' : 'eye'} color={'#252F40'} size={22} />
          </Pressable>
        </View>
        {(!value?.password || value?.password?.match(isValidPassword)) ? null : <HelperText type="error" style={{ color: 'red', fontFamily: 'OpenSans-Regular', fontSize: 12 }}>Minimum eight characters, at least one letter, one number and one special character</HelperText>}
      </View>
      <View>
        <View style={{ marginTop: 15, width: '100%', height: 40, borderBottomWidth: 1, borderColor: '#000000', borderRadius: 0, paddingHorizontal: 10, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons name='lock-closed' color={'#252F40'} size={22} />
          <TextInput secureTextEntry={!show?.ConfirmPassword} autoCorrect={false} autoCapitalize={'none'} textContentType={'password'} maxLength={50} value={value?.confirmPassword} onChangeText={(Text) => setValue({ ...value, confirmPassword: Text })} placeholderTextColor={'gray'} placeholder={'Confirm Password'} style={{ flex: 1, paddingHorizontal: 12, fontSize: 14, fontFamily: 'OpenSans-Regular', color: '#252F40' }} />
          <Pressable onPress={() => setShow({ ...show, ConfirmPassword: !show?.ConfirmPassword })}>
            <Ionicons name={show?.ConfirmPassword ? 'eye-off' : 'eye'} color={'#252F40'} size={22} />
          </Pressable>
        </View>
        {(!value?.password || !value?.confirmPassword) ? null : (value?.password !== value?.confirmPassword) ? <HelperText type="error" style={{ color: 'red', fontFamily: 'OpenSans-Regular', fontSize: 12 }}>Password not same</HelperText> : null}
      </View>
    </Fragment>
  )
}