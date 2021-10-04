import React from 'react'
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'
import { Divider } from 'react-native-elements'
import BouncyCheckBox from 'react-native-bouncy-checkbox'
import { useDispatch, useSelector } from 'react-redux'

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

export default function MenuItems({
  restaurantName,
  foods,
  hideCheckbox,
  marginLeft,
}) {
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
            {!hideCheckbox && (
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
            )}
            <FoodInfo food={food} />
            <FoodImage food={food} marginLeft={marginLeft || 0} />
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

const FoodImage = ({ food, marginLeft }) => (
  <View>
    <Image
      source={{ uri: food.image }}
      style={{ width: 90, height: 90, borderRadius: 8, marginLeft }}
    />
  </View>
)
