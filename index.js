import express from 'express';
import PocketBase from 'pocketbase';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const pb = new PocketBase(process.env.POCKETBASE_URL);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Authenticate PocketBase once on server start
const authenticate = async () => {
  await pb.collection('_superUsers').authWithPassword(
    process.env.POCKETBASE_ADMIN,
    process.env.POCKETBASE_ADMIN_PASS
  );
};

authenticate().catch(err => {
  console.error('Failed to authenticate with PocketBase:', err);
  process.exit(1);
});

// Route to handle mindset submissions
app.post('/api/mindsets', async (req, res) => {
  const { description, mood } = req.body;
  const token = req.headers['authorization'];

  try {
    pb.authStore.save(token); // Use token from frontend

    const userId = pb.authStore.record.id;

    const record = await pb.collection('mindsets').create({
      description,
      mood,
      user: userId
    });

    res.status(200).json(record);
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: 'Unauthorized or failed to save mindset.' });
  }
});

app.use((req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  pb.authStore.save(token); // Validate user session

  if (!pb.authStore.isValid) {
    return res.status(401).json({ error: "Invalid token, please log in again." });
  }

  next();
});


app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`);
});
