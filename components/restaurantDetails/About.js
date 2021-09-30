import React from 'react'
import { View, Text, Image } from 'react-native'

export default function About(props) {
  const { name, image, categories, rating, reviews, price } = props.route.params
  const formatDescription = () => {
    const categoriesString = categories
      .map((category) => category.title)
      .join(' · ')
    const priceString = price ? ' · ' + price : ''

    return `${categoriesString}${priceString} · 🎫 · ${rating} ⭐ (${reviews}+)`
  }

  return (
    <View>
      <RestaurantImage image={image} />
      <RestaurantTitle title={name} />
      <RestaurantDescription description={formatDescription()} />
    </View>
  )
}

const RestaurantImage = ({ image }) => (
  <Image source={{ uri: image }} style={{ width: '100%', height: 180 }} />
)

const RestaurantTitle = ({ title }) => (
  <Text
    style={{
      fontSize: 29,
      fontWeight: '700',
      marginTop: 7,
      marginHorizontal: 15,
    }}
  >
    {title}
  </Text>
)

const RestaurantDescription = ({ description }) => (
  <Text
    style={{
      marginTop: 10,
      marginHorizontal: 15,
      fontWeight: '400',
      fontSize: 13,
    }}
  >
    {description}
  </Text>
)
