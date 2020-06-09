import React, { useEffect, useState } from 'react'
import { Headline, Title, ProgressBar, Colors, FAB, Button } from 'react-native-paper'
import { StyleSheet, View, Platform, Vibration, Text } from 'react-native'
import { Notifications } from 'expo'
import * as Permissions from 'expo-permissions'
import Constants from 'expo-constants'
import { useAppState, useAppDispatch } from '../contexts/app.context'

const phrases = ['Ta na hora de beber mais água', 'Já se hidratou hoje?', 'Que tal mais um copo de água']

interface Notification {
    data: any
    origin: any
}

export default function Home() {
    const { drinkedMl, totalForDay } = useAppState()
    const appDispatch = useAppDispatch()
    const [expoPushToken, setExpoPushToken] = useState<String>('')
    const [notification, setNotification] = useState<Notification | undefined>(undefined)

    const registerForPushNotificationsAsync = async () => {
        if (Constants.isDevice) {
            const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS)
            let finalStatus = existingStatus
            if (existingStatus !== 'granted') {
                const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
                finalStatus = status
            }
            if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notification!')
                return
            }
            const token = await Notifications.getExpoPushTokenAsync()
            console.log(token)
            setExpoPushToken(token)
        } else {
            alert('Must use physical device for Push Notifications')
        }

        if (Platform.OS === 'android') {
            Notifications.createChannelAndroidAsync('default', {
                name: 'default',
                sound: true,
                priority: 'max',
                vibrate: [0, 250, 250, 250],
            })
        }
    }

    const _handleNotification = (notification) => {
        Vibration.vibrate([0, 250, 250, 250])
        console.log(notification)
        setNotification(notification)
    }

    useEffect(() => {
        registerForPushNotificationsAsync()
        Notifications.addListener(_handleNotification)
        return () => {}
    })

    return (
        <View style={styles.container}>
            <Headline>
                Olá, hoje você já consumiu <Title>{drinkedMl}mL</Title> de água de um total de{' '}
                <Title>{totalForDay}mL</Title>
            </Headline>
            <ProgressBar
                progress={drinkedMl / totalForDay}
                color={Colors.blue400}
                style={{
                    marginHorizontal: 15,
                    marginVertical: 15,
                }}
            />
            <Button
                uppercase
                onPress={() => {
                    appDispatch({ type: 'sum', value: -100 })
                }}
                color={Colors.blue400}
                mode='outlined'
                disabled={drinkedMl === 0}>
                Remover 100mL
            </Button>
            {notification && notification.data && (
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Text>Origin: {notification.origin}</Text>
                    <Text>Data: {JSON.stringify(notification.data)}</Text>
                </View>
            )}
            <FAB
                style={styles.fab}
                icon='plus'
                label='Adicionar 100mL'
                onPress={() => appDispatch({ type: 'sum', value: 100 })}
                disabled={drinkedMl >= totalForDay}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
    },
    button: {
        flex: 1,
        marginHorizontal: 20,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
})
