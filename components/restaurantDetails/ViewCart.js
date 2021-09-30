import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux'

export default function ViewCart() {
  const items = useSelector((state) => state.cartReducer.selectedItems.items)
  const total = items
    .map((item) => Number(item.price.replace('$', '')))
    .reduce((prev, curr) => prev + curr, 0)

  const totalUsd = '$' + total

  return (
    <>
      {true ? (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            position: 'absolute',
            bottom: 25,
            zIndex: 999,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              width: '100%',
            }}
          >
            <TouchableOpacity
              style={{
                marginTop: 20,
                backgroundColor: 'black',
                flexDirection: 'row',
                justifyContent: 'flex-end',
                padding: 11,
                alignItems: 'center',
                borderRadius: 30,
                width: 250,
                position: 'relative',
              }}
            >
              <View></View>
              <Text style={{ color: 'white', fontSize: 18, marginRight: 25 }}>
                View Cart
              </Text>
              <Text
                style={{
                  color: 'white',
                  fontSize: 18,
                  width: 55,
                }}
              >
                {totalUsd}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
    </>
  )
}
