  import { mutation } from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { authComponent } from "./auth";

// Create a new task with the given text
export const createPost = mutation({
  args: { title: v.string(),body:v.string() },//args = data sent from the frontend to the function 
  handler: async (ctx, args) => {  //ctx = gives you tools/methods to interact with the database, auth, storage, etc. 
    const user = await authComponent.safeGetAuthUser(ctx);// it give accsess to see the details of user
    if(!user){
        throw new ConvexError("Not Authenticated")
    }
    const blogArticle = await ctx.db.insert("posts", {
        body: args.body,
        title:args.title,
        authorId:user._id
     });
    return blogArticle;
  },
});