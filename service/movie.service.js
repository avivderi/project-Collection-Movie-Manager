import readline from 'readline-sync';

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
    let title = "";
    while (title === "") {
        title = readline.question("Type the movie name: ").trim();
        if (title === "") {
            console.log("Movie name cannot be empty");
        }
    }
    
    const genre = readline.question("Type the genre: ").toLowerCase().trim();
    
    let year = 0;
    const currentYear = new Date().getFullYear();
    while (year <= 1900 || year > currentYear) {
        year = readline.questionInt("Type the year of release: ");
        if (year <= 1900 || year > currentYear) {
            console.log("Year must be greater than 1900 and up to " + currentYear);
        }
    }

    let rating = -1;
    while (rating < 0 || rating > 10) {
        rating = readline.questionFloat("Type the movie rating: ");
        if (rating < 0 || rating > 10) {
            console.log("Rating must be between 0 and 10");
        }
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
            let rating = -1;
            while (rating < 0 || rating > 10) {
                rating = readline.questionFloat("Type the new movie rating: ");
                if (rating < 0 || rating > 10) {
                    console.log("Rating must be between 0 and 10");
                }
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
