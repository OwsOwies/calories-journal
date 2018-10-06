import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
    button: {
        alignContent: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    cell: {
        height: 30,
        marginTop: 10,
        textAlign: 'center',
    },
    container: {
        backgroundColor: 'white',
        height: '100%',
        justifyContent: 'space-between',
        width: '100%',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    text: {
        alignSelf: 'center',
    },
});

export default styles;
