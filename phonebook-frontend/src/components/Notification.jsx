/** @format */

const Notification = ({ message, msgType }) => {
    const notificationStyleSuccess = {
        color: 'darkgreen',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    }

    const notificationStyleError = {
        color: 'maroon',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    }

    const notificationStyle =
        msgType === 'success'
            ? notificationStyleSuccess
            : notificationStyleError

    if (message === null || message === '') {
        return null
    }

    return <div style={notificationStyle}>{message}</div>
}

export default Notification
