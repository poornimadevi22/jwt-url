const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;


const User = require("../model/user")
const shortlink = require("../model/url")

exports.getlogin = (req, res) => {
  res.render("login")
}

exports.postLogin = async (req, res) => {
  //   const user = { id: 1, username: "test", password: "$2s" };
  try {
    const user = await User.findOne({ username: req.body.username });
    console.log(user,req.body,process.env);
    if (user && (await bcrypt.compare(req.body.pwd, user.password))) {
      const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );
      res.redirect("/dashboard?token=" + token);
    } else {
      res.send("Login Falied");
    }
  } catch (error) {
    console.error(error)
    res.status(500).send();
  }
};


exports.getRegister = (req, res) => {
  res.render("register")
}


exports.postregister = async (req, res) => {
  try {
    console.log(req)
    let user = new User({
      username: req.body.username,
      password: req.body.password,
    }); user = await user.save();


    res.redirect("/login")
  } catch (error) {
    console.error(error)
    res.status(500).send();
  }
}


exports.getDashboard = (req, res) => {
  try {
    const token = req.query.token;
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    res.render("dashboard", { user: verified });
  } catch (error) {
    console.log(error);
    res.send("Access denied")
  }
}
//going to url shortening
exports.getIndex =  (req, res) => {
  res.render('index');

}

exports.getRedirect = async (req, res) => {
  const dbObj = await shortlink.findOne({ shortUrl: req.params.shortId }).exec()
  if (dbObj) {
    res.redirect(dbObj.longUrl)
  } else {
    res.send("not found")
  }

}

exports.saveRecord =  async (req, res) => {
  console.log(req.body)
  const record = new shortlink({
    longUrl: req.body.fullUrl,
    // shortUrl:await bcrypt.hash(req.body.fullUrl,saltRounds)
  })

  await record.save()
  res.redirect('/dashboard');

}