import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';

const AlertBox = () => {
    const [show, setShow] = useState(true);
    if (show) {
        return (
            <>
                <p>This is the alerts page showing dismissible property</p>
                <Alert show={true} onClose={() => setShow(false)} variant='warning' closeLabel='Close Alert' dismissible
                    fade="false">
                    This is a warning alert <Alert.Link href="#">an example link</Alert.Link>with dismissible check it out!!
                </Alert>
            </>
        )
    }
    return <Button onClick={ () => setShow(true)} >Show Alert Box</Button>
}

export default AlertBox;