import mongoose, { Schema, Document, Model, Types } from "mongoose";



export interface IPost extends Document {
  content: string;
    userId: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
    claps:number;
    likedids: {
      userId: Types.ObjectId;
      name: string;
    }[];
}


const PostSchema: Schema<IPost> = new Schema(
  {
    content: { type: String, required: true },
    claps:{ type: Number, default: 0 },
      userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
      likedids: [
        {
          userId: { type: Schema.Types.ObjectId, ref: "User" },
          name: { type: String },
        },
      ],
      
       createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Post: Model<IPost> =
  mongoose.models.Post || mongoose.model<IPost>("Post", PostSchema);

export default Post;
