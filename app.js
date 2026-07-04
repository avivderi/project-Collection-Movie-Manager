import readline from 'readline-sync';
import { readFileMoviesPromise, writeFileMoviesPromise } from './service/file.service.js';
import {
    showAllMovies, showById, createNewMovie, deleteMovie,
    updateRate, searchByName, sortByGenre, sortMovies, showStatistics
} from './service/movie.service.js';

export async function startApp() {
    let running = true;
    while (running) {
        try {
            const fileContent = await readFileMoviesPromise();
            console.log("\n=== MOVIE MANAGER MENU ===");
            console.log("1. Show All Movies (Titles)");
            console.log("2. Find Movie by ID");
            console.log("3. Add New Movie");
            console.log("4. Delete Movie");
            console.log("5. Update Movie Rating");
            console.log("6. Search Movie by Name");
            console.log("7. Sort Movies by Genre");
            console.log("8. Show Statistics");
            console.log("9. Sort Movies (title/year/rating)");
            console.log("10. Exit");

            const choice = readline.questionInt("\nChoose an option (1-10): ");

            switch (choice) {
                case 1: {
                    const titles = showAllMovies(fileContent);
                    console.log("\n--- Movie Titles ---");
                    titles.forEach((title, i) => console.log(`${i + 1}. ${title}`));
                    break;
                }
                case 2: {
                    const idToFind = readline.questionInt("Enter movie ID: ");
                    console.log(showById(fileContent, idToFind));
                    break;
                }
                case 3: {
                    const newMovie = createNewMovie(fileContent);
                    fileContent.push(newMovie);
                    await writeFileMoviesPromise(fileContent);
                    console.log(`Movie "${newMovie.title}" added and saved successfully.`);
                    break;
                }
                case 4: {
                    const idToDelete = readline.questionInt("Enter movie ID to delete: ");
                    const afterDelete = deleteMovie(fileContent, idToDelete);
                    await writeFileMoviesPromise(afterDelete);
                    break;
                }
                case 5: {
                    const idToUpdate = readline.questionInt("Enter movie ID to update: ");
                    const afterUpdate = updateRate(fileContent, idToUpdate);
                    await writeFileMoviesPromise(afterUpdate);
                    break;
                }
                case 6: {
                    const searchStr = readline.question("Enter name to search: ");
                    console.log(searchByName(fileContent, searchStr));
                    break;
                }
                case 7: {
                    const genreStr = readline.question("Enter genre: ");
                    console.log(sortByGenre(fileContent, genreStr));
                    break;
                }
                case 8: {
                    console.log(showStatistics(fileContent));
                    break;
                }
                case 9: {
                    const field = readline.question("Sort by (title/year/rating): ").toLowerCase().trim();
                    console.log(sortMovies(fileContent, field));
                    break;
                }
                case 10:
                    console.log("Goodbye!");
                    running = false;
                    break;
                default:
                    console.log("Invalid option. Please choose between 1 and 10.");
            }
        } catch (error) {
            console.error("An error occurred:", error.message);
            running = false;
        }
    }
}

startApp();