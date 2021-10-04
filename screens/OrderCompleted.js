import React, { useEffect, useState } from 'react'
import { StatusBar, View } from 'react-native'
import { SafeAreaView } from 'react-native'
import { Text } from 'react-native'
import { useSelector } from 'react-redux'
import LottieView from 'lottie-react-native'
import MenuItems from '../components/restaurantDetails/MenuItems'
import { app } from '../firebase'
import 'firebase/firestore'
import { ScrollView } from 'react-native'

export default function OrderCompleted() {
  const [lastOrder, setLastOrder] = useState({ items: [] })
  const { items, restaurantName } = useSelector(
    (state) => state.cartReducer.selectedItems
  )
  const total = items
    .map((item) => Number(item.price.replace('$', '')))
    .reduce((prev, curr) => prev + curr, 0)

  const totalUsd = '$' + total

  useEffect(() => {
    const db = app.firestore()
    const unsubscribe = db
      .collection('orders')
      .orderBy('createdAt', 'desc')
      .limit(1)
      .onSnapshot((snapshot) =>
        snapshot.docs.map((doc) => {
          setLastOrder(doc.data())
        })
      )
    return () => unsubscribe()
  }, [])

  return (
    <SafeAreaView
      style={{
        backgroundColor: 'white',
        flex: 1,
        marginTop: StatusBar.currentHeight,
      }}
    >
      <View style={{ margin: 15, alignItems: 'center', height: '100%' }}>
        <LottieView
          style={{ height: 100, alignSelf: 'center', marginBottom: 30 }}
          source={require('../assets/animations/check-mark.json')}
          autoPlay
          speed={0.8}
          loop={false}
        />
        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
          Your order at {restaurantName} has been placed for {totalUsd}
        </Text>
        <ScrollView>
          <MenuItems foods={lastOrder.items} hideCheckbox={true} />
          <LottieView
            style={{ height: 200, alignSelf: 'center' }}
            source={require('../assets/animations/cooking.json')}
            autoPlay
            speed={0.5}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}
