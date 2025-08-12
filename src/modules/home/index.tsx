import { View, Text, StyleSheet, Platform } from 'react-native'
import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@store/reduxHook'
import { getHomeContent } from './api/actions'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Animated, { Extrapolate, interpolate, useAnimatedStyle, useSharedValue } from 'react-native-reanimated'
import { screenHeight } from '@utils/Constants'
import MenuHeader from './molecules/MenuHeader'
import SearchBar from './molecules/SearchBar'
import MainList from './templates/MainList'

const Home = () => {
  // const dispatch = useAppDispatch()
  // const { data, loading, error } = useAppSelector(state => state.home)

  // useEffect(() => {
  //   dispatch(getHomeContent(1))
  // }, [dispatch]) // Added dependency array

  const insets=useSafeAreaInsets()

  const scrollYGlobal=useSharedValue(0)

  const moveUpStyle=useAnimatedStyle(()=>{
    const translateY=interpolate(
      scrollYGlobal.value,
      [0,100],
      [1,-100],
      Extrapolate.CLAMP
    )
    return{
      transform:[{translateY:translateY}]
    }
  })

  return (
    <View style={styles.container}>
      <View style={{height:Platform.OS==='android'? insets.top:0}}/>

      <Animated.View style={[moveUpStyle]}>
        <View>
          <MenuHeader scrollY={scrollYGlobal}/>
          <SearchBar/>
        </View>

      </Animated.View>

       <Animated.View style={[moveUpStyle,{height:screenHeight}]}>
         <MainList scrollYGlobal={scrollYGlobal}/>
      </Animated.View>
    </View>
  )
}

export default Home

const styles=StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#fff'
  }
})