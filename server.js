require('dotenv').config();
const express = require('express');
const users = [];
const app = express();
app.use(express.json());
const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.status(200).json({
      ok: true,
      version: 2
    });
});

app.get('/users', (req, res) => {
    if (users.length === 0) {
        return res.status(204).send();
    }
    res.status(200).json({
        users
    })
});

app.get('/users/:id', (req, res) => {
    res.status(200).json({
        user: users[req.params.id - 1]
    })
});

app.post('/users', (req, res) => {
    const { nome, email, idade } = req.body;
    if (!nome || !email || !idade) {
        return res.status(400).json({
            error: 'Dados insuficientes'
        });
    }
    const id = users.length + 1;
    users.push({ id, nome, email, idade });
    res.status(200).json({
        message: 'Usuário criado com sucesso',
        id
    })
});

app.put('/users/:id', (req, res) => {
    const id = req.params.id;
    const { nome, email, idade } = req.body;
    if (!nome || !email || !idade) {
        return res.status(400).json({
            error: 'Dados insuficientes'
        });
    }
    users[req.params.id - 1] = { nome, email, idade };
    res.status(200).json({
        message: 'Usuário atualizado com sucesso',
        id
    })
});

app.listen(port, () => {
    console.log('Servidor rodando na porta ' + port);
})
