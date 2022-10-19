import { Router } from "express";
import {ContainerProducts} from '../container/Container.js'
const products = Router();


const productsContainer = new ContainerProducts();

products.get('/',  async(req, res)=>{
    const elementos = await productsContainer.getAll();
    res.send({sucess: true, data: elementos});
})

products.get('/:id', async (req, res)=>{
    const {id} = req.params;

    const element = await productsContainer.getById(Number(id));

    if(!element){
        return res.send({
            sucess:false, data: undefined, message: 'element not found' ,
        })
    }

    res.send({sucess: true, data: element});
})

products.post('/', async (req, res)=>{
    const {title, price, thumbnail} = req.body;

    const elementos = await productsContainer.save({title, price, thumbnail});

    res.send({sucess: true, data:{id: elementos.id}})
})

products.put('/:id', async (req, res)=>{
    const {id} = req.params;
    const {title, price, thumbnail} = req.body;

    const elementoModificado = await productsContainer.upDateById(id, {title, price, thumbnail});

    res.send({sucess: true, data:{update: elementoModificado}})
})

products.delete('/:id', async (req, res)=>{
    const id = req.params;
 
    const eliminar = await productsContainer.deleteByid(id);
    res.send({sucess:true, data:{delete: eliminar}})
     

})





export { products };