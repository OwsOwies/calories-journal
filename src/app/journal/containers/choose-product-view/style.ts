import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    commercialBanner: {
        alignItems: 'center',
        alignSelf: 'stretch',
        borderColor: 'black',
        borderWidth: 5,
        bottom: 0,
        height: 60,
        justifyContent: 'center',
        position: 'absolute',
        width: '100%',
    },
    content: {
        alignSelf: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        height: '94%',
        justifyContent: 'space-between',
        width: '100%',
    },
    product: {
        height: '100%',
        width: '100%',
    },
});

export default styles;
