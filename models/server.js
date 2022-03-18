const express = require('express');
const cors = require('cors');
const {dbCnn} = require('../database/config.db');

// Creación de la class 
class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.userPath = '/api/usuarios';
        // Conect DB
        
        this.conectarDB();
        // Middlewares
        this.middlewares();
        
        // Router de  la aplicacion
        this.routes();

    }

    async conectarDB (){
        await dbCnn();
    }

    middlewares(){
        // cors
        this.app.use(cors());

        // lestura y parseo
        this.app.use(express.json());

        // Directorio publico
        this.app.use(express.static('public'));
    }

    // Routes (crear método end points)
    routes() {
        this.app.use(this.userPath, require('../routes/usuarios.routes'))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor en puerto: ', this.port);
        });
    }

}

module.exports = Server
