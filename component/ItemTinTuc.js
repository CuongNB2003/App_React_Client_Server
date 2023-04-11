import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { url } from '../data/api';


const windownWidth = Dimensions.get('window').width;
const ItemTinTuc = (props) => {
    const { price, name, image, desc, category } = props


    return (
        <View style={styles.container}>
            <View style={styles.phiatren}>
                <Text style={styles.textCategory}>Thể loại: {category}</Text>
            </View>
            <View style={styles.thanhngang}></View>
            <Image source={{ uri: url+image }} style={styles.image} />
            <View style={styles.content}>
                <Text style={styles.textName}>Tên SP:{name}</Text>
                <Text style={styles.textPrice} >Giá: {price} VND</Text>
            </View>
            <View style={styles.thanhngang}></View>
            <Text style={styles.textDesc} numberOfLines={3}>Mô tả: {desc}</Text>
        </View>
    )

}

export default ItemTinTuc

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffff',
        borderRadius: 10,
        elevation: 10,
        flexDirection: 'column',
        marginTop: 10,
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        
    },
    textCategory: {
        marginLeft: 15,
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black'
    },
    content: {
        marginStart: 10,
        width: Dimensions.get('window').width - 50,

    },
    thanhngang: {
        height: 1,
        width: '100%',
        backgroundColor: '#707070',
        marginTop: 10,
        marginBottom: 5,
    },
    phiaduoi: {
        borderRadius: 10,
        width: windownWidth - 60,
        height: 45,
        flexDirection: 'row',
        alignItems: 'center'
    },
    phiatren: {
        borderRadius: 10,
        width: windownWidth - 60,
        height: 40,
        flexDirection: 'row',
        alignItems: 'center'
    },
    textPrice: {
        marginLeft: 10,
        fontSize: 16,
        color: 'red'
    },
    textDesc: {
        fontSize: 18,
        marginLeft: 20,
        marginBottom: 10,
    },
    textName: {
        fontWeight: 'bold',
        fontSize: 18,
        marginLeft: 10,
        marginBottom: 10,
    },


})