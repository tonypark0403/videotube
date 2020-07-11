import mongoose from 'mongoose';

mongoose.connect(
  'mongodb+srv://test:test@individual-d5ojj.mongodb.net/youtube?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  },
);

const db = mongoose.connection;

const handleOpen = () => console.log('✅ Connected to DB');
const handleError = error => console.log(`❌ Error on DB Connection:${error}`);

db.once('open', handleOpen);
db.on('error', handleError);
