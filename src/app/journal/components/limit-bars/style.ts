import EStyleSheet from 'react-native-extended-stylesheet';

const barHeight = 40;

const blue = 'green';
const navy = 'grey';

const styles = EStyleSheet.create({
    descTxt: {
        width: 110,
        color: 'black',
        paddingTop: 8,
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
        margin: 10,
    },
    text: {
        alignSelf: 'center',   
        color: 'white',
        fontSize: 17,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 8
    },
});

export default styles;
