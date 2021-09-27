import React, { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

export default function HeaderTabs({ activeTab, setActiveTab }) {
  return (
    <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
      <HeaderButton
        text="Delivery"
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <HeaderButton
        text="Pickup"
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </View>
  )
}

const HeaderButton = ({ text, activeTab, setActiveTab }) => (
  <TouchableOpacity
    style={{
      backgroundColor: activeTab === text ? 'black' : 'white',
      paddingVertical: 3,
      paddingHorizontal: 16,
      borderRadius: 30,
    }}
    onPress={() => setActiveTab(text)}
  >
    <Text
      style={{
        color: activeTab === text ? 'white' : 'black',
        fontSize: 15,
        fontWeight: '700',
      }}
    >
      {text}
    </Text>
  </TouchableOpacity>
)
