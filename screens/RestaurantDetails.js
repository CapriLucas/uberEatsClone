import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import { Divider } from 'react-native-elements'
import About from '../components/restaurantDetails/About'
import MenuItems from '../components/restaurantDetails/MenuItems'
import ViewCart from '../components/restaurantDetails/ViewCart'

const foods = [
  {
    title: 'Lasagna',
    description: 'With butter lettuce, tomato and sauce bechamel',
    price: '$14.51',
    image:
      'https://d1uz88p17r663j.cloudfront.net/original/4a783abdbfe1f7a79fbf5f93139b3c68_Lasagna-de-carne-.jpg',
  },
  {
    title: 'Tandoori Chicken',
    description: 'Amazing Indian dish with tenderloin chicken off the sizzles',
    price: '$19.51',
    image:
      'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/chicken-tandori-1526595014.jpg',
  },
  {
    title: 'Chilaquiles',
    description: "Awesome mexican dish. It'll blow your mind",
    price: '$14.51',
    image:
      'https://estaticos.miarevista.es/uploads/images/recipe/58eba85e5bafe83d203c986b/ppal-chilaquiles_0.jpg',
  },
  {
    title: 'Gnocchi',
    description: 'With butter',
    price: '$20.12',
    image:
      'https://www.kikkoman.eu/fileadmin/_processed_/a/e/csm_WEB_Spicy_tomato_and_sausage_gnocchi_with_fennel_and_spinach_b1e3a765d7.jpg',
  },
]

export default function RestaurantDetails({ route, navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <About route={route} />
      <Divider width={1.8} style={{ marginTop: 20 }} />
      <MenuItems restaurantName={route.params.name} foods={foods} />
      <ViewCart navigation={navigation} />
    </View>
  )
}
