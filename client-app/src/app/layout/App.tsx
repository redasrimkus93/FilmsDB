import React, { ChangeEvent, useEffect, useState } from 'react';
import { Container, Input } from 'semantic-ui-react';
import { Movie } from '../models/movie';
import NavBar from './Navbar';
import MovieDashboard from '../../features/movies/dashboard/MovieDashboard';
import { v4 as uuid } from 'uuid';
import agent from '../api/agent';

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    agent.Movies.list().then(response => {
      let movies: Movie[] = [];
      response.forEach(movie => {
        movie.date = movie.date.split('T')[0];
        movies.push(movie);
      })
      setMovies(movies);
    })
  }, [])

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    setSearchInput(event.target.value);
  }

  function handleSelectMovie(id: string) {
    setSelectedMovie(movies.find(x => x.id === id));
  }

  function handleCancelSelectMovie() {
    setSelectedMovie(undefined);
  }

  function handleFormOpen(id?: string) {
    id ? handleSelectMovie(id) : handleCancelSelectMovie();
    setEditMode(true);
  }

  function handleFormClose() {
    setEditMode(false);
  }

  function handleCreateOrEditActivity(movie: Movie) {
    if (movie.id) {
      agent.Movies.update(movie).then(() => {
        setMovies([...movies.filter(x => x.id !== movie.id), movie]);
        setSelectedMovie(movie);
        setEditMode(false);
      })
    } else {
      movie.id = uuid();
      agent.Movies.create(movie).then(() => {
        setMovies([...movies, movie]);
        setSelectedMovie(movie);
        setEditMode(false);
      })
    }
  }

  function handleDeleteMovie(id: string) {
    agent.Movies.delete(id).then(() => {
      setMovies([...movies.filter(x => x.id !== id)])

    })
  }

  return (
    <>
      <NavBar openForm={handleFormOpen} />
      <Container style={{ marginTop: '4em' }}>
        <Input style={{ marginBottom: '2em' }} placeholder='Search' onChange={handleInputChange} >
        </Input>
        <MovieDashboard movies={movies}
          searchInput={searchInput}
          selectedMovie={selectedMovie}
          selectMovie={handleSelectMovie}
          cancelSelectMovie={handleCancelSelectMovie}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateOrEditActivity}
          deleteMovie={handleDeleteMovie}
        />
      </Container>
    </>
  );
}

export default App;
