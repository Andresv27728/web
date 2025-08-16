module.exports = {
    name: 'help',
    aliases: ['ayuda', 'comandos'],
    description: 'Muestra ayuda detallada sobre comandos',
    usage: '.help [comando]',
    category: 'General',
    
    async execute(client, message, args, settings) {
        if (!args.length) {
            // Mostrar ayuda general
            const helpText = `
🤖 *${settings.botName} - GUÍA DE AYUDA*

┌─「 📋 COMANDOS DISPONIBLES 」
├ *${settings.prefix}menu* - Menú principal
├ *${settings.prefix}ping* - Verificar latencia
├ *${settings.prefix}info* - Información del bot
├ *${settings.prefix}sticker* - Crear stickers
├ *${settings.prefix}weather* - Consultar clima
├ *${settings.prefix}translate* - Traducir texto
├ *${settings.prefix}qr* - Generar código QR
├ *${settings.prefix}download* - Descargar contenido
└ *${settings.prefix}help* - Esta ayuda

┌─「 💡 CÓMO USAR 」
├ *Comandos:* Todos inician con "${settings.prefix}"
├ *Parámetros:* Separados por espacios
├ *Opcional:* Texto entre [corchetes]
└ *Requerido:* Texto entre <chevrones>

┌─「 📚 EJEMPLOS 」
├ ${settings.prefix}weather Mexico City
├ ${settings.prefix}translate en Hola mundo
├ ${settings.prefix}qr https://boxmine.xyz
└ ${settings.prefix}sticker (responder a imagen)

┌─「 🆘 SOPORTE 」
├ *Web:* https://tu-dominio.boxmine.xyz
├ *Owner:* ${settings.owner}
└ *Versión:* ${settings.version}

💡 *Tip:* Usa .help <comando> para ayuda específica
Ejemplo: .help weather`;

            await message.reply(helpText);
            
        } else {
            // Mostrar ayuda específica del comando
            const commandName = args[0].toLowerCase();
            
            const commandHelp = {
                'menu': {
                    usage: '.menu',
                    description: 'Muestra el menú principal con todos los comandos disponibles',
                    examples: ['.menu']
                },
                'ping': {
                    usage: '.ping',
                    description: 'Verifica la latencia y estado de conexión del bot',
                    examples: ['.ping']
                },
                'info': {
                    usage: '.info',
                    description: 'Muestra información detallada sobre el bot, versión y estadísticas',
                    examples: ['.info']
                },
                'sticker': {
                    usage: '.sticker (responder a imagen/video)',
                    description: 'Convierte imágenes o videos en stickers para WhatsApp',
                    examples: [
                        '.sticker (respondiendo a imagen)',
                        '.s (respondiendo a video)',
                        'Enviar imagen con caption .sticker'
                    ]
                },
                'weather': {
                    usage: '.weather <ciudad>',
                    description: 'Obtiene información meteorológica actual de cualquier ciudad',
                    examples: [
                        '.weather Mexico City',
                        '.clima Buenos Aires',
                        '.tiempo Madrid'
                    ]
                },
                'translate': {
                    usage: '.translate <idioma> <texto>',
                    description: 'Traduce texto entre diferentes idiomas usando Google Translate',
                    examples: [
                        '.translate en Hola mundo',
                        '.tr es Hello world',
                        '.translate fr (respondiendo a mensaje)'
                    ]
                },
                'qr': {
                    usage: '.qr <texto>',
                    description: 'Genera códigos QR desde texto, URLs o cualquier información',
                    examples: [
                        '.qr https://boxmine.xyz',
                        '.qrcode Mi información personal',
                        '.qr WhatsApp: +521234567890'
                    ]
                },
                'download': {
                    usage: '.download <url>',
                    description: 'Descarga contenido de YouTube (audio) y otras plataformas',
                    examples: [
                        '.download https://youtube.com/watch?v=abc123',
                        '.dl https://youtu.be/abc123',
                        '.descargar [URL de YouTube]'
                    ]
                },
                'help': {
                    usage: '.help [comando]',
                    description: 'Muestra ayuda general o específica de comandos',
                    examples: [
                        '.help',
                        '.help weather',
                        '.ayuda sticker'
                    ]
                },
                'update': {
                    usage: '.update',
                    description: '⚠️ *SOLO OWNER* - Actualiza el bot y reinicia los servicios',
                    examples: ['.update']
                }
            };
            
            const help = commandHelp[commandName];
            
            if (help) {
                const specificHelp = `
📖 *AYUDA: ${commandName.toUpperCase()}*

📝 *Uso:* ${help.usage}
📋 *Descripción:* ${help.description}

💡 *Ejemplos:*
${help.examples.map(ex => `• ${ex}`).join('\n')}

🔙 *Volver:* Usa .help para ver todos los comandos`;

                await message.reply(specificHelp);
            } else {
                await message.reply(`❌ Comando "${commandName}" no encontrado.\n\n💡 Usa .help para ver todos los comandos disponibles.`);
            }
        }
    }
};
