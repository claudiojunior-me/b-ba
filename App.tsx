import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import AppProvider, { useAppState } from './contexts/app.context'
import Home from './pages/Home'

export default function App() {
    return (
        <AppProvider>
            <Home />
        </AppProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})
