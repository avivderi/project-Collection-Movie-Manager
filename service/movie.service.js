// import { readFileMovies, writeFileMovies } from "./file.service.js";
import readline from 'readline-sync';

export function showAllMovies(fileContent) {
    let movies = []
    for (let dic of fileContent) {
        movies.push(dic.title)
    }
    return movies
}

export function showById(fileContent, id) {
    const result = fileContent.find(movie => movie.id === id)
    if (result) return result
    return "id not found"
}

export function generateNextId(fileContent) {
    if (fileContent.length === 0) return 1
        const ids = fileContent.map(movie => movie.id)
        const maxId = Math.max(...ids)
        return maxId + 1
}


export function createNewMovie(fileContent) {
    const title = readline.question("Type the movie name: ").toLowerCase().trim()
    const genre = readline.question("Type the genre: ").toLowerCase().trim()
    const year = readline.questionInt("Type the year of release: ")
    const rating = readline.questionFloat("Type the movie rating: ")
    const id = generateNextId(fileContent)
    return {id, title, genre, year, rating}
}

export function deleteMovie(fileContent, id) {
    const deleted = fileContent.filter(movie => movie.id !== id)
    if (deleted.length === fileContent.length) {
        console.log("id not found")
    } console.log("the movir is deleted")
    return deleted
}

export function updateRate(fileContent, id, rating) {
    for (let movie of fileContent) {
        if (movie.id === id) {
            movie.rating = rating
            console.log("rating is update")
            return fileContent
        }
    }  console.log("id not found")
    return fileContent
}

export function searchByName(fileContent, str) {
    const cleanStr = str.toLowerCase().trim()
    const results = fileContent.filter(movie => {
        return movie.title.toLowerCase().includes(cleanStr);
    })
    if (results.length === 0) {
        return console.log("No results")
    } return results
}

export function sortByGenre(fileContent, genre) {
    const result = fileContent.filter(movie => movie.genre === genre)
    if (result.length === 0) console.log("genre not found")
        return result
}

export function showStatistics(fileContent) {
    if (fileContent.length === 0) return "No movies in system"
    const sumMovies = fileContent.length
    const totalRating = fileContent.reduce((sum, movie) => sum + movie.rating, 0)
    const average = (totalRating / sumMovies).toFixed(1)
    const high = fileContent.reduce((maxMovie, currentMovie) => {
        return currentMovie.rating > maxMovie.rating ? currentMovie : maxMovie;
    })
    return {"Number of films": sumMovies,
        "Average rating": average,
        "Highest rated movie": high}
}