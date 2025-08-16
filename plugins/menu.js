module.exports = {
    name: 'menu',
    description: 'Muestra el menú de comandos disponibles',
    usage: '.menu',
    category: 'General',
    
    async execute(client, message, args, settings) {
        const menuText = `
🤖 *${settings.botName}* - Menu Principal

┌─「 📋 COMANDOS BÁSICOS 」
├ ${settings.prefix}menu - Ver este menú
├ ${settings.prefix}ping - Verificar latencia
├ ${settings.prefix}info - Información del bot
├ ${settings.prefix}sticker - Crear sticker
├ ${settings.prefix}weather - Ver clima
├ ${settings.prefix}translate - Traducir texto
├ ${settings.prefix}qr - Generar código QR
├ ${settings.prefix}download - Descargar contenido
└ ${settings.prefix}help - Ayuda detallada

┌─「 🔧 OWNER ONLY 」
├ ${settings.prefix}update - Actualizar bot
└ ${settings.prefix}restart - Reiniciar bot

┌─「 📊 ESTADÍSTICAS 」
├ Total usuarios: En desarrollo
├ Mensajes procesados: En desarrollo
└ Uptime: En desarrollo

💻 *Interfaz Web:* https://
🆔 *Versión:* ${settings.version}

_Desarrollado para test_`;

        await message.reply(menuText);
    }
};
