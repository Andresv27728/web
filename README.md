# 🦈 Gawr Gura WhatsApp Bot

*"A! El mejor bot del océano está aquí!"*

Bot avanzado de WhatsApp con interfaz web, sistema de subbots y panel de administración completo, inspirado en la famosa VTuber tiburón de Hololive.

## ✨ Características Principales

- 🦈 **Temática Gawr Gura** con mensajes y emojis únicos
- 🚀 **10+ Comandos básicos** totalmente funcionales
- 🤖 **Sistema de Subbots** con vinculación de 8 dígitos
- 🌐 **Interfaz Web moderna** con estadísticas en tiempo real
- 📊 **Panel de Administración** con gestor de archivos completo
- 🔐 **Sistema de autenticación** seguro (contraseña: gawrgura)
- 📱 **Vinculación QR** y código de 8 dígitos para subbots
- 🎨 **Diseño responsivo** optimizado para móvil y PC
- ☁️ **100% Optimizado** para Render/Vercel plan gratuito

## 🏗️ Arquitectura del Proyecto

```
gawr-gura-bot/
├── 📄 index.js              # Servidor principal (Express + WhatsApp Web.js)
├── 📦 package.json          # Dependencias y scripts
├── ⚙️  settings.json         # Configuración centralizada
│
├── 🔌 plugins/              # Sistema de comandos modular
│   ├── menu.js              # Menú principal del bot
│   ├── ping.js              # Verificación de latencia
│   ├── info.js              # Información del bot
│   ├── sticker.js           # Creador de stickers
│   ├── weather.js           # Información meteorológica
│   ├── translate.js         # Traductor multi-idioma
│   ├── qr.js                # Generador de códigos QR
│   ├── download.js          # Descargador de YouTube
│   ├── help.js              # Sistema de ayuda
│   └── update.js            # Actualizador del bot (Owner)
│
├── 🌐 public/               # Interfaz web
│   ├── index.html           # Dashboard principal
│   └── subbot.html          # Panel de estadísticas subbot
│
├── 📁 uploads/              # Archivos temporales
├── 🐳 Dockerfile            # Contenedor Docker
├── ☁️  vercel.json          # Configuración Vercel
├── 🚀 render.yaml           # Configuración Render
├── 📋 .gitignore            # Archivos ignorados
└── 📖 README.md             # Esta documentación
```

## 🚀 Instalación Completa

### 📋 Requisitos Previos

- Node.js 16+ (recomendado 18+)
- Cuenta en WhatsApp
- Dominio o subdominio (para BoxMine: `bot.tu-dominio.boxmine.xyz`)

### 🎯 Opción 1: Render (Más Fácil - Recomendado)

1. **📥 Prepara el código**:
   ```bash
   git clone https://github.com/tu-usuario/gawr-gura-bot
   cd gawr-gura-bot
   ```

2. **🔗 Conecta a Render**:
   - Ve a [render.com](https://render.com) y crea cuenta
   - New → Web Service
   - Connect your GitHub repository
   - Selecciona el repositorio del bot

3. **⚙️ Configuración en Render**:
   ```
   Name: gawr-gura-whatsapp-bot
   Environment: Node
   Region: Oregon (más estable)
   Branch: main
   
   Build Command: npm install
   Start Command: npm start
   
   Instance Type: Free
   ```

4. **🌍 Variables de entorno** (Environment Variables):
   ```
   NODE_ENV=production
   PORT=10000
   PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
   ```

5. **🚀 Deploy**:
   - Click "Deploy Web Service"
   - Espera 5-10 minutos
   - Tu bot estará en: `https://tu-app.onrender.com`

### 🌟 Opción 2: Vercel (Serverless)

1. **📦 Instala Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **🚀 Deploy directo**:
   ```bash
   cd gawr-gura-bot
   vercel --prod
   ```

3. **⚡ Deploy automático**:
   - Conecta GitHub a Vercel
   - Import Project → Select repo
   - Deploy automático en cada push

### 🏠 Opción 3: Servidor BoxMine

1. **🔐 Acceso SSH**:
   ```bash
   ssh usuario@tu-servidor.boxmine.xyz
   ```

2. **📥 Clona e instala**:
   ```bash
   cd /var/www/
   git clone https://github.com/tu-usuario/gawr-gura-bot
   cd gawr-gura-bot
   npm install --production
   ```

3. **🌐 Configura subdominio en BoxMine**:
   - Panel → Subdominios
   - Crear: `bot.tu-dominio.boxmine.xyz`
   - Proxy to: `http://localhost:3000`
   - SSL: Habilitado

4. **🔄 Mantén activo con PM2**:
   ```bash
   npm install -g pm2
   pm2 start index.js --name "gawr-gura-bot"
   pm2 startup
   pm2 save
   ```

5. **📊 Monitoreo**:
   ```bash
   pm2 status              # Ver estado
   pm2 logs gawr-gura-bot  # Ver logs
   pm2 restart all         # Reiniciar
   ```

## ⚙️ Configuración Detallada

### 🎛️ settings.json - Configuración Principal

```json
{
  "botName": "Gawr Gura Bot",
  "owner": "521234567890",        // ⚠️ CAMBIAR: Tu número sin '+'
  "prefix": ".",                  // Prefijo de comandos
  "adminPassword": "gawrgura",    // Contraseña del panel admin
  "maxSubbots": 50,               // Límite de subbots
  "autoResponse": true,           // Respuestas automáticas
  
  "welcomeMessage": "A! Soy Gawr Gura Bot 🦈\n\nUsa .menu para ver los comandos disponibles.",
  
  "ownerCommands": ["update", "restart", "eval", "broadcast"],
  "moderators": ["521234567890"],
  "blockedNumbers": [],
  
  "groupSettings": {
    "antilink": false,
    "antispam": true,
    "welcome": true
  },
  
  "apiKeys": {
    "openweather": "tu_api_key_openweather",  // Para comando .weather
    "youtube": "tu_api_key_youtube"           // Para comando .download
  },
  
  "limits": {
    "daily": {
      "messages": 100,
      "commands": 50
    }
  },
  
  "maintenance": false,
  "version": "1.0.0",
  "features": {
    "subbots": true,
    "fileManager": true,
    "statistics": true,
    "webInterface": true
  }
}
```

### 📋 Variables de Entorno Opcionales

```bash
# .env (si usas dotenv)
NODE_ENV=production
PORT=3000
OWNER_NUMBER=521234567890
ADMIN_PASSWORD=gawrgura

# Para APIs externas
OPENWEATHER_API_KEY=tu_key
YOUTUBE_API_KEY=tu_key
```

## 🎮 Uso del Bot - Guía Completa

### 📱 1. Primera Vinculación

1. **🌐 Abre la interfaz web**: `https://tu-dominio.boxmine.xyz`
2. **📊 Ve las estadísticas**: Mensajes, usuarios, uptime
3. **📱 Sección QR**: Encuentra el código QR
4. **📲 En WhatsApp**:
   - Configuración → Dispositivos vinculados
   - "Vincular un dispositivo"
   - Escanea el QR
5. **✅ ¡Conectado!**: El estado cambiará a "Conectado"

### 🤖 2. Comandos Disponibles

#### 📋 Comandos Básicos
```
.menu      - Menú principal con todos los comandos
.ping      - Verificar latencia y estado del bot
.info      - Información detallada del bot
.help      - Ayuda general o específica: .help weather
```

#### 🎨 Comandos de Contenido
```
.sticker   - Crear sticker (responder a imagen/video)
.qr        - Generar QR: .qr https://boxmine.xyz
.weather   - Ver clima: .weather Tokyo
.translate - Traducir: .translate en ¿Cómo estás?
.download  - Descargar YouTube: .download [URL]
```

#### 👑 Comandos de Owner
```
.update    - Actualizar el bot y recargar plugins
```

### 🤖 3. Sistema de Subbots

#### ✨ Crear Subbot
1. **🌐 Desde la web**:
   - Botón "Crear Subbot"
   - Opcional: Código de 8 dígitos
   - Click "Crear"

2. **📱 Desde WhatsApp**:
   ```
   .subbot create
   .subbot create 12345678  # Con código personalizado
   ```

#### 📊 Gestionar Subbots
- **🔗 Link enviado**: Al crear subbot se envía link al owner
- **📈 Estadísticas independientes**: Cada subbot tiene sus métricas
- **⚙️ Configuración separada**: Settings independientes

### 🔐 4. Panel de Administración

#### 🚪 Acceso
1. **🌐 Interfaz web** → Botón "Admin"
2. **🔑 Contraseña**: `gawrgura`
3. **✅ Acceso concedido**

#### 📁 Gestor de Archivos
- **📤 Subir archivos**: Drag & drop o click
- **🗑️ Eliminar archivos**: Botón de papelera
- **👀 Ver estructura**: Todos los archivos del proyecto
- **📱 Compatible móvil**: Funciona en celular

## 🛠️ Desarrollo y Personalización

### 💻 Entorno de Desarrollo Local

```bash
# Clonar repositorio
git clone https://github.com/tu-usuario/gawr-gura-bot
cd gawr-gura-bot

# Instalar dependencias
npm install

# Modo desarrollo (auto-restart)
npm run dev

# Modo producción
npm start

# Abrir interfaz web
open http://localhost:3000
```

### 🔧 Estructura de Comandos

Cada comando sigue esta estructura estándar:

```javascript
// plugins/ejemplo.js
module.exports = {
    name: 'ejemplo',                    // Nombre del comando
    aliases: ['ej', 'test'],           // Alias alternativos
    description: 'Comando de ejemplo',  // Descripción
    usage: '.ejemplo <texto>',          // Como usar
    category: 'General',               // Categoría
    ownerOnly: false,                  // Solo owner?
    
    async execute(client, message, args, settings) {
        // Tu código aquí
        await message.reply('¡Hola mundo!');
    }
};
```

## 📝 Cómo Crear un Nuevo Comando

### 🎯 Guía Paso a Paso

#### 1️⃣ **Crear el Archivo del Comando**

Crea `plugins/saludo.js`:

```javascript
module.exports = {
    name: 'saludo',
    aliases: ['hola', 'hi'],
    description: 'Saluda al usuario de manera personalizada',
    usage: '.saludo [nombre]',
    category: 'Social',
    
    async execute(client, message, args, settings) {
        // Obtener nombre del usuario o argumento
        const userName = args[0] || message._data.notifyName || 'Chumbud';
        
        // Array de saludos temáticos de Gura
        const saludos = [
            `A! Hola ${userName}! 🦈`,
            `¿Cómo estás, ${userName}? Same desu~ ✨`,
            `¡${userName}! ¿Ya comiste hoy? 🍔`,
            `Konnichiwa ${userName}-san! 🌸`,
            `A A A! ¡Es ${userName}! 🎵`
        ];
        
        // Seleccionar saludo aleatorio
        const saludoAleatorio = saludos[Math.floor(Math.random() * saludos.length)];
        
        // Responder con el saludo
        await message.reply(saludoAleatorio);
    }
};
```

#### 2️⃣ **Comando Más Avanzado**

Ejemplo: `plugins/shark.js` - Datos sobre tiburones

```javascript
const axios = require('axios');

module.exports = {
    name: 'shark',
    aliases: ['tiburon', 'same'],
    description: 'Datos curiosos sobre tiburones como Gura!',
    usage: '.shark [tipo]',
    category: 'Educativo',
    
    async execute(client, message, args, settings) {
        try {
            const tipo = args[0] || 'random';
            
            // Base de datos de tiburones
            const tiburones = {
                'random': [
                    '🦈 Los tiburones han existido durante más de 400 millones de años',
                    '🦈 Un tiburón puede detectar una gota de sangre en 100 litros de agua',
                    '🦈 Los tiburones no tienen huesos, solo cartílago',
                    '🦈 Algunos tiburones deben nadar constantemente para respirar'
                ],
                'gura': [
                    '🦈 Gawr Gura mide 141cm (sin contar la cola)',
                    '🦈 Su comida favorita son las galletas y hamburguesas',
                    '🦈 Puede cantar muy bien pero dice "A" mucho',
                    '🦈 Es la VTuber con más suscriptores en YouTube'
                ],
                'megalodon': [
                    '🦈 El Megalodón podía medir hasta 18 metros',
                    '🦈 Sus dientes podían medir 18cm de largo',
                    '🦈 Se extinguió hace aproximadamente 3.6 millones de años',
                    '🦈 Era uno de los depredadores más grandes que existió'
                ]
            };
            
            const datos = tiburones[tipo] || tiburones['random'];
            const datoAleatorio = datos[Math.floor(Math.random() * datos.length)];
            
            const respuesta = `
🦈 *DATOS DE TIBURONES*

${datoAleatorio}

💡 *Tip:* Usa .shark gura para datos de Gura
A A A! 🎵`;

            await message.reply(respuesta);
            
        } catch (error) {
            console.error('Error en comando shark:', error);
            await message.reply('A... algo salió mal con los datos de tiburones 😅');
        }
    }
};
```

#### 3️⃣ **Comando con API Externa**

Ejemplo: `plugins/anime.js` - Información de anime

```javascript
const axios = require('axios');

module.exports = {
    name: 'anime',
    aliases: ['animu'],
    description: 'Busca información de anime',
    usage: '.anime <nombre>',
    category: 'Entretenimiento',
    
    async execute(client, message, args, settings) {
        if (!args.length) {
            return await message.reply('A! Necesito el nombre del anime 🦈\n\n📝 *Uso:* .anime Hololive');
        }
        
        const animeName = args.join(' ');
        
        try {
            await message.reply('🔍 Buscando anime...');
            
            // Usar API gratuita de Jikan (MyAnimeList)
            const response = await axios.get(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(animeName)}&limit=1`);
            
            if (response.data.data.length === 0) {
                return await message.reply('❌ No encontré ese anime. ¿Seguro que existe? 🤔');
            }
            
            const anime = response.data.data[0];
            
            const animeInfo = `
🎌 *${anime.title}*

📅 *Año:* ${anime.year || 'Desconocido'}
⭐ *Score:* ${anime.score || 'N/A'}/10
📺 *Episodios:* ${anime.episodes || 'Desconocido'}
🎭 *Género:* ${anime.genres.map(g => g.name).slice(0, 3).join(', ')}
📖 *Estado:* ${anime.status}

📝 *Sinopsis:*
${anime.synopsis ? anime.synopsis.substring(0, 200) + '...' : 'Sin información'}

🔗 *MyAnimeList:* ${anime.url}

A! Espero que te guste~ 🦈✨`;

            await message.reply(animeInfo);
            
        } catch (error) {
            console.error('Error buscando anime:', error);
            
            if (error.response?.status === 429) {
                await message.reply('⏰ Muchas consultas, inténtalo en un momento');
            } else {
                await message.reply('❌ Error buscando el anime. Inténtalo después');
            }
        }
    }
};
```

#### 4️⃣ **Comando con Archivos**

Ejemplo: `plugins/meme.js` - Generador de memes

```javascript
const { MessageMedia } = require('whatsapp-web.js');
const axios = require('axios');

module.exports = {
    name: 'meme',
    description: 'Genera memes aleatorios',
    usage: '.meme [categoria]',
    category: 'Diversión',
    
    async execute(client, message, args, settings) {
        try {
            await message.reply('🎭 Generando meme...');
            
            // API gratuita de memes
            const response = await axios.get('https://api.imgflip.com/get_memes');
            const memes = response.data.data.memes;
            
            // Seleccionar meme aleatorio
            const memeAleatorio = memes[Math.floor(Math.random() * memes.length)];
            
            // Descargar imagen
            const imageResponse = await axios.get(memeAleatorio.url, {
                responseType: 'arraybuffer'
            });
            
            // Crear MessageMedia
            const media = new MessageMedia(
                'image/jpeg',
                Buffer.from(imageResponse.data).toString('base64'),
                'meme.jpg'
            );
            
            // Enviar con caption
            await client.sendMessage(message.from, media, {
                caption: `🎭 *${memeAleatorio.name}*\n\nA! Espero que te guste este meme 🦈`
            });
            
        } catch (error) {
            console.error('Error generando meme:', error);
            await message.reply('❌ Error generando meme. Inténtalo después');
        }
    }
};
```

### 🔄 **Recargar Comandos Sin Reiniciar**

El bot tiene un sistema de recarga automática, pero también puedes:

```javascript
// Función para recargar plugins manualmente
async function reloadPlugin(pluginName) {
    const pluginPath = `./plugins/${pluginName}.js`;
    delete require.cache[require.resolve(pluginPath)];
    return require(pluginPath);
}
```

### 📋 **Buenas Prácticas para Comandos**

1. **✅ Siempre manejar errores**:
   ```javascript
   try {
       // Tu código
   } catch (error) {
       console.error('Error:', error);
       await message.reply('❌ Algo salió mal');
   }
   ```

2. **✅ Validar argumentos**:
   ```javascript
   if (!args.length) {
       return await message.reply('❌ Necesito argumentos');
   }
   ```

3. **✅ Usar async/await**:
   ```javascript
   async execute(client, message, args, settings) {
       await message.reply('Procesando...');
       // Tu código asíncrono
   }
   ```

4. **✅ Temática coherente**:
   ```javascript
   // Usar emojis y frases de Gura
   await message.reply('A! Comando ejecutado 🦈');
   ```

## 🚨 Solución de Problemas

### ❌ Problemas Comunes

#### 🔌 Bot no conecta
```bash
# Verificar logs
pm2 logs gawr-gura-bot

# Reiniciar
pm2 restart gawr-gura-bot

# Verificar puerto
netstat -tulpn | grep :3000
```

#### 📱 QR no aparece
- ✅ Verificar que el bot no esté ya conectado
- ✅ Refrescar la página web
- ✅ Revisar logs del servidor

#### 🤖 Comandos no responden
- ✅ Verificar prefijo en `settings.json`
- ✅ Comprobar que los archivos estén en `/plugins`
- ✅ Revisar permisos del owner

#### 🌐 Interfaz web no carga
- ✅ Verificar que el puerto esté abierto
- ✅ Comprobar configuración del proxy
- ✅ Revisar CORS en el servidor

#### 💾 Panel admin no funciona
- ✅ Contraseña correcta: "gawrgura"
- ✅ Verificar conexión HTTPS
- ✅ Limpiar caché del navegador

### 🔧 Comandos de Mantenimiento

```bash
# Ver estado del bot
pm2 status

# Logs en tiempo real
pm2 logs gawr-gura-bot --lines 100

# Reiniciar bot
pm2 restart gawr-gura-bot

# Detener bot
pm2 stop gawr-gura-bot

# Actualizar desde GitHub
git pull origin main
npm install
pm2 restart gawr-gura-bot

# Ver uso de recursos
pm2 monit

# Backup de configuración
cp settings.json settings.backup.json
```

## 📈 Optimizaciones y Rendimiento

### ⚡ Para Plan Gratuito

- **🎯 Puppeteer optimizado**: Configurado para usar mínima RAM
- **📦 Dependencies mínimas**: Solo lo esencial
- **🗄️ Sin base de datos**: Todo en memoria y archivos JSON
- **⏱️ Timeouts ajustados**: Evitar bloqueos

### 📊 Monitoring

```javascript
// Agregar en index.js para monitoreo
setInterval(() => {
    const memUsage = process.memoryUsage();
    console.log(`Memoria: ${Math.round(memUsage.heapUsed / 1024 / 1024)}MB`);
}, 300000); // Cada 5 minutos
```

## 🛡️ Seguridad

### 🔐 Medidas Implementadas

- ✅ **Autenticación por contraseña** en panel admin
- ✅ **Validación de owner** para comandos sensibles  
- ✅ **Sanitización de inputs** en todos los comandos
- ✅ **Rate limiting básico** para evitar spam
- ✅ **CORS configurado** para la web
- ✅ **Validación de archivos** en el uploader

### 🚨 Recomendaciones

1. **🔑 Cambia las contraseñas por defecto**
2. **📱 Mantén actualizado el número del owner**
3. **🔒 Usa HTTPS siempre que sea posible**
4. **📋 Revisa logs regularmente**
5. **🔄 Haz backups de la configuración**

## 📊 Estadísticas y Analytics

### 📈 Métricas Disponibles

- **📩 Mensajes procesados** (total y por comando)
- **👥 Usuarios únicos** que han usado el bot
- **⏰ Tiempo de actividad** (uptime)
- **🤖 Número de subbots** activos
- **⚡ Latencia promedio** de respuestas

### 📊 Dashboard Web

La interfaz web muestra en tiempo real:
- Estado de conexión con WhatsApp
- Estadísticas de uso
- Código QR para vinculación
- Gestión de subbots
- Panel de administración

## 🤝 Contribuir al Proyecto

### 🔄 Proceso de Contribución

1. **🍴 Fork** el repositorio
2. **🌿 Crear rama**: `git checkout -b feature/nueva-funcionalidad`
3. **💾 Commit**: `git commit -m 'Add: nueva funcionalidad'`
4. **📤 Push**: `git push origin feature/nueva-funcionalidad`
5. **🔄 Pull Request** con descripción detallada

### 💡 Ideas para Contribuir

- 🎮 Nuevos comandos (juegos, utilidades, etc.)
- 🎨 Mejoras en la interfaz web
- 🐛 Corrección de bugs
- 📚 Documentación mejorada
- 🔧 Optimizaciones de rendimiento

## 📄 Licencia

**MIT License** - Puedes usar, modificar y distribuir libremente.

Ver archivo `LICENSE` para más detalles.

## 🆘
