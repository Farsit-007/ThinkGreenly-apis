import { Server } from 'http';
import app from './app';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let server: Server | null = null;

const port = 5000;
// Application bootstrap function
async function bootstrap() {
  try {
    server = app.listen(port, () => {
      console.log(`🚀 Application is running on port ${port}!  ✨  ⚡`);
    });
  } catch (error) {
    console.error('😈 Error during bootstrap:', error);
  }
}

bootstrap();
