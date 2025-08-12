import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { FC, useState } from 'react'
import { screenWidth } from '@utils/Constants'
import FlimSlip from '../molecules/FlimSlip'
import Carousel from 'react-native-reanimated-carousel'
import Dots from '../atoms/Dots'


const AdCarousal: FC<{ data: any }> = ({ data }) => {
    const [active, setActive] = useState(0)

    const baseOptions = {
        vertical: false,
        width: screenWidth,
        height: screenWidth * 0.8,

    }
    return (
        <View>
            <FlimSlip />
            <Carousel
                {...baseOptions}
                loop
                pagingEnabled
                snapEnabled
                autoPlay
                onSnapToItem={(index: any) => setActive(index)}
                data={data.data}
                renderItem={({ item, index}: any) => (
                    <Pressable style={styles.imageContainer}>
                        <Image
                            source={item?.image_uri}
                            style={styles.img}
                            key={index}
                        />

                    </Pressable>
                )}
            />

            {active != null &&
                <View style={styles.dots}>
                    {
                        data?.data?.map((item: any, index: any) => {
                            return (
                                <Dots
                                active={active}
                                index={index}
                                key={index}
                                />
                            )
                        })
                    }

                </View>
            }
        </View>
    )
}

export default AdCarousal

const styles = StyleSheet.create({
    dots: {
        flexDirection: 'row',
        alignSelf: 'center',
        width: 100,
        marginTop: 10,
        justifyContent: 'center'
    },

    imageContainer: {
        width: '100%',
        height: '100%'

    },

    img: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    }
})