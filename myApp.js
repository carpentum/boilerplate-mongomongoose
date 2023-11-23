// require("./models/personModel");
require("dotenv").config();
let mongoose = require("mongoose");

(async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://ramonmosquera:${process.env.MONGO_PASSWORD}@cluster0.fcwmg46.mongodb.net/`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
  } catch (err) {
    console.log("Database connection error.", err);
  }
})();

let personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: Number,
  favoriteFoods: [String],
});

let Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  let francesca = new Person({
    name: "Francesca",
    age: 20,
    favoriteFoods: ["sushi"],
  });
  francesca.save((error, data) => {
    if (error) {
      console.log(error);
      done(error);
    } else {
      done(null, data);
    }
  });
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function (error, data) {
    if (error) {
      console.log(error, data);
      done(error);
    } else {
      done(null, data);
    }
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, function (error, data) {
    if (error) {
      done(error);
    } else {
      done(null, data);
    }
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, function (error, data) {
    if (error) {
      done(error);
    } else {
      done(null, data);
    }
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, function (error, data) {
    if (error) {
      done(error);
    } else {
      done(null, data);
    }
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, (error, person) => {
    if (error) return console.log(error);

    person.favoriteFoods.push(foodToAdd);
    person.save((error, updatedPerson) => {
      if (error) return console.log(error);
      done(null, updatedPerson);
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate(
    { name: personName },
    { age: ageToSet },
    (error, updatedPerson) => {
      if (error) {
        done(error);
      } else {
        done(null, updatedPerson);
      }
    }
  );
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (error, person) => {
    if (error) {
      done(error);
    } else {
      done(null, person);
    }
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({ name: nameToRemove }, (error, data) => {
    if (error) {
      done(error);
    } else {
      done(null, data);
    }
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  Person.find({ favoriteFoods: foodToSearch })
    .sort({ name: "asc" })
    .select("-age")
    .limit(2)
    .exec((error, person) => {
      if (error) return console.log(error);
      done(null, person);
    });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
