
async function Contact (fastify, options){
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
    
}

module.exports = Contact;