import { ActivityIndicator, FlatList, NativeScrollEvent, NativeSyntheticEvent, Platform, RefreshControl, StyleSheet, Text, View } from 'react-native'
import React, { FC, useRef, useState } from 'react'
import { dynamicDashboardData as fullData } from '@utils/db'
import { setData } from '../api/slice'
import AdCarousal from '../organisms/AdCarousal'
import Categories from '../organisms/Categories'
import Sponsor from '../organisms/Sponsor'
import HorizontalList from '../organisms/HorizontalList'
import AnimatedList from '../organisms/AnimatedList'
import VerticalList from '../organisms/VerticalList'

const PAGE_SIZE = 4

const sectionComponents: { [key: string]: React.ComponentType<any> } = {
    ad_carousal: AdCarousal,
    categories: Categories,
    sponser: Sponsor,
    vertical_list: VerticalList,
   
}

const MainList: FC<{ scrollYGlobal: any }> = ({ scrollYGlobal }) => {

    const [isRefreshing, setIsRefreshing] = useState(false);
    const [data, setData] = useState(fullData.slice(0, PAGE_SIZE)); // Fixed: changed isData to setData
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    const prevScrollY = useRef(0)
    const flatlistRef = useRef<FlatList>(null)

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const currentScrollY = event?.nativeEvent?.contentOffset.y
        scrollYGlobal.value = currentScrollY;
        prevScrollY.current = currentScrollY;
    }

    const handleRefresh = () => {
        setIsRefreshing(true)
        setTimeout(() => {
            setCurrentPage(1)
            setData(fullData?.slice(0, PAGE_SIZE))
            setIsRefreshing(false)
        }, 3000)
    }

    const handleLoadMore = () => {
        if (isLoadingMore) return;
        if (data?.length >= fullData?.length) return;

        setIsLoadingMore(true)
        setTimeout(() => {
            const nextPage = currentPage + 1;
            const newItems = fullData?.slice(0, nextPage * PAGE_SIZE)
            setData(newItems)
            setCurrentPage(nextPage)
            setIsLoadingMore(false)
        }, 4000)
    }

    const renderItem = ({ item, index }: { item: any; index: number }) => {
        const SectionComponent = sectionComponents[item?.type]
        
        // if (!SectionComponent) {
        //     // Return a fallback component or null if component is not found
        //     console.warn(`Component for type "${item?.type}" not found`)
        //     return (
        //         <View style={{ padding: 10 }}>
        //             <Text>Unknown component type: {item?.type}</Text>
        //         </View>
        //     )
        // }
        
        // Make sure to pass a unique key and proper props
        return SectionComponent ? <SectionComponent data={item}/> :null
    }

    return (
        <FlatList
            data={data}
            refreshControl={
                <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
            }
            overScrollMode='always'
            onScroll={handleScroll}
            ref={flatlistRef}
            scrollEventThrottle={16}
            renderItem={renderItem}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
            nestedScrollEnabled
            contentContainerStyle={{ paddingBottom: Platform.OS === 'android' ? 200 : 300 }}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => `${item?.id || item?.type || 'item'}-${index}`} // Better key extractor
            ListFooterComponent={isLoadingMore ? (
                <ActivityIndicator size='small' color='#888' style={{ alignSelf: 'center', margin: 15 }} />
            ) : null}
        />
    )
}

export default MainList

const styles = StyleSheet.create({})