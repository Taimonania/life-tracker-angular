import express, { Router } from 'express';
import path from 'path';
import fs from 'fs';
import { isBuffer } from 'util';

interface Entry {
    id: string;
    text: string;
}
    
const router: Router = express.Router();

// Get all entries
router.get('/', (req, res) => {
    fs.readFile(path.join(__dirname, '../storage', 'myEntries.json'), (err, data) => {
        if (err) throw err;
        let entries: Entry[] = JSON.parse(data.toString());
        console.log();
        res.json(entries);
    });
});

router.get('/:id', (req, res) => {
    fs.readFile(path.join(__dirname, '../storage', 'myEntries.json'), (err, data) => {
        if (err) throw err;
        let entries: Entry[] = JSON.parse(data.toString());
        console.log();
        const found = entries.some(entry => entry.id === req.params.id);
        if (found) {
            res.json(entries[Number(req.params.id)]);
        } else {
            res.json({ msg: 'No entry found with id ' + req.params.id});
        }
    });
});

router.post('/', (req, res) => {
    const newEntry: Entry = {
        id: req.body.id,
        text: req.body.text,
    }
    const filePath: string = path.join(__dirname, '../storage', 'myEntries.json')
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) throw err;
        const entriesArray: Entry[] = JSON.parse(data.toString());
        entriesArray.push(newEntry);

        let newJson = JSON.stringify(entriesArray, null, '\t');
        fs.writeFile(filePath, newJson, 'utf8', (err) => {
            if (err) throw err;
        });

        res.json(entriesArray);
    });
})

module.exports = router;