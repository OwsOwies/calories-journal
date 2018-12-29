import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
    barContainer: {
        backgroundColor: 'red',
        borderColor: 'black',
        borderRadius: 2,
        height: 25,
        position: 'relative',
        width: '90%',
    },
    barProgress: {
        backgroundColor: 'blue',
        borderRadius: 2,
        height: 25,
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
        position: 'absolute',
    },
});

export default styles;
