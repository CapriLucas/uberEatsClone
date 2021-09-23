import React from 'react'
import { SafeAreaView, StatusBar, View } from 'react-native'
import HeaderTabs from '../components/HeaderTabs'

export default function Home() {
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
        <SearchBar />
      </View>
    </SafeAreaView>
  )
}
