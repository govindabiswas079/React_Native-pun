import React, { Fragment } from 'react'
import { View, Text, Image, Dimensions } from 'react-native'
import { FocusAwareStatusBar } from '../useFocusedStatusBar/FocusAwareStatusBar'
import AppHeader from '../AppHeader/AppHeader'

const AddScreen = ({ }) => {

  return (
    <Fragment>
      <FocusAwareStatusBar backgroundColor={'#8ab4f8'} />
      <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
        <AppHeader style={{ backgroundColor: '#8ab4f8', }}>
          <View style={{ flexGrow: 1 }} />
          <Text style={{ fontFamily: 'OpenSans-Bold', textAlign: 'center', color: '#FFFFFF', fontSize: 16 }}>New</Text>
          <View style={{ flexGrow: 1 }} />
        </AppHeader>

        
      </View>
    </Fragment>
  )
}
AddScreen.defaultProps = {

}


export default AddScreen 