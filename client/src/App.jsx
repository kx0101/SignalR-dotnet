import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import WaitingRoom from './components/WaitingRoom';
import ChatRoom from './components/ChatRoom';
import { useState } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';

function App() {
    const [connection, setConnection] = useState(null);
    const [messages, setMessages] = useState([]);

    const joinChatRoom = async (username, chatroom) => {
        try {
            const connection = new HubConnectionBuilder()
                .withUrl('http://localhost:5210/chat')
                .build();

            connection.on('JoinSpecificChatRoom', message => {
                setMessages(messages => [...messages, { message }]);
            });

            connection.on('ReceiveSpecificMessage', (username, message) => {
                setMessages(messages => [...messages, { username, message }]);
            });

            await connection.start();

            await connection.invoke('JoinSpecificChatRoom', { username, chatroom });

            setConnection(connection);
        } catch (error) {
            console.log(error);
        }
    };

    const sendMessage = async (message) => {
        try {
            await connection.invoke('SendMessage', message);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <main>
                <Container>
                    <Row class="px-5 my-5">
                        <Col sm='12'>
                            <h1 className='font-weight-light'>Chat App</h1>
                        </Col>
                    </Row>

                    {!connection ? (
                        <WaitingRoom
                            joinChatRoom={joinChatRoom}
                        />
                    ) : (
                        <ChatRoom messages={messages} sendMessage={sendMessage} />
                    )}

                </Container>
            </main>
        </div>
    )
}

export default App
