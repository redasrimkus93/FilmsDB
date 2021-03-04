import React, { ChangeEvent, useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { Movie } from '../../../app/models/movie';

interface Props {
    movie: Movie | undefined;
    closeForm: () => void;
    createOrEdit: (movie: Movie) => void;
}

export default function MovieForm({ movie: selectedMovie, closeForm, createOrEdit }: Props) {

    const initialState = selectedMovie ?? {
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        actor: ''
    }

    const [movie, setMovie] = useState(initialState);

    const formValidation = !movie.title?.length ||
        !movie.category?.length ||
        !movie.date?.length ||
        !movie.description?.length ||
        !movie.actor?.length;

    function handleSubmit() {
        createOrEdit(movie)
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;
        setMovie({ ...movie, [name]: value })
    }

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Title' value={movie.title} name='title' onChange={handleInputChange} />
                <Form.TextArea placeholder='Description' value={movie.description} name='description' onChange={handleInputChange} />
                <Form.Input placeholder='Category' value={movie.category} name='category' onChange={handleInputChange} />
                <Form.Input type='date' placeholder='Date' value={movie.date} name='date' onChange={handleInputChange} />
                <Form.Input placeholder='Actor' value={movie.actor} name='actor' onChange={handleInputChange} />
                <Button floated='right' disabled={formValidation} positive type='submit' content='Submit' />
                <Button onClick={closeForm} floated='right' type='button' content='Cancel' />

            </Form>
        </Segment>
    )
}