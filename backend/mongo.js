const { MongoClient } = require("mongodb");
const url =
    "mongodb+srv://Clerkly:clerkly123@acramain.plpjg.mongodb.net/acraMain?retryWrites=true&w=majority";
const quiz = new MongoClient(url);

async function insertMongo(data){
    //connect mongodb
    await quiz.connect();
    const db = quiz.db("quiz");
    const recordQuiz = db.collection("recordQuiz");
    const post = {"entities":
                  [{"username": data.username,
                  "Q1": data.Q1,
                  "Q2": data.Q2,
                  "Q3": data.Q3,
                  "Q4": data.Q4,
                  "Q5": data.Q5,
                  "Q6": data.Q6,
                  "Q7": data.Q7,
                  "Q8": data.Q8,
                  "Q9": data.Q9,
                  "Q10": data.Q10,
                  "Q11": data.Q11,
                  "Q12": data.Q12,
                  "Q13": data.Q13,
                  "Q14": data.Q14,
                  "Q15": data.Q15,
                  "Q16": data.Q16,
                  "Q17": data.Q17,
                  "Q18": data.Q18,
                  "Q19": data.Q19,
                  "Q20": data.Q20,
                  "Score": data.Score
                }]}
    recordQuiz.insertOne(post);
  }

  export default insertMongo;