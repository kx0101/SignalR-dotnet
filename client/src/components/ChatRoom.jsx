import { Row, Col } from 'react-bootstrap';
import MessageContainer from './MessageContainer';
import SendMessage from './SendMessage';

const ChatRoom = ({ messages, sendMessage }) => {
    return (
        <>
            <Row className="px-5 py-5">
                <Col sm={10}>
                    <h2>ChatRoom</h2>
                </Col>
                <Col>

                </Col>
            </Row>

            <Row className="px-5 py-5">
                <Col sm={12}>
                    <MessageContainer messages={messages} />
                </Col>
                <Col sm={12}>
                    <SendMessage sendMessage={sendMessage} />
                </Col>
            </Row>
        </>
    )
}

export default ChatRoom;
