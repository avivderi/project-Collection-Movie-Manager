import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const filePath = path.join(__dirname, '..', 'data', 'movies.json')

const fileName = "../data/movies.json"

export function readFileMovies(callback) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) return callback(err, null);
        try {
            const movies = JSON.parse(data);
            callback(null, movies);
        } catch (parseErr) {
            callback(parseErr, null);
        }
    });
}

export function writeFileMovies(content, callback) {
    fs.writeFile(filePath, JSON.stringify(content, null, 2), 'utf8', (err) => {
        if (err) return callback(err);
        callback(null);
    });
}



export function readFileMoviesPromise() {
    return new Promise((resolve, reject) => {
        readFileMovies((err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });
}

export function writeFileMoviesPromise(content) {
    return new Promise((resolve, reject) => {
        writeFileMovies(content, (err) => {
            if (err) reject(err);
            else resolve();
        });
    });
}