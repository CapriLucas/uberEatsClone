import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

export default function RestaurantItems({ restaurants, navigation }) {
  return (
    <>
      {restaurants.map((restaurant, index) => (
        <TouchableOpacity
          key={index}
          activeOpacity={1}
          style={{ marginBottom: 30 }}
          onPress={() =>
            navigation.navigate('RestaurantDetails', {
              name: restaurant.name,
              image: restaurant.image_url,
              price: restaurant.price,
              reviews: restaurant.review_count,
              categories: restaurant.categories,
              rating: restaurant.rating,
            })
          }
        >
          <View style={{ marginTop: 10, padding: 15, backgroundColor: '#fff' }}>
            <RestaurantImage image_url={restaurant.image_url} />
            <RestaurantInfo name={restaurant.name} rating={restaurant.rating} />
          </View>
        </TouchableOpacity>
      ))}
    </>
  )
}

const RestaurantImage = ({ image_url }) => (
  <>
    <Image source={{ uri: image_url }} style={{ width: '100%', height: 150 }} />
    <TouchableOpacity style={{ position: 'absolute', right: 15, top: 15 }}>
      <MaterialCommunityIcons name="heart-outline" size={25} color="#fff" />
    </TouchableOpacity>
  </>
)

const RestaurantInfo = ({ name, rating }) => (
  <View
    style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 10,
    }}
  >
    <View>
      <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{name}</Text>
      <Text style={{ fontSize: 13, color: 'gray' }}>30-45 · min</Text>
    </View>
    <View
      style={{
        backgroundColor: '#eee',
        padding: 5,
        alignItems: 'center',
        borderRadius: 15,
      }}
    >
      <Text>{rating}</Text>
    </View>
  </View>
)
