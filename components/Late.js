import React, { Component } from 'react'
import { View, Text } from 'react-native'

export default class Late extends Component {
    constructor(props){
        super(props);
        this.state = {
            data:''
        }
    }

    componentDidMount(){
        const test = this.props.navigation.getParam('test', 'some default value');
        this.setState({data:test});
    }
    
    render() {
    
        return (
            <View>
                <Text>{this.state.data}</Text>
            </View>
        )
    }
}
