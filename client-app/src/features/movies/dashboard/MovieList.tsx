import React from 'react';
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { Movie } from '../../../app/models/movie';

interface Props {
    movies: Movie[];
    searchInput: string;
    selectMovie: (id: string) => void;
    deleteMovie: (id: string) => void;
}
export default function MovieList({ movies, searchInput, selectMovie, deleteMovie }: Props) {

    return (
        <Segment>
            <Item.Group divided>
                {movies.filter(movie => {
                    if (searchInput === "") {
                        return movie;
                    } else if (movie.title.toLowerCase().includes(searchInput.toLowerCase())) {
                        return movie;
                    }
                }).map(movie => (
                    <Item key={movie.id}>
                        <Item.Content>
                            <Item.Header as='a'>
                                {movie.title}
                            </Item.Header>
                            <Item.Meta>{movie.date}</Item.Meta>
                            <Item.Description>
                                <div>{movie.description}</div>
                                <div>{movie.actor}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button onClick={() => selectMovie(movie.id)} floated='right' content='View' color='blue' />
                                <Button onClick={() => deleteMovie(movie.id)} floated='right' content='Delete' color='red' />
                                <Label basic content={movie.category} />
                            </Item.Extra>
                        </Item.Content>

                    </Item>
                ))}
            </Item.Group>
        </Segment>
    
    )
}