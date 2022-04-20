const mongoose = require ('mongoose');

const dbCnn = async ()=>{

    try {
        mongoose.connect( process.env.MONGODB_ATLAS, {
            useNewUrlParser : true,
            useUnifiedTopology: true,
            // useCreateIndex: true, obsoleto
            // useFindAndModify: false
        });
        console.log('Base datos en linea');
        console.log(process.env.MONGODB_ATLAS);

    } catch (error) {
        console.log(error);
        throw new Error('Error al iniciar de la base datos');
    }


}

module.exports = {
    dbCnn
}
