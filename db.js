const mongoose = require("mongoose");


const HandSignClassifier =  new mongoose.Schema({
    m_data: [Number],
    n_data: [Number],
});


module.exports.HandSignClassifier = mongoose.model("HandSignClassifier",HandSignClassifier);

mongoose.connect("mongodb+srv://IndiaDaniel:VwWCjbvtNiozyRDb@cluster0.ivjhv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", (err) => {
    if (err){
        console.log(err);
    }
    console.log("connected");
});
