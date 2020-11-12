import React, {useState} from 'react';
import Axios from 'axios';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    Alert
} from 'reactstrap';


const AddProblemModal = (props) => {
    const {toggle} = props;
    const [title, setTitle] = useState();
    const [category, setCategory] = useState();
    const [difficulty, setDifficulty] = useState();
    const [description, setDescription] = useState();
    const [confirmation, setConfirmation] = useState(false);
    const [error, setError] = useState(false);
    const handleAddProblem = () => {
        console.log(title, category, difficulty, description);
        if(!title || !category || !difficulty || !description || 
            category === 'Select A Category' || difficulty === 'Select A Difficulty') {
            setError(true);
        }
        else {
            setError(false);
            const newProblem = {
                "title": title,
                "description": description,
                "category": category, 
                "difficulty": difficulty
            };
            Axios.post('/api/problems', newProblem)
                .then(() => setConfirmation(true))
                .catch((err) => console.error(err.msg));
        }
    };

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleCategorySelect = (event) => {
        setCategory(event.target.value);
    };

    const handleDifficultyChange = (event) => {
        setDifficulty(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    }; 

    const confirmJSX = (
        <Alert color="success">
            Problem Added!
        </Alert>
    );

    const errorJSX = (
        <Alert color="danger">
            Please Fill Out All Fields
        </Alert>
    );

    return (
        <Modal isOpen={true} toggle={toggle}>
            {confirmation ? confirmJSX : <></>}
            {error ? errorJSX : <></>}
             <ModalHeader>Add Problem</ModalHeader>
             <ModalBody>
                <Form>
                    <FormGroup>
                        <Label>Title</Label>
                        <Input type="text" name="title" id="title" placeholder="Two Sum" onChange={handleTitleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label>Category</Label>
                        <Input type="select" name="category" id="category" onChange={handleCategorySelect}>
                            <option>Select A Category</option>
                            <option>Two Pointers</option>
                            <option>Depth First Search</option>
                            <option>Breadth First Search</option>
                            <option>String</option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Difficulty</Label>
                        <Input type="select" name="difficulty" id="difficulty" onChange={handleDifficultyChange}>
                            <option>Select A Difficulty</option>
                            <option>Easy</option>
                            <option>Medium</option>
                            <option>Hard</option>
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Description</Label>
                        <Input type="text" name="description" id="descripion" placeholder="Add two numbers to get sum" onChange={handleDescriptionChange}/>
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={toggle}>Cancel</Button>{' '}
                <Button color="primary" onClick={handleAddProblem}>Add Problem</Button>
            </ModalFooter>
        </Modal>
    );
};

export default AddProblemModal;