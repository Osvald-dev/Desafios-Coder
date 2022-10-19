import express, { json } from 'express';
import { products } from './routers/productsRouter.js';
import handlebars from 'express-handlebars';

const PORT = 3000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.engine('hbs', handlebars.engine({
    extname:'.hbs',
    defaultLayout:'main.hbs',
}))

app.set('view engine', 'hbs');
app.set('views', './views');


app.use("/", ViewsRouter);
app.use('/api/productos', products);




app.listen(PORT,()=> console.log(`Runing in port: ${PORT}`));

