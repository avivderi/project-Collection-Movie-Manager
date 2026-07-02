import fs from 'fs'

const fileName = "../data/movies.json"

export function readFileMovies(callback) {
    fs.readFile(fileName, "utf8", (err, data) => {
        if (err) return err.message
        try {
            callback(JSON.parse(data))
        } catch (err) {
            console.log("file content is not a Json")
        }
    })
}

export function writeFileMovies(content) {
    fs.writeFile(fileName, JSON.stringify, content, (err) => {
        if (err) return err.message
        console.log("succsses")
    })
}
