const socket = io("http://localhost:3000");

//guardo en una constante los datos del formulario por id
const datosForm = document.getElementById('product-form');

datosForm.addEventListener('submit', (e)=>{
    const formData = new FormData(datosForm)
    const formValues = Object.fromEntries(formData)
    productForm.reset()
    socket.emit("new product", formValues)
    console.log("🚀 ~ file: cliente.js ~ line 8 ~ productForm.addEventListener ~ formValues", formValues)
  })


socket.on("all products", allProduct => {
    console.log("🚀 ~ file: cliente.js ~ line 16 ~ allProduct", allProduct)
    renderizadoProductos(allProduct)
  })

  const renderizadoProductos = async (products) => {
    const respuesta = await fetch('../../table-products.hbs')
    const template = await respuesta.text()
    // compile the template
    const compiledTemplate = Handlebars.compile(template);
    // execute the compiled template and print the output to the console
    const html = compiledTemplate({products})
    productsContainer.innerHTML = html
} 
