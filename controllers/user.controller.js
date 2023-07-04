const db = require('../models');

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = db.user;

exports.login = async (req, res) => {
    const { username, password } = req.body;
  
    // Trouver l'utilisateur correspondant au nom d'utilisateur donné
    const user = await User.findOne({ username });
  
    if (!user) {
      return res.status(401).send("Nom d'utilisateur ou mot de passe incorrect");
    }
  
    // Vérifier si le mot de passe correspond au hash stocké
    const passwordMatch = await bcrypt.compare(password, user.password);
  
    if (!passwordMatch) {
      return res.status(401).send("Nom d'utilisateur ou mot de passe incorrect");
    }
  
    // Si le nom d'utilisateur et le mot de passe sont corrects, générer un token JWT
    const token = jwt.sign({ userId: user._id }, "secretKey", {
      expiresIn: "1h",
    });
  
    // Envoyer le token JWT au format Bearer
    res.status(200).json({ 
        token: token,
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            bio: user.bio
        }
    });
  };
  
  exports.register = async (req, res) => {
    const { username, email, password, bio } = req.body;

    // Check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return res.status(409).send({ message: 'Username already exists' });
    }

    // Check if email already exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(409).send({ message: 'Email already exists' });
    }
  
    const hashedPassword = await bcrypt.hash(password, 10);
  
    const user = new User({
      username,
      password: hashedPassword,
      email,
      bio,
    });
  
    const data = await user.save();
  
    res.status(201).send(data);
  };

exports.findAllUsers = function (req, res) {
    User.find()
    .select("-password -role")
    .then(data => {
        res.send(data);
    });
}

exports.findUser = function (req, res) {
    User.findById(req.params.id)
    .select("-password -role")
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving the User."
        })
    })
}

exports.updateUser = function (req, res) {
    User.updateOne({_id: req.params.id}, {...req.body}).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while updating the User."
        })
    })
}

exports.deleteUser = function (req, res) {
    User.deleteOne({_id: req.params.id}).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while deleting the User."
        })
    })
}
