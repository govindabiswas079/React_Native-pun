import React, { useState, Fragment } from 'react'
import { View, Text, TextInput, ScrollView, ToastAndroid, TouchableOpacity, Modal } from 'react-native'
import { FocusAwareStatusBar } from '../useFocusedStatusBar/FocusAwareStatusBar'
import OTPInputView from '@twotalltotems/react-native-otp-input';
import Lottie from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper';
import { Successful } from '../assets/Lottie'
import { useSelector } from 'react-redux';
import Feather from 'react-native-vector-icons/Feather'
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';

const OtpVerifyScreen = () => {
  const Navigate = useNavigation();
  const { RegisterData } = useSelector(state => state?.reducerSlicer)
  const [isSuccess, setIsSuccess] = useState(false)
  const [value, setValue] = useState({ otp: '' })

  const onSubmit = async () => {
    const data = await AsyncStorage.getItem('AppUser');
    const UsersList = JSON.parse(data);

    if (1111 == value?.otp) {
      setIsSuccess(true)
      if (UsersList) {
        await AsyncStorage.setItem('AppUser', JSON.stringify([...UsersList, RegisterData]))
        setTimeout(() => {
          Navigate.navigate('LoginScreen')
          setIsSuccess(false)
        }, 1500)
      } else {
        await AsyncStorage.setItem('AppUser', JSON.stringify([RegisterData]))
        setTimeout(() => {
          Navigate.navigate('LoginScreen')
          setIsSuccess(false)
        }, 1500)
      }
    } else {
      ToastAndroid.showWithGravity(
        'Invalid OTP',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    }
  }

  return (
    <Fragment>
      <FocusAwareStatusBar barStyle={'dark-content'} backgroundColor={'#FFFFFF'} />
      <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', paddingHorizontal: 15, paddingTop: 20, paddingBottom: 20 }}>

          <View>
            <Text style={{ color: '#000000', fontSize: 30, fontFamily: 'OpenSans-Bold' }}>Verify</Text>
            <View style={{ marginTop: 10 }}>
              <Text style={{ color: 'gray', fontSize: 16, fontFamily: 'OpenSans-SemiBold' }}>Enter 4 digit otp send to your mobile</Text>
            </View>
          </View>

          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <OTPInputView
              placeholderCharacter={'1'}
              placeholderTextColor={'#7C82A1'}
              style={{ width: '70%', height: 100, }}
              pinCount={4}
              code={value.otp}
              onCodeChanged={(OTP) => { setValue({ ...value, otp: OTP }) }}
              codeInputFieldStyle={{ width: 52, height: 52, borderWidth: 1, borderRadius: 10, backgroundColor: '#F3F4F6', borderColor: '#F3F4F6', color: '#333647', fontFamily: "OpenSans-Bold", fontSize: 16 }}
              codeInputHighlightStyle={{ borderColor: "#475AD7", color: "#475AD7", fontFamily: "OpenSans-Bold", fontSize: 16 }}
              onCodeFilled={(code => {

              })}
            />
          </View>

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
              Verify
              </Text>
            </TouchableOpacity>
          </LinearGradient>

          <View style={{ paddingTop: 20, width: "100%", }}>
            <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ color: "#666C8E", fontSize: 16, fontFamily: "OpenSans-Regular" }}>Didn't receive an OTP? </Text>
              <TouchableOpacity onPress={() => { }}>
                <Text style={{ color: '#14bc66', fontFamily: 'OpenSans-Bold', fontSize: 14 }}>Send again</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ height: 40, width: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
          <Text style={{ color: '#000000', fontFamily: 'OpenSans-Bold', fontSize: 14 }}>Alrady have an account? </Text>
          <TouchableOpacity onPress={() => { Navigate.navigate('LoginScreen') }} style={{}}>
            <Text style={{ color: 'blue', fontFamily: 'OpenSans-Bold', fontSize: 14 }}>Log In</Text>
          </TouchableOpacity>
        </View>
        </ScrollView>
      </View>


      <Modal visible={isSuccess} transparent={true} onRequestClose={() => setIsSuccess(false)}>
        <View style={{ backgroundColor: '#00000059', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
          <Lottie source={Successful} autoPlay={true} loop={false} />
        </View>
      </Modal>
    </Fragment>
  )
}

export default OtpVerifyScreen