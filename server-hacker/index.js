const express= require('express')
const handlebars = require('express-handlebars');

const app = express()
app.use(express.urlencoded({ extended: true }));
app.set("views", __dirname);  
app.engine("hbs", handlebars({
    defaultLayout: 'index',
    layoutsDir: __dirname,
    extname: '.hbs',
  }));
app.set("view engine", "hbs");  

app.get('/',(req,res)=>{
    res.render('index')
})
app.listen(5000,()=>console.log("Listening on 5000"))