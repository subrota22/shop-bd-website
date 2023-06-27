import React from 'react';
import  "./Contact.css" ;
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
const Contact = () => {
    return (
        <div className='w-50 mx-auto my-5 text-primary'>
          <h2> This is contact page </h2>  
    <Form className='was-validated' action="https://formsubmit.co/itinfobd24@gmail.com" method="POST">
    <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" name='name' placeholder="Enter your name" required/>
      </Form.Group>


      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" name='email' placeholder="Enter email" required/>
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>


      
      <Form.Group className="mb-3" controlId="formBasicMessage">
        <Form.Label>Message </Form.Label>
        <textarea name="message" placeholder='Enter your message' className='form-control' cols="20" rows="8" required></textarea>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox" >
        <Form.Check type="checkbox" label="Check me out" required/>
      </Form.Group>
      <Button variant="primary" type="submit" className='w-100 py-2'>
        Send message 
      </Button>
    </Form>
        </div>
    );
};

export default Contact;