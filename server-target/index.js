const express= require('express')
const session = require('express-session');
const handlebars = require('express-handlebars');

const app = express()
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'test',
    resave: false,
    saveUninitialized: false,
  }));
app.set("views", __dirname);  
app.engine("hbs", handlebars({
    defaultLayout: 'main',
    layoutsDir: __dirname,
    extname: '.hbs',
  }));
app.set("view engine", "hbs");  

//Base de Datos

const users=[{id:1,email:"miguel@gmail.com",password:"1234"},
{id:2,email:"ale@gmail.com",password:"1234"},
{id:3,email:"cris@gmail.com",password:"1234"},
{id:4,email:"juan@gmail.com",password:"1234"}]

//Middlewares
function authentication(req,res,next){
       if(!req.session.userId){
          return res.redirect('login')
       }
       next()
}

//Rutas

app.get('/',(req,res)=>{
   res.send("Servidor")
})
app.get('/login',(req,res)=>{
    res.render('login')
})
app.get('/home',authentication,(req,res)=>{
    res.render('home')
})
app.post('/login', (req, res) => {
    if (!req.body.email || !req.body.password) {
      return  res.redirect('/login');
    }
    const user= users.find(us => us.email === req.body.email)
    if(!user){
        return res.redirect('/login')
    }
    if(user.password != req.body.password){
       return res.redirect('/login') 
    }
    req.session.userId = user.id
    res.redirect('/home')
})

app.get('/logout', authentication, (req, res) => {
  req.session.destroy();
  res.redirect('/login');
  })

app.get('/edit', authentication, (req, res) => {
    res.render('edit')
  });

app.post('/edit', authentication, (req, res) => {
    const user = users.find(user => user.id === req.session.userId);
    user.email = req.body.email;
    const index = users.findIndex(u =>u.id === user.id)
    users.splice(index,1,user)
    console.log(`User ${user.id} email changed to ${user.email}`);
    res.redirect('/home');
  });

app.listen(3000,()=>console.log("Listening on 3000"))