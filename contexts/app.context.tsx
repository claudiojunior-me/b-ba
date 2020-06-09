import React, { useReducer, useContext, ReactNode, useEffect } from 'react'
import { AsyncStorage } from 'react-native'

export const AppStateContext = React.createContext({ drinkedMl: 0, totalForDay: 2500 })
export const AppDispatchContext = React.createContext({})

const appReducer = (state: any, action: any) => {
    switch (action.type) {
        case 'sum': {
            try {
                const currentDate = new Date().setHours(0, 0, 0, 0)
                AsyncStorage.setItem(currentDate.toString(), (state.drinkedMl + action.value).toString())
            } catch (error) {
                console.error(error)
            }

            return { ...state, drinkedMl: state.drinkedMl + action.value }
        }
        case 'update': {
            return { ...state, drinkedMl: action.drinkedMl }
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`)
        }
    }
}

interface AppProviderInterface {
    children: ReactNode
}

const AppProvider = ({ children }: AppProviderInterface) => {
    const [state, dispatch] = useReducer(appReducer, {
        totalForDay: 2500,
        drinkedMl: 0,
    })

    useEffect(() => {
        const getValueForDay = async () => {
            try {
                const currentDate = new Date().setHours(0, 0, 0, 0)
                const value = await AsyncStorage.getItem(currentDate.toString())

                if (value !== null) {
                    dispatch({ type: 'update', drinkedMl: parseInt(value) })
                } else {
                    dispatch({ type: 'update', drinkedMl: 0 })
                }
            } catch (err) {
                console.error(err)
                dispatch({ type: 'update', drinkedMl: 0 })
            }
        }

        getValueForDay()
    }, [])

    return (
        <AppStateContext.Provider value={state}>
            <AppDispatchContext.Provider value={dispatch}>{children}</AppDispatchContext.Provider>
        </AppStateContext.Provider>
    )
}

function useAppState() {
    const context = useContext(AppStateContext)
    if (context === undefined) {
        throw new Error('useAppState must be used with a AppProvider')
    }
    return context
}

function useAppDispatch() {
    const context = useContext(AppDispatchContext)
    if (context === undefined) {
        throw new Error('useAppDispatch must be used with a AppProvider')
    }
    return context
}

export default AppProvider
export { useAppDispatch, useAppState }
