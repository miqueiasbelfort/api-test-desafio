const {db} = require('../connection/firebase');
const {collection, addDoc, query, where, getDocs, updateDoc, doc } = require("firebase/firestore");
const { v4: uuidv4 } = require('uuid');
const DateTime = require('../helpers/data');

const SignUp = async (name, email, password, phones) => {
    try {

        const uuid = uuidv4();
        
        const docRef = await addDoc(collection(db, "users"), {
            id: uuid,
            data_criacao: new Date(),
            data_atualizacao: new Date(),
            ultimo_login: new Date(),
            nome: name,
            email,
            senha: password,
            telefones: phones
        });

        return {
            id: uuid, 
            docId: docRef.id,
            email,
            data_criacao: new Date(), 
            data_atualizacao: new Date(), 
            ultimo_login: new Date()
        };
    
    } catch (e) {
        console.error("Error adding document: ", e);
        throw new Error(e);
    }
};

const getAllUsers = async () => {
    try {
        
        const usersList = [];
        const q = query(collection(db, "users"));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach(doc => {
            
            let id = doc.data().id;
            let nome = doc.data().nome;
            let data_atualizacao = DateTime(doc.data().data_atualizacao.seconds);
            let data_criacao = DateTime(doc.data().data_criacao.seconds);
            let ultimo_login = DateTime(doc.data().ultimo_login.seconds);
            let email = doc.data().email;
            let telefones = doc.data().telefones;

            usersList.push({
                id,
                nome,
                data_atualizacao,
                data_criacao,
                ultimo_login,
                email,
                telefones
            });
        });

        return usersList;

    } catch (error) {
        throw error;
    }
};

const getUserByEmail = async (email) => {
    try {
        
        const q = query(
            collection(db, 'users'),
            where("email", '==', email)
        );

        const querySnapshot = await getDocs(q);

        return querySnapshot;

    } catch (error) {
        throw new Error(error);
    }
};

const changeLastLogin = async (id) => {
    try {
        await updateDoc(doc(db, "users", id), {
            ultimo_login: new Date(),
        });
        return true;
    } catch (error) {
        return false;
    }
};

module.exports = {SignUp, getAllUsers, getUserByEmail, changeLastLogin};