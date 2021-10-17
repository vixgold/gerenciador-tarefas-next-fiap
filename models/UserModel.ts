import mongoose, {Schema} from 'mongoose';

const UserSchema = new Schema({
    name: { type: String, required: [true, '* Campo Obrigatório']},
    email: { type: String, required: [true, '* Campo Obrigatório']},
    password: { type: String, required: [true, '* Campo Obrigatório']}
})

export const UserModel = mongoose.models.users || mongoose.model('users', UserSchema);