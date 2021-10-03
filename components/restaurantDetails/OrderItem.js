import React from 'react'
import { View, Text } from 'react-native'

export default function OrderItem({ item }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#999',
      }}
    >
      <Text style={{ fontWeight: '700', fontSize: 16 }}>{item.title}</Text>
      <Text style={{ opacity: 0.7, fontSize: 16 }}>{item.price}</Text>
    </View>
  )
}
