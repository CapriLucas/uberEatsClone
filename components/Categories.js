import React from 'react'
import { View, Text, Image, ScrollView } from 'react-native'
const items = [
  {
    image: require('../assets/images/shopping-bag.png'),
    text: 'Pick-up',
  },
  {
    image: require('../assets/images/soft-drink.png'),
    text: 'Soft Drinks',
  },
  {
    image: require('../assets/images/bread.png'),
    text: 'Bakery Items',
  },
  {
    image: require('../assets/images/fast-food.png'),
    text: 'Fast Foods',
  },
  {
    image: require('../assets/images/deals.png'),
    text: 'Deals',
  },
  {
    image: require('../assets/images/coffee.png'),
    text: 'Coffee & Tea',
  },
]

export default function Categories() {
  return (
    <View
      style={{
        marginTop: 5,
        backgroundColor: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 10,
      }}
    >
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {items.map((item, index) => (
          <View
            key={index}
            style={{ alignItems: 'center', marginHorizontal: 7.5 }}
          >
            <Image
              style={{ width: 40, height: 30, resizeMode: 'contain' }}
              source={item.image}
            />
            <Text style={{ fontSize: 12, fontWeight: '700' }}>{item.text}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  )
}
