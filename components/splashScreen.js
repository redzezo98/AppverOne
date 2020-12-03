import React, { Component } from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';

export default class SplashScreen extends Component {
    render() {
        return (
            <View style={styles.viewStyles}>
                <Image
                    style={styles.logoStyles}
                    source={require('../images/logo.png')}
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    logoStyles: {
        height: 150,
        width: 150,
        marginBottom: 15,
    },
    viewStyles: {
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
        width: Dimensions.get('window').width, //for full screen
        height: Dimensions.get('window').height, //for full screen
    },
});
