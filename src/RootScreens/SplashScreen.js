import React, { Fragment, useEffect } from 'react';
import { Image, Text, View, StatusBar, Dimensions, TouchableOpacity, ActivityIndicator } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import { useIsFocused } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

function FocusAwareStatusBar(props) {
  const isFocused = useIsFocused();
  return isFocused ? <StatusBar {...props} /> : null;
}

const SplashScreen = ({ navigation }) => {

  const onDone = () => {
    navigation.navigate('LoginScreen')
  };
  const onSkip = () => {
    navigation.navigate('LoginScreen')
  }

  return (
    <Fragment>
      <FocusAwareStatusBar translucent={false} barStyle={'dark-content'} backgroundColor="#e6e6e6" />
      <AppIntroSlider
        keyExtractor={(item) => item.key}
        renderItem={RenderItem}
        data={slides}
        activeDotStyle={{ backgroundColor: "#14bc66", width: 20, height: 9, position: 'relative', top: -300 }}
        dotStyle={{ backgroundColor: 'gray', position: 'relative', top: -300 }}
        renderDoneButton={DoneButton}
        renderNextButton={NextButton}
        renderSkipButton={SkipButton}
        renderPrevButton={BackButton}
        showNextButton={false}
        showDoneButton={false}
        showSkipButton={false}
        showPrevButton={false}
        onDone={() => onDone()}
        onSkip={() => onSkip()}
      />

      <View style={{ paddingHorizontal: 15, alignItems: 'center' }}>
        <LinearGradient
          start={{ x: 0, y: 0.25 }} end={{ x: 0.8, y: 0.6 }}
          colors={['#14bc66', '#14bc66', '#14a062', '#16685a', '#183d53']}
          style={{ position: 'absolute', bottom: 20, width: '100%', height: 50, borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}
        >
          <TouchableOpacity
            onPress={() => { navigation.navigate('LoginScreen') }}
            style={{ width: '100%', justifyContent: 'center', alignItems: 'center', }}
          >
            <Text style={{ color: '#FFFFFF', fontFamily: 'OpenSans-Bold', fontSize: 16 }}>
              Get Started
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>

    </Fragment>
  )
}

export default SplashScreen;




const slides = [
  {
    key: 1,
    title: 'Title 1',
    text: 'Description.\nSay something cool',
    image: 'https://royoapps.com/wp-content/themes/luxury-wp/media/2022/11/food-banner-img.webp?var=1267667568',
    backgroundColor: '#e6e6e6',
  },
  {
    key: 2,
    title: 'Title 2',
    text: 'Description.\nSay something cool',
    image: 'https://royoapps.com/wp-content/themes/luxury-wp/media/2022/11/food-banner-img.webp?var=1267667568',
    backgroundColor: '#e6e6e6',
  },
  {
    key: 3,
    title: 'Rocket guy',
    text: 'Description.\nSay something cool',
    image: 'https://royoapps.com/wp-content/themes/luxury-wp/media/2022/11/food-banner-img.webp?var=1267667568',
    backgroundColor: '#e6e6e6',
  }
];

const RenderItem = ({ item }) => {
  return (
    <>
      <StatusBar translucent={true} backgroundColor={'transparent'} />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: item.backgroundColor }}>

        <View style={{ height: 300, width: 300, }}>
          <Image
            source={{ uri: item.image }}
            style={{ resizeMode: 'contain', height: "100%", width: "100%", }}
          />
        </View>
        <Text
          style={{
            paddingTop: 40,
            paddingBottom: 10,
            fontSize: 26,
            fontWeight: "bold",
            color: "#000000",
            alignSelf: "center",
          }}
        >
          {item.title}
        </Text>

        <Text style={{
          textAlign: "center",
          color: "#000000",
          fontSize: 14,
          paddingHorizontal: 30
        }}>
          {item.text}
        </Text>
      </View>
    </>
  );
};


const DoneButton = () => {
  return (
    <>
      <View style={{ width: 70, borderRadius: 2, paddingTop: 2, paddingBottom: 2, }}>
        <Text style={{ color: '#000000', textAlign: 'center', textTransform: 'uppercase', fontSize: 14 }}>Start</Text>
      </View>
    </>
  )
}
const NextButton = () => {
  return (
    <>
      <View style={{ width: 70, borderRadius: 2, paddingTop: 2, paddingBottom: 2, }}>
        <Text style={{ color: '#000000', textAlign: 'center', textTransform: 'uppercase', fontSize: 14 }}>Next</Text>
      </View>
    </>
  )
}
const SkipButton = () => {
  const topPostion = Dimensions.get('screen').height - 165;

  return (
    <>
      <View style={{ backgroundColor: "red", /* top: -topPostion, right: 0 */ }}>
        <Text style={{ color: '#000000', textTransform: 'uppercase', fontSize: 14 }}>Skip this</Text>
      </View>
    </>
  )
}
const BackButton = () => {
  return (
    <>
      <View /* style={{ position: 'absolute', top: -20, left: 0 }} */>
        <Text style={{ color: '#000000', textTransform: 'uppercase', fontSize: 14 }}>Prev</Text>
      </View>
    </>
  )
}