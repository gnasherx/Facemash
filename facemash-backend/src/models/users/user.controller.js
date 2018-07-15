import User from "./user.model";
import bcrypt from "bcrypt";

// Create a new User
export const createUser = async (req, res) => {
    // Make sure the user conflicts does not occur
    await User.find({email: req.body.email})
        .exec()
        .then(user => {
            if (user.length >= 1) {
                //User conflicts response
                return res.status(409).json({
                    error: true,
                    message: `${res.body.email} already exists :(`
                });
            } else {
                // this will hash the password and will create a new user.
                bcrypt.hash(req.body.email, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: true,
                            message: `${req.body.password} Error in Authentication!: ${err}`
                        });
                    } else {
                        const user = new User({
                            name: req.body.name,
                            email: req.body.email,
                            password: hash
                        });

                        user
                            .save()
                            .then(user => {
                                res.status(201).json({
                                    error: false,
                                    user: user,
                                    message: "User created :)"
                                });
                            })
                            .catch(err => {
                                res.status(500).json({
                                    error: true,
                                    message: `Failed to create a new user!: ${err}`
                                });
                            });
                    }
                });
            }
        });
};

// Sign in user
export const SignInUser = async (req, res) => {
    await User.find({email: req.body.email})
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    error: true,
                    message: `We can't find you: Authentication failed!`
                });
            }

            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        error: true,
                        message: `Authentication failed!`
                    });
                }

                if (result) {
                    return res.status(200).json({
                        error: false,
                        message: "Successfully login :)"
                    });
                } else {
                    return res.status(401).json({
                        error: true,
                        message: ` ${result} ${req.body.password} Authentication failed! ${user[0].password}`
                    });
                }
            });
        });
};

//
// export const createUserPost = async (req, res) => {
//     const {name, description, image} = req.body;
//     const {userId} = req.params;
//
//     if (!name) {
//         return res.status(400).json({
//             error: true,
//             message: "Name is required!"
//         });
//     }
//
//     if (!description) {
//         return res.status(400).json({
//             error: true,
//             message: "Description is required!"
//         });
//     }
//
//     if (!userId) {
//         return res.status(400).json({
//             error: true,
//             message: "User id is required!"
//         });
//     }
//
//     try {
//         const {post, user} = await User.addPost(userId, {name, description, image});
//         return res.status(201).json({
//             error: false,
//             post,
//             user
//         });
//
//     } catch (e) {
//         return res.status(400).json({
//             error: true,
//             message: `Post cannot be created!: ${e}`
//         });
//     }
//
// };
//
// //Get all posts
// export const getUserPosts = async (req, res) => {
//     const {userId }= req.params;
//     console.log('user id', userId);
//
//     if (!userId) {
//         return res.status(400).json({
//             error: true,
//             message: "User id is required!"
//         });
//     }
//
//     const user = await User.findById(userId);
//
//     if (!user) {
//         return res.status(400).json({
//             error: true,
//             message: "User does nor exist!"
//         });
//     }
//
//     if (!mongoose.Types.ObjectId.isValid(userId)) {
//         return res.status(402).json({
//             error: true,
//             message: `Invalid user id!`
//         });
//     }
//
//     try {
//         return res.status(200).json({
//             error: false,
//             posts: await Post.find({user: userId}).populate('user', 'name')
//         });
//     } catch (e) {
//         return res.status(400).json({
//             error: true,
//             message: `Cannot fetch posts: ${e}`
//         })
//     }
//
// };
