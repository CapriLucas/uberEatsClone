import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { View, Text, TouchableOpacity, Modal } from 'react-native'
import { useSelector } from 'react-redux'
import OrderItem from './OrderItem'
import { app } from '../../firebase'
import 'firebase/firestore'
import LottieView from 'lottie-react-native'

export default function ViewCart({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false)
  const [loading, setLoading] = useState(false)

  const { items, restaurantName } = useSelector(
    (state) => state.cartReducer.selectedItems
  )
  const total = items
    .map((item) => Number(item.price.replace('$', '')))
    .reduce((prev, curr) => prev + curr, 0)

  const totalUsd = '$' + total

  const addOrderToFireBase = () => {
    const db = app.firestore()
    setLoading(true)
    db.collection('orders')
      .add({
        items,
        restaurantName,
        createdAt: new Date().toISOString(),
      })
      .then(() => {
        setLoading(false)
        navigation.navigate('OrderCompleted')
      })
  }

  const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(0,0,0,0.7)',
    },
    modalCheckoutContainer: {
      backgroundColor: 'white',
      padding: 16,
      height: 400,
      borderWidth: 1,
    },
    restaurantName: {
      textAlign: 'center',
      fontWeight: '700',
      fontSize: 18,
      marginBottom: 10,
    },

    subtotalContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 15,
    },

    subtotalText: {
      textAlign: 'left',
      fontWeight: '700',
      fontSize: 15,
      marginBottom: 10,
    },
  })

  const checkoutModalContent = () => {
    return (
      <>
        <View style={styles.modalContainer}>
          <View style={styles.modalCheckoutContainer}>
            <Text style={styles.restaurantName}>{restaurantName}</Text>
            {items.map((item, index) => (
              <OrderItem key={index} item={item} />
            ))}
            <View style={styles.subtotalContainer}>
              <Text style={styles.subtotalText}>Subtotal</Text>
              <Text>{totalUsd}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <TouchableOpacity
                style={{
                  marginTop: 20,
                  backgroundColor: 'black',
                  alignItems: 'center',
                  padding: 10,
                  borderRadius: 30,
                  width: 250,
                  position: 'relative',
                }}
                onPress={() => {
                  addOrderToFireBase()
                  setModalVisible(false)
                }}
              >
                <Text style={{ color: 'white', fontSize: 16 }}>Checkout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </>
    )
  }

  return (
    <>
      <Modal
        animationType="slide"
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        {checkoutModalContent()}
      </Modal>
      {total ? (
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
              onPress={() => setModalVisible(true)}
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
      {loading && (
        <View
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: 'black',
            position: 'absolute',
            opacity: 0.6,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <LottieView
            style={{ height: 200 }}
            source={require('../../assets/animations/scanner.json')}
            autoPlay
            speed={3}
          />
        </View>
      )}
    </>
  )
}
