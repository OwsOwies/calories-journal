import EStyleSheet from 'react-native-extended-stylesheet';

const teal = '#39CCCC';
const styles = EStyleSheet.create({
    addProduct: {
        alignItems: 'center',
        backgroundColor: 'blue',
        borderRadius: 30,
        height: 30,
        justifyContent: 'center',
        right: 15,
        width: 30,
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
    container: {
        height: '100%',
        width: '100%',
    },
    fab: {
        alignItems: 'center',
        backgroundColor: 'blue',
        borderRadius: 50,
        bottom: 25,
        height: 50,
        justifyContent: 'center',
        width: 50,
    },
    fab2: {
        alignItems: 'center',
        backgroundColor: 'blue',
        borderRadius: 50,
        bottom: 85,
        height: 50,
        justifyContent: 'center',
        width: 50,
    },
    icon: {
        alignSelf: 'center',
        color: 'white',
    },
    meal: {
        marginTop: 10,
        alignItems: 'center',
        backgroundColor: 'white',
        flexDirection: 'row',
        height: 45,
        width: '95%',
        justifyContent: 'space-between',
        marginBottom: 10,
        marginLeft: 5,
        paddingLeft: 15,
        paddingRight: 20,
        position: 'relative',
    },
    btn: {
        color: '#0074D9',
    },
    btnTxt: {
        paddingLeft: 20,
        paddingRight: 20,
        color: 'white',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        borderColor: '#c5c6c9',
        borderTopWidth: 1,
        borderRadius: 1,
    },
});

export default styles;
