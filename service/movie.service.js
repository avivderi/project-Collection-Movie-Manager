import readline from 'readline-sync';
import { validateTitle, validateYear, validateRating } from '../utils/validator.js';

export function showAllMovies(fileContent) {
    let movies = [];
    for (let dic of fileContent) {
        movies.push(dic.title);
    }
    return movies;
}

export function showById(fileContent, id) {
    const result = fileContent.find(movie => movie.id === id);
    if (result) return result;
    return "id not found";
}

export function generateNextId(fileContent) {
    if (fileContent.length === 0) return 1;
    const ids = fileContent.map(movie => movie.id);
    const maxId = Math.max(...ids);
    return maxId + 1;
}

export function createNewMovie(fileContent) {
    let title = readline.question("Type the movie name: ").trim();
    while (!validateTitle(title)) {
        console.log("Movie name cannot be empty");
        title = readline.question("Type the movie name: ").trim();
    }

    const genre = readline.question("Type the genre: ").toLowerCase().trim();

    let year = readline.questionInt("Type the year of release: ");
    while (!validateYear(year)) {
        console.log("Year must be greater than 1900 and up to " + new Date().getFullYear());
        year = readline.questionInt("Type the year of release: ");
    }

    let rating = readline.questionFloat("Type the movie rating: ");
    while (!validateRating(rating)) {
        console.log("Rating must be between 0 and 10");
        rating = readline.questionFloat("Type the movie rating: ");
    }

    const id = generateNextId(fileContent);
    return { id, title, genre, year, rating };
}

export function deleteMovie(fileContent, id) {
    const updatedList = fileContent.filter(movie => movie.id !== id);
    if (updatedList.length === fileContent.length) {
        console.log("id not found");
    } else {
        console.log("the movie is deleted");
    }
    return updatedList;
}

export function updateRate(fileContent, id) {
    for (let movie of fileContent) {
        if (movie.id === id) {
            let rating = readline.questionFloat("Type the new movie rating: ");
            while (!validateRating(rating)) {
                console.log("Rating must be between 0 and 10");
                rating = readline.questionFloat("Type the new movie rating: ");
            }
            movie.rating = rating;
            console.log("rating is updated");
            return fileContent;
        }
    }
    console.log("id not found");
    return fileContent;
}

export function searchByName(fileContent, str) {
    const cleanStr = str.toLowerCase().trim();
    const results = fileContent.filter(movie => {
        return movie.title.toLowerCase().includes(cleanStr);
    });
    if (results.length === 0) {
        console.log("No results");
        return [];
    }
    return results;
}

export function sortByGenre(fileContent, genre) {
    const cleanGenre = genre.toLowerCase().trim();
    const result = fileContent.filter(movie => movie.genre === cleanGenre);
    if (result.length === 0) {
        console.log("genre not found");
        return [];
    }
    return result;
}

export function sortMovies(fileContent, field) {
    const validFields = ["title", "year", "rating"];
    if (!validFields.includes(field)) {
        console.log("Invalid sort field");
        return fileContent;
    }
    const sorted = [...fileContent].sort((a, b) => {
        if (typeof a[field] === "string") {
            return a[field].localeCompare(b[field]);
        }
        return a[field] - b[field];
    });
    return sorted;
}

export function showStatistics(fileContent) {
    if (fileContent.length === 0) {
        console.log("No movies available for statistics");
        return null;
    }
    const sumMovies = fileContent.length;
    const totalRating = fileContent.reduce((sum, movie) => sum + movie.rating, 0);
    const average = (totalRating / sumMovies).toFixed(1);
    const high = fileContent.reduce((maxMovie, currentMovie) => {
        return currentMovie.rating > maxMovie.rating ? currentMovie : maxMovie;
    });
    return {
        "Number of films": sumMovies,
        "Average rating": average,
        "Highest rated movie": high
    };
}