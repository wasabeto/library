import mongoose, { Schema } from 'mongoose';
import mongooseKeywords from 'mongoose-keywords';

const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    author: {
      name: String,
      age: Number,
      books: Number,
    },
    published: {
      type: Number,
    },
  }
);

bookSchema.methods = {
  view(full) {
    const view = {
      // simple view
      id: this.id,
      title: this.title,
      genre: this.genre,
      author: this.author,
      published: this.published,
    };

    return full
      ? {
          ...view,
          // add properties for a full view
        }
      : view;
  },
};

bookSchema.plugin(mongooseKeywords, { paths: ['title', 'genre'] });

const model = mongoose.model('Book', bookSchema);

export const schema = model.schema;
export default model;
