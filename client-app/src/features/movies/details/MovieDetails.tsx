import React from 'react';
import { Button, Card } from 'semantic-ui-react';
import { Movie } from '../../../app/models/movie';

interface Props {
    movie: Movie;
    cancelSelectMovie: () => void;
    openForm: (id: string) => void;
}

export default function MovieDetails({movie, cancelSelectMovie, openForm}: Props) {
    return (
        <Card fluid>
            <Card.Content>
                <Card.Header>{movie.title}</Card.Header>
                <Card.Meta>
                    <span>{movie.date}</span>
                </Card.Meta>
                <Card.Description>
                    {movie.description}
          </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Button.Group widths='2'>
                  <Button onClick={() => openForm(movie.id) } basic color='blue' content='Edit' />
                  <Button onClick={cancelSelectMovie} basic color='grey' content='Cancel' />
              </Button.Group>
            </Card.Content>
        </Card>
    )
}