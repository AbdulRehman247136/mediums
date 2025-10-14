import mongoose, { Schema, Document, Model } from "mongoose";



export interface IPost extends Document {
  content: string;
    name: string;
    email: string;
    image?: string;
    createdAt: Date;
    updatedAt: Date;
}


const PostSchema: Schema<IPost> = new Schema(
  {
    content: { type: String, required: true },
      name: { type: String, required: true },
      email: { type: String, required:true },
      image: { type: String,  },
       createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Post: Model<IPost> =
  mongoose.models.Post || mongoose.model<IPost>("Post", PostSchema);

export default Post;
