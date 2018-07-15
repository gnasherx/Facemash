import mongoose, {Schema} from "mongoose";

const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required!"]
        },
        email: {
            type: String,
            required: [true, "Email is required!"],
            unique: true
        },
        password: {
            type: String,
            required: [true, "Password is required!"]
        },
        posts: [{
            type: Schema.Types.ObjectId,
            ref: 'Post'
        }]
    },
    {timestamps: true}
);
//
// UserSchema.statics.addPost = async function (id, args) {
//     const Post = mongoose.model("Post");
//
//     const post = await new Post({...args, user: id});
//
//     const user = await this.findByIdAndUpdate(id, {$push: {posts: post.id}});
//
//     return {
//         post: await post.save(),
//         user
//     }
//
// };


export default mongoose.model("User", UserSchema);
