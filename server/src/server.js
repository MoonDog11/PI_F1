const server = express();

server.use(morgan("dev"));
server.use(express.json());

// Configurar CORS
server.use(cors({
  origin: "https://pi-f1.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Middleware para manejar opciones preflight
server.options('*', cors());

// Usar tus rutas
server.use(router);

module.exports = server;
