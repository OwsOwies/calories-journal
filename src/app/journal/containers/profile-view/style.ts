import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
    labelStyle: {
        width: 150
    },
    inputStyle: {
        color: 'black'
    },
    addProduct: {
        alignItems: 'center',
        backgroundColor: 'blue',
        borderRadius: 30,
        height: 30,
        justifyContent: 'center',
        right: 15,
        width: 30,
    },
    label: {
        color: 'blue'
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
        bottom: 75,
        height: 50,
        justifyContent: 'center',
        position: 'absolute',
        right: 15,
        width: 50,
    },
    fab2: {
        alignItems: 'center',
        backgroundColor: 'blue',
        borderRadius: 50,
        bottom: 135,
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
    btn: {
        marginTop: 20,
        alignSelf: 'center',
        width: '60%',
        justifyContent: 'center'
    },
    btnText: {
        color: 'white'
    },
    meal: {
        alignItems: 'center',
        backgroundColor: 'white',
        flexDirection: 'row',
        height: 45,
        justifyContent: 'space-between',
        marginBottom: 10,
        marginLeft: 5,
        marginRight: 5,
        paddingLeft: 15,
        position: 'relative',
        width: '100%',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
});

export default styles;
