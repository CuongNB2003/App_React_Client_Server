import { StyleSheet, Text, View, FlatList, Dimensions, TextInput, TouchableOpacity, Image, ScrollView, RefreshControl } from 'react-native'
import React, { useState } from 'react'
import ItemTinTuc from '../../component/ItemTinTuc';
import { url_api_listSP, url_api_listTL } from '../../data/api';




const windownWidth = Dimensions.get('window').width;
const HomeScreen = (props) => {
    const [isLoading, setIsLoading] = useState(false)
    const [status, setStatus] = useState('For you')
    const [data, setData] = useState([])
    const [m_Data, setM_Data] = useState([])
    const [categories, setCategories] = useState([])
    const setStatusFilter = status => {
        setStatus(status)
    }

    const getData = async () => {
        fetch(url_api_listSP)
            .then(async (res) => {
                const posts = await res.json()
                setData(posts.data)
                setM_Data(posts.data)
                setIsLoading(false)
            })
            .catch(err => {
                console.log("LỖi ở SP " + err);
            })
    }

    const getCategory = () => {
        fetch(url_api_listTL)
            .then(async (res) => {
                const categories = await res.json()
                setCategories(categories.data)

            })
    }

    React.useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            getCategory()
            getData()
            setIsLoading(true)
        })

        return unsubscribe
    }, [props.navigation])

    return (
        <View style={styles.container}>
            <View style={{
                borderRadius: 10, width: windownWidth - 20, height: 45,
                marginTop: 20, backgroundColor: '#ffff', flexDirection: 'row', alignItems: 'center',
                marginRight: 10,
            }}>
                <TextInput placeholder='nhập từ khóa cần tìm'
                    style={{ height: '100%', flex: 1, marginLeft: 20, fontSize: 18 }}
                    autoCapitalize={false} />
                <TouchableOpacity style={{
                    height: '100%', aspectRatio: 1,
                    justifyContent: 'center', alignItems: 'center'
                }}>
                    <Image source={require('../../assets/search.png')} resizeMode='stretch'
                        style={{ width: 30, height: 30, marginRight: 10 }} />
                </TouchableOpacity>
            </View>

            <View style={styles.thanhngang}></View>

            <View style={styles.listTab}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    {
                        categories.map(item => (
                            <TouchableOpacity style={[styles.btnTab, status === item.name && styles.btnTabActive]}
                                onPress={() => {
                                    setStatusFilter(item.name)
                                    setM_Data(data.filter((m_item) => m_item.id_theloai == item._id).map((item) => (item)))
                                }}>
                                <Text style={[styles.textTab, status === item.name && styles.textActive]}>{item.name}</Text>
                            </TouchableOpacity>
                        ))
                    }
                </ScrollView>
            </View>
            <FlatList
                data={m_Data}
                renderItem={({ item, index }) =>
                    <ItemTinTuc key={index} name={item.name} price={item.price} image={item.image} category={item.id_theloai.name} desc={item.desc} />
                }
                keyExtractor={(item, index) => index.toString()}
                refreshControl={
                    <RefreshControl refreshing={isLoading}
                        onRefresh={() => {
                            setIsLoading(true)
                            getData()
                        }} />
                } />
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginStart: 10,
        marginEnd: 10,
        flexDirection: 'column',
    },
    textTieuDe: {
        marginLeft: 10,
        fontSize: 24,
        fontWeight: 'bold',
        color: '#4D8D6E'
    },
    textND: {
        fontSize: 18,
        color: 'black',
        fontWeight: 'bold',
    },
    thanhngang: {
        height: 1,
        width: '100%',
        backgroundColor: '#707070',
        marginTop: 10,
        marginBottom: 10,
    },
    btnTab: {
        justifyContent: 'center',
        marginHorizontal: 16,
        paddingBottom: 8
    },
    listTab: {
        flexDirection: 'row',
        alignSelf: 'center',
        width: '100%',
    },
    textTab: {
        fontSize: 18,
        color: '#6d6b6b'
    },
})

