const jwt = require("jsonwebtoken");

const createUserToken = async(user) => {

    // criando o token
    const token = jwt.sign({
        email: user.email,
        userId: user.id
    }, process.env.SECRET, {
        expiresIn: 1800
    });

    return token;
};

const getToken = (req) => {
    const authHeader = req.headers.authorization
    const token = authHeader.split(" ")[1]
    return token
};

const checkToken = (req, res, next) => {

    if(!req.headers.authorization) {
        return res.status(401).json({messagem: "Não autorizado"})
    }

    const token = getToken(req)
    if(!token){
        return res.status(401).json({messagem: "Não autorizado"})
    }

    try {
        const verified = jwt.verify(token, process.env.SECRET);
        req.user = verified
        next()
    } catch(err) {
        return res.status(401).json({messagem: "Sessão inválida"})
    }
}

module.exports = {createUserToken, checkToken, getToken}