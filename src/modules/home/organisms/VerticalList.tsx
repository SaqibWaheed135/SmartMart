import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import { FONTS, screenWidth } from '@utils/Constants'
import { RFValue } from 'react-native-responsive-fontsize'

const VerticalList:FC<{data:any}> = ({data}) => {
  return (
    <View style={styles.container}>
      {/* <View style={[styles.absoluteView,{backgroundColor:data?.bgColor}]}></View> */}
      {/* <Text style={styles.headingText}>{data?.title}</Text> */}
    </View>
  )
}

export default VerticalList

const styles = StyleSheet.create({
    container:{
        padding:10,
        marginTop:10

    },

    absoluteView:{
        width:screenWidth,
        height:180,
        position:'absolute',
        top:0,
        zIndex:-1

    },

    headingText:{
        fontSize:RFValue(16),
        fontFamily:FONTS.heading,
        color:'#222'
    }
})