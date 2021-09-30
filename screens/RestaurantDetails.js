import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import { Divider } from 'react-native-elements'
import About from '../components/restaurantDetails/About'
import MenuItems from '../components/restaurantDetails/MenuItems'
import ViewCart from '../components/restaurantDetails/ViewCart'

export default function RestaurantDetails({ route, navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <About route={route} />
      <Divider width={1.8} style={{ marginTop: 20 }} />
      <MenuItems />
      <ViewCart navigation={navigation} restaurantName={route.params.name} />
    </View>
  )
}
