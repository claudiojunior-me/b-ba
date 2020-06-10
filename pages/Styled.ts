import styled from 'styled-components/native'

export const Container = styled.View`
    background-color: #42406d;
    flex: 1;
    padding: 45px 16px 16px 16px;
    justify-content: center;
    flex-direction: row;
`

export const ProgressBarContainer = styled.View`
    width: 30%;
    height: 100%;
    align-items: center;
    flex-direction: column;
`

export const ProgressBarText = styled.Text`
    color: #fdfdff;
    font-size: 42px;
    font-weight: bold;
`

export const ProgressBarElement = styled.View`
    width: 100px;
    flex: 1;
    justify-content: center;
    align-items: center;
    padding: 5px;
`
export const ProgressBarBackground = styled.View`
    background-color: rgba(253, 253, 255, 0.2);
    height: 100%;
    width: 40px;
    border-radius: 30px;
    border: 2px solid rgba(255, 255, 255, 0.3);
`

interface ProgressBarIndicatorProps {
    value: number
}
export const ProgressBarIndicator = styled.View`
    background-color: #7ca5e6;
    height: ${(props: ProgressBarIndicatorProps) => (props.value < 100 ? `${props.value}%` : '100%')};
    width: 40px;
    position: absolute;
    bottom: 5px;
    border-radius: 30px;
    border: 2px solid transparent;
`

export const IndicatorsLine = styled.View`
    flex-direction: row;
    padding: 0 8px 0 8px;
    margin-bottom: 16px;
    height: 48px;
    align-items: flex-end;
    justify-content: flex-end;
`

export const IndicatorText1 = styled.Text`
    color: #fdfdff;
    opacity: 0.7;
    margin-right: 5px;
    font-size: 26px;
`

export const IndicatorText2 = styled.Text`
    color: #fdfdff;
    margin-left: 5px;
    font-size: 30px;
    font-weight: bold;
`

interface ButtonProps {
    size: number
    alignEnd?: boolean
}

export const ButtonAddContainer = styled.TouchableHighlight`
    background-color: white;
    height: ${(props: ButtonProps) => `${props.size}px` || '150px'};
    width: ${(props: ButtonProps) => `${props.size}px` || '150px'};
    border-radius: ${(props: ButtonProps) => `${props.size / 2}px` || '75px'};
    align-self: ${(props: ButtonProps) => (props.alignEnd ? 'flex-end' : 'flex-start')};
`

export const ButtonAdd = styled.View`
    background-color: rgba(107, 136, 195, 0.6);
    height: ${(props: ButtonProps) => `${props.size}px` || '150px'};
    width: ${(props: ButtonProps) => `${props.size}px` || '150px'};
    border-radius: ${(props: ButtonProps) => `${props.size / 2}px` || '75px'};
`
