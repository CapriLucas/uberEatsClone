import React from 'react'
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'
import { Divider } from 'react-native-elements'
import BouncyCheckBox from 'react-native-bouncy-checkbox'
import { useDispatch, useSelector } from 'react-redux'

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

const styles = StyleSheet.create({
  menuItemStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 20,
  },
  titleStyle: {
    fontSize: 19,
    fontWeight: '700',
  },
  bodyStyle: {
    fontSize: 13,
  },
})

export default function MenuItems({ restaurantName }) {
  const dispatch = useDispatch()
  const selectItem = (item) =>
    dispatch({ type: 'ADD_TO_CART', payload: { item, restaurantName } })

  const removeItem = (title) =>
    dispatch({ type: 'REMOVE_FROM_CART', payload: { title, restaurantName } })

  const cartItems = useSelector(
    (state) => state.cartReducer.selectedItems.items
  )

  const isFoodInCart = (food) =>
    cartItems.find((item) => item.title === food.title)

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {foods.map((food, index) => (
        <View key={index}>
          <View key={index} style={styles.menuItemStyle}>
            <BouncyCheckBox
              isChecked={isFoodInCart(food)}
              iconStyle={{
                borderColor: 'lightgray',
                borderRadius: 0,
              }}
              fillColor="green"
              onPress={(isChecked) =>
                isChecked
                  ? selectItem({ ...food, isChecked })
                  : removeItem(food.title)
              }
            />
            <FoodInfo food={food} />
            <FoodImage food={food} />
          </View>
          <Divider width={0.4} style={{ marginHorizontal: 20 }} />
        </View>
      ))}
    </ScrollView>
  )
}

const FoodInfo = ({ food }) => (
  <View style={{ width: 200, justifyContent: 'space-evenly' }}>
    <Text style={styles.titleStyle}>{food.title}</Text>
    <Text style={styles.bodyStyle}>{food.description}</Text>
    <Text>{food.price}</Text>
  </View>
)

const FoodImage = ({ food }) => (
  <View>
    <Image
      source={{ uri: food.image }}
      style={{ width: 90, height: 90, borderRadius: 8 }}
    />
  </View>
)
