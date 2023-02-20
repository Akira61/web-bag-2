require("dotenv").config({path : "./.env"})
const fastify = require("fastify")({logger: true});
const path = require("path");
const cors = require("@fastify/cors");
const axios = require("axios");
const fastifyEnv = require('@fastify/env');
const mongoose = require("mongoose");
const order = require("./database/model_1");

// Database connection
mongoose.connect("mongodb://127.0.0.1/web-bag", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})


//middlewares
const schema = {
    type: 'object',
    required: [ 'PORT' ],
    properties: {
      PORT: {
        type: 'string',
        default: 9898
      }
    }
  }
  
const options = {
  confKey: 'config', // optional, default: 'config'
  schema,
   // optional, default: process.env
}

fastify
  .register(fastifyEnv, options)
  .ready((err) => {
    if (err) console.error(err)

    console.log(fastify.config) // or fastify[options.confKey]
    // output: { PORT: 3000 }
  })

fastify.register(require("@fastify/view"), {
    engine : {
        ejs: require("ejs")
    }
})
fastify.register(require('@fastify/static'), {
    root: path.join(__dirname, 'public'),
    prefix: '/public/', // optional: default '/'
})

fastify.register(require("@fastify/formbody"));
fastify.register(require('@fastify/multipart'));

fastify.register(cors, { 
    // put your options here
    origin: "*"
})


//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
//routes

fastify.get("/", (req, res) => {
    res.view("public/views/index.ejs")
})
 

fastify.register(require("./routes/contacts"),{prefix : "/"})

fastify.register(require("./routes/Order"), {prefix : "/"})

;(async() => {
    try {
        await fastify.listen({port: process.env.PORT|| 9898}, () => {console.log("listing on port - 9898")});
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
})();