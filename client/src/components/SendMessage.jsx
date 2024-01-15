import { useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';

const SendMessage = ({ sendMessage }) => {
    const [message, setMessage] = useState('');

    return (
        <Form
            onSubmit={e => {
                e.preventDefault();
                sendMessage(message);
                setMessage('');
            }}
        >
            <InputGroup className="mb-3">
                <InputGroup.Text>Chat</InputGroup.Text>
                <Form.Control
                    type="text"
                    placeholder="Message"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                />

                <Button
                    type="submit"
                    variant="outline-secondary"
                    id="button-addon2"
                    disabled={!message}
                >
                    Send
                </Button>
            </InputGroup>

        </Form>
    )
};

export default SendMessage;
