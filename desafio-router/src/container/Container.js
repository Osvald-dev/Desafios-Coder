class ContainerProducts{
   constructor(){
    this.elements = []
   } 

   getAll(){
    return this.elements;
   }

   save(element){
    element.id = !this.elements.length ? 1 : this.elements[this.elements.length -1].id +1

    this.elements.push(element)

    return element;
   }

   getById(id){
    return this.elements.find((e)=> e.id === id);

   }

   upDateById(id, newData){
    const elementIndex = this.elements.findIndex((e)=> e.id == id);
    if(elementIndex === -1) return null;

    const foundElement = this.elements[elementIndex];

    for (const key in newData){
      if(foundElement.hasOwnProperty(key)){
        foundElement[key] = newData[key]
      }
    }
    return this.elements[elementIndex];
   }

   deleteByid(id){
    
    const borrados =  this.elements.filter((element)=>element.id != id);
    return borrados;
    

   }

}

export {ContainerProducts};