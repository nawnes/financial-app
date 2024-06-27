const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

describe('Database Connection', () => {
  let mongoServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  it('should successfully connect to the in-memory MongoDB server', async () => {
    const connectionState = mongoose.connection.readyState;
    expect(connectionState).toBe(1); // 1 signifie que Mongoose est connecté
  });

  it('should perform a simple insert and read operation', async () => {
    const testSchema = new mongoose.Schema({ name: String });
    const TestModel = mongoose.model('Test', testSchema);

    // Insérer un document
    const testDoc = new TestModel({ name: 'Test Document' });
    await testDoc.save();

    // Lire le document
    const foundDoc = await TestModel.findOne({ name: 'Test Document' });
    expect(foundDoc).toBeTruthy();
    expect(foundDoc.name).toBe('Test Document');
  });
});
