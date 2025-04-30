import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
    app: {
        application_name: process.env.APPLICATION_NAME,
        application_version: process.env.APPLICATION_VERSION,
    },
    node_env: process.env.NODE_ENV,
    port: process.env.PORT,
    database_url: process.env.DATABASE_URL,
};
