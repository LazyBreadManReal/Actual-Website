import express from 'express';
import url from 'url';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs';
import { JSONFilePreset } from 'lowdb/node'
import { fileURLToPath } from 'url';
import path from 'path';

const encryptKey = "pasigcitysciencehighschool"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

const defaultData = { users: [], items: [] };
const db = await JSONFilePreset("database/db.json", defaultData);

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../public")));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});



app.post('/api/users/register', async (req, res) => {
    const { fullname, email, password } = req.body;

    const emailExist = db.data.users.find((user) => user.email === email);
    if(emailExist > 0){
        return res.json({ success: false, message: "Email In Use"});
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const userId = db.data.users.length + 1;
    db.data.users.push({ userId, username: fullname, email, password: hashedPassword});
    await db.write();
    return res.json({ success: true });
})

app.post('/api/users/login', async (req, res) => {
    const { email, password } = req.body;

    const account = db.data.users.find((user) => user.email === email);
    if(!account || !bcrypt.compareSync(password, account.password)){
        return res.json({ valid: false, message: "Invalid Credentials"});
    }
    const token = jwt.sign({ userId: account.userId, email }, encryptKey);
    return res.json({ valid: true, token }, token, { expiresIn: '7d'});
});

app.post('/api/users/get', async (req, res) => {
    const { id } = req.body;

    const user = db.data.users.find((user) => user.userId === id );
    if(!user){
        return res.json({ valid: false });
    }
    return res.json({ valid: true, user });
})

app.post('/api/token/verify', (req, res) => {
    const { token } = req.body;

    jwt.verify(token, encryptKey, (err, decoded) => {
        if (err) {
            return res.json({ valid: false })
        }
        return res.json({ valid: true, userId: decoded.userId, email: decoded.email });
    })
})


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
})