require("dotenv").config({path : "./.env"})
const fastify = require("fastify")({logger: true});
const path = require("path");
const cors = require("@fastify/cors");
const axios = require("axios");
const fetch = require("node-fetch");
const fastifyEnv = require('@fastify/env');

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
// middlwares
fastify.register(require("@fastify/view"), {
    engine : {
        ejs: require("ejs")
    }
})
fastify.register(require('@fastify/static'), {
    root: path.join(__dirname, 'public'),
    prefix: '/public/', // optional: default '/'
})

fastify.register(require("@fastify/formbody"))
fastify.register(require('@fastify/multipart'))
fastify.register(cors, { 
    // put your options here
    origin: "*"
  })



fastify.get("/", (req, res) => {
    res.view("public/views/index.ejs")
})
 


fastify.post("/contact", (req, res) => {
    console.log(req.body)
    // axios.post(process.env.discordContactHook,{"content" : {name : req.body.name, email: req.body.email} })
    var params = {
        username: "web bag contact",
        
        content: "",
        embeds: [
          {
            title: "dog request",
            color: 15258703,
            thumbnail: {
              url: "https://static.wixstatic.com/media/bf05c3_4fb9457148b24960b9b44edadec6a163~mv2.png/v1/crop/x_0,y_0,w_1035,h_984/fill/w_342,h_344,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/bf05c3_4fb9457148b24960b9b44edadec6a163~mv2.png",
            },
            fields: [
                {
                    name : "name : ",
                    value: req.body.name,
                    inline: false,
                },
                {
                    name : "email : ",
                    value: req.body.email,
                    inline: false,
                },
              {
                name: "content:",
                value: req.body.message + '\n\n' + "||#web-bag-contact||",
                inline: true,
              },
            ],
          },
        ],
      };
      
      if(req.body.name !="" && req.body.email !="" && req.body.message !=""){
          axios.post(process.env.discordContactHook, params);
      }

})

;(async() => {
    try {
        await fastify.listen({port: process.env.PORT|| 9898}, () => {console.log("listing on port - 9898")});
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
})();