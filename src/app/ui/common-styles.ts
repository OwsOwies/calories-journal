import EStyleSheet from 'react-native-extended-stylesheet';

export const commonStyles = EStyleSheet.create({
    button: {
        alignItems: 'center',
        alignSelf: 'stretch',
        backgroundColor: 'black',
        borderRadius: 35,
        height: 50,
        justifyContent: 'center',
        margin: 15,
        position: 'relative',
    },
    buttonText: {
        color: 'white',
    },
    contentCentered: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    contentSpacedBetween: {
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    displayRow: {
        flexDirection: 'row',
    },
    input: {
        alignSelf: 'stretch',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        margin: 15,
    },
    padding_5: {
        padding: 5,
    },
    stretchSelf: {
        alignSelf: 'stretch',
    },
});
