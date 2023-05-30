import React, { Fragment, useState, useRef } from 'react'
import { View, Text, Image, Pressable, ScrollView, Dimensions, FlatList, } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { FocusAwareStatusBar } from '../useFocusedStatusBar/FocusAwareStatusBar'
import AppHeader from '../AppHeader/AppHeader'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import { data, banners } from '../Data'
import LinearGradient from 'react-native-linear-gradient';

const HomeScreen = () => {
  const [activeDot, setActiveDot] = useState(1)
  const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

  return (
    <Fragment>
      <FocusAwareStatusBar backgroundColor={'#FFFFFF'} />
      <AppHeader style={{ backgroundColor: '#FFFFFF', }}>
        <LinearGradient
          start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }}
          colors={['#14bc66', '#14a062', '#16685a', '#183f53']}
          style={{ width: 40, height: 40, backgroundColor: 'red', borderRadius: 100, alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ width: 35, height: 35, borderRadius: 100, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center' }}>
            <MaterialCommunityIcons name='view-dashboard-outline' color='#000000' size={25} />
          </View>
        </LinearGradient>
        <View style={{ width: 40, height: 40, borderRadius: 100, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center' }}>

        </View>
        <View style={{ flexGrow: 1 }} />
        <Text style={{ fontFamily: 'OpenSans-Bold', textAlign: 'center', color: '#000000', fontSize: 16 }}>Activity</Text>
        <View style={{ flexGrow: 1 }} />
        <View style={{ width: 40, height: 40, borderRadius: 100, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center' }}>
          <EvilIcons name='search' color='gray' size={25} />
        </View>
        <View style={{ width: 40, height: 40, borderRadius: 100, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center' }}>
          <Ionicons name='notifications-outline' color='#000000' size={25} />
          <View style={{ position: 'absolute', top: -3, right: 2, width: 20, height: 20, backgroundColor: '#14bc66', borderRadius: 100, justifyContent: 'center', alignItems: 'center', }}>
            <Text style={{ color: '#FFFFFF', fontFamily: 'OpenSans-SemiBold' }}>3</Text>
          </View>
        </View>
      </AppHeader>

      <View style={{ flex: 1, backgroundColor: '#FFFFFF', }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, marginBottom: 20 }}>
          <Text style={{ color: '#000000', fontSize: 16, fontFamily: "OpenSans-SemiBold", }}>Popular</Text>
          <Text style={{ color: 'gray', fontSize: 16, fontFamily: "OpenSans-SemiBold", }}>Latest</Text>
          <Text style={{ color: 'gray', fontSize: 16, fontFamily: "OpenSans-SemiBold", }}>Following</Text>
        </View>

        <FlatList
          ListHeaderComponent={() => {
            return (
              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                {banners?.map((value, index) => (
                  <LinearGradient
                    key={index}
                    start={{ x: 0.0, y: 0.0 }} end={{ x: 0.5, y: 1.0 }}
                    colors={['#14bc66', '#14a062', '#16685a', '#183f53']}
                    style={{ borderRadius: 10, padding: 12, height: 'auto', width: 370, marginLeft: index == 0 ? 15 : 0, marginRight: 10 }}
                  >
                    <Image source={{ uri: value?.image }} resizeMode='stretch' style={{ height: 450, borderRadius: 10 }} />

                    <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', paddingTop: 20 }}>
                      <View style={{ justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
                        <Ionicons name='location-outline' color={'#ffffff'} size={20} />
                        <Text style={{ paddingLeft: 12, paddingRight: 12, color: '#FFFFFF', fontFamily: 'OpenSans-SemiBold', fontSize: 14, borderRadius: 5 }}>San Francisco, CA</Text>
                      </View>

                      <View style={{ borderRadius: 5, borderWidth: 1, backgroundColor: '#8496a3', paddingLeft: 8, paddingRight: 8, paddingTop: 3, paddingBottom: 3, borderColor: '#FFFFFF', borderStyle: 'solid' }}>
                        <Text style={{ fontSize: 14, color: '#ffffff', fontFamily: 'OpenSans-SemiBold' }}>CONNECT</Text>
                      </View>
                    </View>

                    <View style={{ paddingTop: 20 }}>
                      <Text numberOfLines={2} style={{ color: '#ffffff', fontSize: 16, fontFamily: 'OpenSans-Bold', width: 300 }}>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                      </Text>
                    </View>
                    <View style={{ alignItems: 'center', flexDirection: 'row', paddingTop: 25, paddingBottom: 10 }}>
                      <View style={{ elevation: 8, backgroundColor: '#8496a3', width: 50, height: 50, borderRadius: 100, justifyContent: 'center', alignItems: 'center' }}>
                        <FontAwesome name='user' color={'#ffffff'} size={24} />
                      </View>
                      <View>
                        <Text style={{ paddingLeft: 12, color: '#FFFFFF', fontFamily: 'OpenSans-Bold', fontSize: 16, borderRadius: 5 }}>Olivia Redman</Text>
                        <Text style={{ paddingLeft: 12, color: '#FFFFFF', fontFamily: 'OpenSans-SemiBold', fontSize: 14, borderRadius: 5 }}>6 minutes</Text>
                      </View>
                    </View>


                    <View style={{ position: 'absolute', bottom: 15, right: 15, justifyContent: 'center', alignItems: 'center' }}>
                      <View style={{padding: 5}}>
                        <AntDesign name='hearto' color={'#FFFFFF'} size={20} />
                        <Text style={{ color: '#FFFFFF', fontFamily: 'OpenSans-Bold', fontSize: 14, }}>243</Text>
                      </View>
                      <View style={{padding: 5}}>
                        <Feather name='send' color={'#FFFFFF'} size={20} />
                      </View>
                      <View style={{padding: 5}}>
                        <Ionicons name='chatbubble-outline' color={'#FFFFFF'} size={20} />
                      </View>
                    </View>
                  </LinearGradient>
                ))}
              </ScrollView>
            )
          }}

          viewabilityConfig={{}}
          onEndReachedThreshold={0.10}
          onEndReached={() => console.log('click')}
          initialNumToRender={5}
          numColumns={2}
          ItemSeparatorComponent={() => (<View style={{ height: 15 }} />)}
          data={banners}
          renderItem={({ item, index }) => {

            return (
              <Animatable.View animation='slideInUp' delay={300} style={{ paddingTop: 20, paddingHorizontal: 15, width: '50%' }}>
                <Pressable style={{ backgroundColor: '#8ab4f8', height: 190, width: '100%', justifyContent: 'center', alignItems: 'center', borderRadius: 5, overflow: 'hidden', }}>
                  <Image source={{ uri: item?.image }} resizeMode='stretch' style={{ width: '100%', height: '100%' }} />
                </Pressable>
                <Text style={{ color: '#8ab4f8', fontSize: 14, fontFamily: 'OpenSans-SemiBold', }}>{item?.name}</Text>
              </Animatable.View>
            )
          }}
          keyExtractor={(item) => item?.id}
        />

      </View >
    </Fragment >
  )
}

export default HomeScreen;

