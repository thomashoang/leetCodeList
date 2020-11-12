import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import {
    Container, 
    ListGroup, 
    ListGroupItem, 
    Button
} from 'reactstrap';
import AddProblemModal from './AddProblemModal';

const LeetCodeList = () => {
    const [problems, setProblems] = useState(null);
    const [displayProblemModal, setDisplayProblemModal] = useState(false);

    useEffect(() => {
        try {
            const getProblems = async () => {
                const problemList = await Axios('/api/problems');
                if(!problemList) throw new Error('Problem with fetching problems from database');
                setProblems(problemList.data);
            };
            getProblems();
        } catch (err) {
            console.error(err.msg);
        }
    }, []);

    const handleProblemModal = () => {
        setDisplayProblemModal(!displayProblemModal);
    };

    return (
        <>
            {displayProblemModal && (
                <AddProblemModal toggle={handleProblemModal} />
            )}
            <Container>
                <Button color="primary" onClick={handleProblemModal}>
                    Add Problem
                </Button>
                <ListGroup>
                    {problems == null ? (
                        <div>Loading...</div>
                    ) : 
                        problems.map(problem => (
                            <ListGroupItem>
                                <div>Problem: {problem.title}</div>
                                <div>Category: {problem.category}</div>
                                <div>Difficulty: {problem.difficulty}</div>
                                <div>Description: {problem.description}</div>
                            </ListGroupItem>
                        ))
                    }
                </ListGroup>
            </Container>
        
        </>
    );
};

export default LeetCodeList;