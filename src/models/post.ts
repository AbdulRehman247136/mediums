import mongoose, { Schema, Document, Model, Types } from "mongoose";



export interface IPost extends Document {
  content: string;
    userId: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}


const PostSchema: Schema<IPost> = new Schema(
  {
    content: { type: String, required: true },
      userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
       createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Post: Model<IPost> =
  mongoose.models.Post || mongoose.model<IPost>("Post", PostSchema);

export default Post;
