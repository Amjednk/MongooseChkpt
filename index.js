const exrpess = require("express");
const mongoose = require("mongoose");
const Person = require("./Person");
const app = exrpess();
mongoose.set("strictQuery", false);

mongoose.connect(
    "mongodb+srv://ak:ak@cluster0.9whec09.mongodb.net/?retryWrites=true&w=majority"
);

/*Create and Save a Record of a Model*/
const person1 = new Person({ name: "Amjed", age: 46, favoriteFoods: ["Chocolate", "Ice Cream", "Cheese"] });
person1.save().then(doc => {
    console.log(doc)
})
.catch(err => {
    console.error(err)
});

async function start() {
    /*Create Many Records with model.create()*/
    const person2 = await Person.create({
        name: "Minou",
        age: 14,
        favoriteFoods: ["Burger", "Sea Food", "Soda"],
    });
    const person3 = await Person.create({
        name: "Loulou",
        age: 11,
        favoriteFoods: ["Chrispy Chicken", "Chips", "Sweets"],
    });

    /*Use model.find() to Search Your Database*/  
    await Person.find().then(allPerson => {console.log(allPerson)});

    /*Use model.findOne() to Return a Single Matching Document from Your Database*/
    await Person.findOne().then(onePerson => {console.log(onePerson)});

    /*Use model.findById() to Search Your Database By _id*/
    await Person.findById("63d82aa7d781a36105ec578a").then(idPerson => {console.log(idPerson)}).catch(err => {
        console.error(err)
    });

    /*Perform Classic Updates by Running Find, Edit, then Save*/
    //See above operations

    /*Perform New Updates on a Document Using model.findOneAndUpdate()*/
    await Person.findOneAndUpdate({"name":"Amjed"},{$set:{age:"47"}})
    .then(updatePerson => {console.log("Updated: ", updatePerson)});

    /*Delete One Document Using model.findByIdAndRemove.*/
    await Person.findOneAndRemove().then(removePerson => {console.log("Removed: ",removePerson)}).catch(err => {
        console.error(err)
    });

    /*Delete Many Documents with model.remove() replaced by model.deleteMany*/
    await Person.deleteMany({ name: "Minou" });

}

start();

app.listen(5000, () => {
console.log("server is running");
});