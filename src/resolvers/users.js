const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLList } = require("graphql");
const { GraphQLDateTime } =  require('graphql-iso-date')
const { UserType } = require("../schemas/users");
const data = require("../models/users");
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let users = {
    type: new GraphQLList(UserType),
    args: { id: { type: GraphQLID }, username: { type: GraphQLString }, email: { type: GraphQLString },joined: { type: GraphQLDateTime },last_logged_in: { type: GraphQLDateTime } },
    async resolve(parentValue, args) {
        let result
        let rez
        if(Object.keys(args).length>0){
         result = await data.getUser(args.joined,args.last_logged_in);
         delete args.joined
         delete args.last_logged_in
         if(Object.keys(args).length>0){
      return   result.filter((result)=>{
            rez=0
                  for (let key in args){
                    if(args[key]==result[key]){
                     rez = 1
                    }else{
                      return false
                    }
            }
            if (rez==1){
              return true
                }
          })
        }else{return result}
        }else{
             result=await data.getUsers()
        }
        return result;
        
    }
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
exports.users = users;

