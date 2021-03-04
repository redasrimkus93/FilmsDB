import axios, { AxiosResponse } from 'axios';
import { Movie } from '../models/movie';

axios.defaults.baseURL = 'http://localhost:5000/api'

const responseBody = <T> (response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T> (url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T> (url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    delete: <T> (url: string) => axios.delete<T>(url).then(responseBody),
}

const Movies = {
    list: () => requests.get<Movie[]>('/movies'),
    details: (id:string) => requests.get<Movie>(`/movies/${id}`),
    create: (movie:Movie) => requests.post<void>('/movies', movie),
    update: (movie:Movie) => requests.put<void>(`/movies/${movie.id}`, movie),
    delete: (id:string) => requests.delete<void>(`/movies/${id}`)

}

const agent = {
    Movies
}

export default agent;
