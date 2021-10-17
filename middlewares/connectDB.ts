import type {NextApiRequest, NextApiResponse, NextApiHandler} from 'next';
import mongoose from 'mongoose';

const connectDB = (handler : NextApiHandler) => 
    async (req : NextApiRequest, res : NextApiResponse) => {

    // Válido se já está conectado, se estiver processa a API normalmente
    console.log('MongoDD readyState', mongoose.connections[0].readyState);
    if(mongoose.connections[0].readyState){
        return handler(req, res);
    }

    const {DB_CONNECTION_STRING} = process.env;
    if(!DB_CONNECTION_STRING){
        return res.status(500).json({error: 'ENV database nao informada'});
    }

    await mongoose.connect(DB_CONNECTION_STRING);
    mongoose.connection.on('connected', () => console.log('Conectado na base de dados.'));
    mongoose.connection.on('error', err => console.log('Ocorreu um erro ao conectar na base de dados', err));


    return handler(req, res);
}

export default connectDB;