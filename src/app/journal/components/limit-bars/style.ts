import EStyleSheet from 'react-native-extended-stylesheet';

const barHeight = 20;

const blue = 'green';
const navy = 'grey';

const styles = EStyleSheet.create({
    descTxt: {
        width: 110,
        color: 'black',
        lineHeight: 20,
        fontWeight: 'bold'
    },
    barContainer: {
        backgroundColor: navy,
        borderColor: 'black',
        borderRadius: 5,
        height: barHeight,
        position: 'relative',
        width: '70%',
    },
    barProgress: {
        backgroundColor: blue,
        borderRadius: 5,
        height: barHeight,
        left: 0,
        position: 'absolute',
        top: 0,
    },
    row: {
        alignSelf: 'stretch',
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 5,
    },
    text: {
        alignSelf: 'center',   
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        lineHeight: 20,
    },
});

export default styles;
