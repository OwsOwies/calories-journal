import EStyleSheet from 'react-native-extended-stylesheet';

const teal = '#39CCCC';
const styles = EStyleSheet.create({
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginRight: 100,
        marginLeft: 100,
    },
    prodBttn: {
        marginTop: 2,
        marginRight: 20,
        width: '50%',
        justifyContent: 'center',
        borderRadius: 1,
    },
    btnTxt: {
        color: 'white',
    },
    fab: {
        alignItems: 'center',
        backgroundColor: 'blue',
        borderRadius: 50,
        bottom: 25,
        height: 50,
        justifyContent: 'center',
        position: 'absolute',
        right: 15,
        width: 50,
    },
    icon: {
        alignSelf: 'center',
        color: 'white',
    },
    templBttn: {
        marginTop: 2,
        marginLeft: 20,
        width: '50%',
        justifyContent: 'center',
        borderRadius: 1,
    },
    tab: {
        padding: 8,
    },
    commercialBanner: {
        alignItems: 'center',
        alignSelf: 'stretch',
        borderColor: 'black',
        borderWidth: 5,
        bottom: 0,
        height: 100,
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
