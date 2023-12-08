const DateTime = require("../helpers/data");
const {createUserToken, getToken} = require("../helpers/token");
const {SignUp, getUserByEmail, changeLastLogin, getAllUsers} = require("../services/userService");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class userController {
    static async SignUpUser(req, res){

        const {
            nome,
            email,
            senha,
            telefones
        } = req.body;

        // create hash
        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(senha, salt);

        const checkUser = await getUserByEmail(email);

        if(!checkUser.empty){
            return res.status(422).json({mensagem: "E-mail já existente"});
        };

        const user = await SignUp(nome, email, passwordHash, telefones);
        const token = await createUserToken(user);

        return res.status(201).json({
            id: user.userId,
            data_criacao: user.data_criacao,
            data_atualizacao: user.data_atualizacao,
            ultimo_login: user.ultimo_login,
            token
        });
    };
    static async SignInUser(req, res){

        const {email, senha} = req.body;

        const user = await getUserByEmail(email);

        if(user.empty){
            return res.status(404).json({messagem: "Usuário e/ou senha inválidos"});
        };

        let data;
        let id = "";
        user.forEach(doc => {
            data = doc.data();
            id = doc.id;
        });

        // check the password
        const checkPassword = await bcrypt.compare(senha, data.senha);

        if(!checkPassword){
            return res.status(401).json({mensagem: "Usuário e/ou senha inválidos"});
        };

        const lastLogin = await changeLastLogin(id);

        if(!lastLogin){
            return res.status(500).json();
        };

        const token = await createUserToken(data);

        const data_atualizacao = DateTime(data.data_atualizacao.seconds);
        const data_criacao = DateTime(data.data_criacao.seconds);
        const ultimo_login = DateTime(data.ultimo_login.seconds);

        const response = {
            id: data.id,
            data_atualizacao,
            data_criacao,
            ultimo_login,
            token
        };

        return res.status(200).json(response);
    };
    static async AllUsers(req, res){
        const users = await getAllUsers();
        return res.status(200).json(users);
    };
    static async User(req, res){
        
        const token = getToken(req);
        
        if(!token) {
            return res.status(401).json({mensagem: "Não autorizado"})
        };

        const decoded = jwt.verify(token, process.env.SECRET);
        const userEmail = decoded.email;

        const user = await getUserByEmail(userEmail);

        if(user.empty){
            return res.status(404).json({messagem: "Usuário não encontrado!"});
        };

        let data;
        user.forEach(doc => {
            let id = doc.data().id;
            let nome = doc.data().nome;
            let data_atualizacao = DateTime(doc.data().data_atualizacao.seconds);
            let data_criacao = DateTime(doc.data().data_criacao.seconds);
            let ultimo_login = DateTime(doc.data().ultimo_login.seconds);
            let email = doc.data().email;
            let telefones = doc.data().telefones;

            data = {
                id,
                nome,
                data_atualizacao,
                data_criacao,
                ultimo_login,
                email,
                telefones,
                token
            };
        });

        return res.status(200).json(data);
    };
};

module.exports = userController;