import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Movie } from '../../../app/models/movie';
import MovieDetails from '../details/MovieDetails';
import MovieForm from '../form/MovieForm';
import MovieList from './MovieList';

interface Props {
    movies: Movie[];
    searchInput: string;
    selectedMovie: Movie | undefined;
    selectMovie: (id: string) => void;
    cancelSelectMovie: () => void;
    editMode: boolean;
    openForm: (id: string) => void;
    closeForm: () => void;
    createOrEdit: (movie: Movie) => void;
    deleteMovie: (id: string) => void;
}

export default function MovieDashboard({ movies, searchInput, selectedMovie, deleteMovie,
    selectMovie, cancelSelectMovie, editMode, openForm, closeForm, createOrEdit }: Props) {
   
    return (
        <Grid>
            <Grid.Column width='10'>

                {movies.length ?
                    <MovieList movies={movies} selectMovie={selectMovie}
                        deleteMovie={deleteMovie} searchInput={searchInput}
                    /> : null }
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedMovie && !editMode &&
                    <MovieDetails movie={selectedMovie}
                        cancelSelectMovie={cancelSelectMovie}
                        openForm={openForm}
                    />}
                {editMode &&
                    <MovieForm closeForm={closeForm} movie={selectedMovie} createOrEdit={createOrEdit} />
                }
            </Grid.Column>
        </Grid>
    )
}