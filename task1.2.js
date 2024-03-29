import path from 'path'
import fs from 'fs'
import { csv } from 'csvtojson'

const csvFilePath = path.join(__dirname, 'csv', 'input.csv')
const outputFilePath = path.join(__dirname, 'output', 'output.txt')

let readableStream = fs.createReadStream(csvFilePath, 'utf8');
let writeableStream = fs.createWriteStream(outputFilePath);

readableStream
.on('data', async (chunk) => {
    console.log(chunk)
const jsonObj = await csv().fromString(chunk)
console.log('js', jsonObj)

    jsonObj.forEach((value) => {
        const result = Object.keys(value).reduce((acc, curr) => {
            const smallValue = curr.toLowerCase();
            if(smallValue !== 'amount'){
                acc[smallValue] = value[curr]
            }
            return acc
        }, {})
        writeableStream.write(JSON.stringify(result) + '\n');
    })
})
.on('end', () => console.log('All the data in the file has been read'))
.on('close', () => console.log('File was closed'))
.on('error', () => console.error('Any error, try again'))

