
const fastify = require("fastify")({logger: true});
const path = require("path");

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




fastify.get("/", (req, res) => {
    res.view("public/views/index.ejs")
})
 


;(async() => {
    try {
        await fastify.listen({port: process.env.PORT|| 9898}, () => {console.log("listing on port - 9898")});
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
})();