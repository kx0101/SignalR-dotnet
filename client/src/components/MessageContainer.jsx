const MessageContainer = ({ messages }) => {
    return (
        <div>
            {messages && messages.length > 0 ? (
                <table striped bordered={true}>
                    <tbody>
                        {messages.map((message, index) => (
                            <tr key={index}>
                                <td>
                                    {message.username && (
                                        <span>{message.username} - </span>
                                    )}
                                    {message.message}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No messages available.</p>
            )}
        </div>
    );
}

export default MessageContainer;
