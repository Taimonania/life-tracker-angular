import express, { Router } from 'express';
import path from 'path';
import fs from 'fs';

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
        res.json(entries[0]);
    });
});

module.exports = router;