import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';

const app = express();
const port = 3000;
const dbFilePath = path.join(__dirname, 'db.json');

app.use(bodyParser.json());

interface Submission {
    name: string;
    email: string;
    phone: string;
    github_link: string;
    stopwatch_time: string;
}

// Read DB
const readDb = (): Submission[] => {
    const rawData = fs.readFileSync(dbFilePath, 'utf-8');
    return JSON.parse(rawData);
}

// Write DB
const writeDb = (data: Submission[]): void => {
    fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2), 'utf-8');
}

// Ping endpoint
app.get('/ping', (req, res) => res.send('true'));

// Submit endpoint
app.post('/submit', (req, res) => {
    const submissions = readDb();
    const newSubmission: Submission = req.body;
    submissions.push(newSubmission);
    writeDb(submissions);
    res.sendStatus(200);
});

// Read endpoint
app.get('/read', (req, res) => {
    const index = parseInt(req.query.index as string);
    const submissions = readDb();
    if (index < 0 || index >= submissions.length) {
        return res.status(404).send('Submission not found');
    }
    res.json(submissions[index]);
});

// Delete endpoint
app.delete('/delete', (req, res) => {
    const index = parseInt(req.query.index as string);
    let submissions = readDb();
    if (index < 0 || index >= submissions.length) {
        return res.status(404).send('Submission not found');
    }
    submissions = submissions.filter((_, i) => i !== index);
    writeDb(submissions);
    res.sendStatus(200);
});

// Update endpoint
app.put('/update', (req, res) => {
    const index = parseInt(req.query.index as string);
    const updatedSubmission: Submission = req.body;
    const submissions = readDb();
    if (index < 0 || index >= submissions.length) {
        return res.status(404).send('Submission not found');
    }
    submissions[index] = updatedSubmission;
    writeDb(submissions);
    res.sendStatus(200);
});

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
