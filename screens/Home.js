import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, StatusBar, View } from 'react-native'
import { Divider } from 'react-native-elements/dist/divider/Divider'
import BottomTabs from '../components/BottomTabs'
import Categories from '../components/Categories'
import HeaderTabs from '../components/HeaderTabs'
import RestaurantItems from '../components/RestaurantItems'
import SearchBar from '../components/SearchBar'

const YELP_API_KEY =
export default function Home() {
  const [restaurantsData, setRestaurantsData] = useState([])
  const [city, setCity] = useState('San Francisco')
  const [activeTab, setActiveTab] = useState('Delivery')

  const getRestaurantsFromYelp = () => {
    const yelpUrl = `https://api.yelp.com/v3/businesses/search?term=restaurants&location=${city}`

    return Axios.get(yelpUrl, {
      headers: { Authorization: `Bearer ${YELP_API_KEY}` },
    })
      .then((res) => res.data.businesses)
      .then((businesses) =>
        setRestaurantsData(
          businesses.filter((business) =>
            business.transactions.includes(activeTab.toLowerCase())
          )
        )
      )
  }

  useEffect(() => {
    getRestaurantsFromYelp().catch((err) => console.log('error'))
  }, [city, activeTab])

  return (
    <SafeAreaView
      style={{
        backgroundColor: '#eee',
        flex: 1,
        marginTop: StatusBar.currentHeight,
      }}
    >
      <View style={{ backgroundColor: 'white', padding: 15 }}>
        <HeaderTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <SearchBar cityHandler={setCity} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Categories />
        <RestaurantItems restaurants={restaurantsData} />
      </ScrollView>
      <Divider width={1} />
      <BottomTabs />
    </SafeAreaView>
  )
}
