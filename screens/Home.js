import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, StatusBar, View } from 'react-native'
import Categories from '../components/Categories'
import HeaderTabs from '../components/HeaderTabs'
import RestaurantItems from '../components/RestaurantItems'
import SearchBar from '../components/SearchBar'

const YELP_API_KEY =
export default function Home() {
  const [restaurantsData, setRestaurantsData] = useState([])
  const [city, setCity] = useState('San Francisco')
  const getRestaurantsFromYelp = () => {
    const yelpUrl = `https://api.yelp.com/v3/businesses/search?term=restaurants&location=${city}`

    return Axios.get(yelpUrl, {
      headers: { Authorization: `Bearer ${YELP_API_KEY}` },
    }).then((res) => setRestaurantsData(res.data.businesses))
  }

  useEffect(() => {
    getRestaurantsFromYelp().catch((err) => console.log('error'))
  }, [city])

  return (
    <SafeAreaView
      style={{
        backgroundColor: '#eee',
        flex: 1,
        marginTop: StatusBar.currentHeight,
      }}
    >
      <View style={{ backgroundColor: 'white', padding: 15 }}>
        <HeaderTabs />
        <SearchBar cityHandler={setCity} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Categories />
        <RestaurantItems restaurants={restaurantsData} />
      </ScrollView>
    </SafeAreaView>
  )
}
