import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
    button: {
        alignContent: 'center',
        justifyContent: 'center',
        margin: 5,
        width: '97.5%',
    },
    content: {
        alignSelf: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        height: 200,
        justifyContent: 'space-between',
        width: '100%',
    },
    title: {
        alignSelf: 'center',
    },
});

export default styles;
