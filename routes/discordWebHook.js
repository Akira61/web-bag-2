function discordHook(name, email,  message=null , phone_number= null, membership=null, bill=null, env){
    
    let params = {
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
                    value: name,
                    inline: false,
                },
                {
                    name : "email : ",
                    value: email,
                    inline: false,
                },
                {
                    name : "phone number : ",
                    value: phone_number,
                    inline: false,
                },
                {
                    name : "membership : ",
                    value: membership,
                    inline: false,
                },
                {
                    name : "bill : ",
                    value: bill,
                    inline: false,
                },
              {
                name: "content:",
                value: message + '\n\n' + "||#web-bag-contact||",
                inline: true,
              },
            ],
          },
        ],
      };
      
      
        axios.post(env, params);
      
}


module.exports.discordHook = discordHook