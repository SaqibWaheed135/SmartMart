import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Navigation from '@navigation/Navigation'
import { Provider } from 'react-redux'
import { store } from '@store/store'


const App = () => {
  return (
      <>
        <Navigation />
      </>
  )
}

export default App

const styles = StyleSheet.create({})