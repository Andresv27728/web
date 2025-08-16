const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode');
const express = require('express');
const path = require('path');
const fs = require('fs').promises;
const multer = require('multer');
const settings = require('./settings.json');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración del bot principal y subbots
let mainBot = null;
let subbots = new Map();
let qrCodeData = '';
let botStats = {
    messages: 0,
    users: new Set(),
    uptime: Date.now()
};

// Storage para archivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

// Función para cargar plugins
async function loadPlugins() {
    const plugins = {};
    try {
        const pluginFiles = await fs.readdir('./plugins');
        for (const file of pluginFiles) {
            if (file.endsWith('.js')) {
                const pluginName = file.replace('.js', '');
                delete require.cache[require.resolve(`./plugins/${file}`)];
                plugins[pluginName] = require(`./plugins/${file}`);
            }
        }
    } catch (error) {
        console.error('Error cargando plugins:', error);
    }
    return plugins;
}

// Función para crear bot
function createBot(isSubbot = false, subbotId = null) {
    const client = new Client({
        authStrategy: new LocalAuth({
            clientId: isSubbot ? `subbot_${subbotId}` : 'main_bot'
        }),
        puppeteer: {
            headless: true,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-accelerated-2d-canvas',
                '--no-first-run',
                '--no-zygote',
                '--single-process',
                '--disable-gpu'
            ]
        }
    });

    client.on('qr', (qr) => {
        if (!isSubbot) {
            qrCodeData = qr;
            qrcode.toDataURL(qr, (err, url) => {
                if (!err) {
                    console.log('QR generado para bot principal');
                }
            });
        }
    });

    client.on('ready', async () => {
        console.log(`${isSubbot ? 'Subbot' : 'Bot principal'} conectado exitosamente!`);
        
        if (isSubbot) {
            // Enviar link de estadísticas al subbot
            const ownerNumber = settings.owner + '@c.us';
            const statsLink = `https://tu-dominio.boxmine.xyz/subbot/${subbotId}`;
            await client.sendMessage(ownerNumber, `🤖 *Subbot vinculado exitosamente!*\n\n📊 Ver estadísticas: ${statsLink}\n🆔 ID: ${subbotId}`);
        }
    });

    client.on('message', async (message) => {
        if (message.from === 'status@broadcast') return;

        // Actualizar estadísticas
        if (!isSubbot) {
            botStats.messages++;
            botStats.users.add(message.from);
        }

        const plugins = await loadPlugins();
        const body = message.body.toLowerCase();
        const args = body.split(' ');
        const command = args[0];

        // Verificar si es un comando
        if (command.startsWith(settings.prefix)) {
            const cmd = command.slice(settings.prefix.length);
            
            // Ejecutar plugin si existe
            if (plugins[cmd]) {
                try {
                    await plugins[cmd].execute(client, message, args.slice(1), settings);
                } catch (error) {
                    console.error(`Error ejecutando comando ${cmd}:`, error);
                    await message.reply('❌ Error ejecutando el comando.');
                }
            }
        }
    });

    return client;
}

// Inicializar bot principal
function initMainBot() {
    mainBot = createBot();
    mainBot.initialize();
}

// Crear subbot
function createSubBot() {
    const subbotId = Math.random().toString(36).substr(2, 8);
    const subbot = createBot(true, subbotId);
    subbots.set(subbotId, {
        client: subbot,
        stats: { messages: 0, users: new Set(), createdAt: Date.now() }
    });
    subbot.initialize();
    return subbotId;
}

// Rutas de la API
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/qr', (req, res) => {
    if (qrCodeData) {
        qrcode.toDataURL(qrCodeData, (err, url) => {
            if (err) {
                res.json({ success: false, error: 'Error generando QR' });
            } else {
                res.json({ success: true, qr: url });
            }
        });
    } else {
        res.json({ success: false, error: 'QR no disponible' });
    }
});

app.get('/api/stats', (req, res) => {
    const uptime = Date.now() - botStats.uptime;
    res.json({
        success: true,
        stats: {
            messages: botStats.messages,
            users: botStats.users.size,
            uptime: Math.floor(uptime / 1000),
            subbots: subbots.size,
            botName: settings.botName,
            isConnected: mainBot && mainBot.info ? true : false
        }
    });
});

app.post('/api/create-subbot', (req, res) => {
    try {
        const subbotId = createSubBot();
        res.json({ success: true, subbotId });
    } catch (error) {
        res.json({ success: false, error: error.message });
    }
});

app.get('/subbot/:id', (req, res) => {
    const subbotId = req.params.id;
    if (subbots.has(subbotId)) {
        res.sendFile(path.join(__dirname, 'public', 'subbot.html'));
    } else {
        res.status(404).send('Subbot no encontrado');
    }
});

app.get('/api/subbot/:id/stats', (req, res) => {
    const subbotId = req.params.id;
    if (subbots.has(subbotId)) {
        const subbot = subbots.get(subbotId);
        const uptime = Date.now() - subbot.stats.createdAt;
        res.json({
            success: true,
            stats: {
                messages: subbot.stats.messages,
                users: subbot.stats.users.size,
                uptime: Math.floor(uptime / 1000),
                subbotId
            }
        });
    } else {
        res.json({ success: false, error: 'Subbot no encontrado' });
    }
});

// Panel de administración
app.post('/api/admin/login', (req, res) => {
    const { password } = req.body;
    if (password === 'gawrgura') {
        res.json({ success: true, token: 'admin_authenticated' });
    } else {
        res.json({ success: false, error: 'Contraseña incorrecta' });
    }
});

app.get('/api/admin/files', (req, res) => {
    const { auth } = req.headers;
    if (auth !== 'admin_authenticated') {
        return res.status(401).json({ error: 'No autorizado' });
    }

    fs.readdir('./')
        .then(files => {
            const fileList = files.map(file => ({
                name: file,
                type: file.includes('.') ? 'file' : 'directory'
            }));
            res.json({ success: true, files: fileList });
        })
        .catch(err => {
            res.json({ success: false, error: err.message });
        });
});

app.delete('/api/admin/files/:filename', (req, res) => {
    const { auth } = req.headers;
    if (auth !== 'admin_authenticated') {
        return res.status(401).json({ error: 'No autorizado' });
    }

    const filename = req.params.filename;
    fs.unlink(filename)
        .then(() => {
            res.json({ success: true });
        })
        .catch(err => {
            res.json({ success: false, error: err.message });
        });
});

app.post('/api/admin/files', upload.single('file'), (req, res) => {
    const { auth } = req.headers;
    if (auth !== 'admin_authenticated') {
        return res.status(401).json({ error: 'No autorizado' });
    }

    if (req.file) {
        res.json({ success: true, filename: req.file.filename });
    } else {
        res.json({ success: false, error: 'No se pudo subir el archivo' });
    }
});

// Crear directorio uploads si no existe
fs.mkdir('uploads', { recursive: true }).catch(console.error);

// Inicializar bot
initMainBot();

app.listen(PORT, () => {
    console.log(`🤖 Bot de WhatsApp ejecutándose en puerto ${PORT}`);
    console.log(`📱 Interfaz web disponible en http://localhost:${PORT}`);
});

module.exports = { app, mainBot, subbots };
