import React, { useContext } from 'react'
import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity } from 'react-native'
import { EvilIcons } from '@expo/vector-icons'

import { Context } from '../context/BlogContext'

const ShowScreen = ({ navigation }) => {
  const id = navigation.getParam('id')
  const { state } = useContext(Context)
  const blogPost = state.find(b => b.id === id)

  return <View>
    <Text>{blogPost.title}</Text>
    <Text>{blogPost.content}</Text>
  </View>
}

ShowScreen.navigationOptions = ({ navigation }) => {
  return {
    headerRight: () => <TouchableOpacity onPress={() => navigation.navigate('Edit', {id: navigation.getParam('id')})}>
      <EvilIcons name="pencil" size={35} />
    </TouchableOpacity>
  }
}

const styles = StyleSheet.create({})

export default ShowScreen
