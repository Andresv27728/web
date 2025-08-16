module.exports = {
    name: 'info',
    description: 'Muestra información detallada del bot',
    usage: '.info',
    category: 'General',
    
    async execute(client, message, args, settings) {
        const uptime = process.uptime();
        const hours = Math.floor(uptime / 3600);
        const minutes = Math.floor((uptime % 3600) / 60);
        const seconds = Math.floor(uptime % 60);
        
        const botInfo = await client.info;
        
        const infoText = `
🤖 *INFORMACIÓN DEL BOT*

┌─「 📱 DATOS BÁSICOS 」
├ *Nombre:* ${settings.botName}
├ *Versión:* ${settings.version}
├ *Prefijo:* ${settings.prefix}
├ *Plataforma:* ${botInfo ? botInfo.platform : 'WhatsApp Web'}
└ *WA Version:* ${botInfo ? botInfo.wa_version : 'N/A'}

┌─「 ⏰ TIEMPO ACTIVO 」
├ *Uptime:* ${hours}h ${minutes}m ${seconds}s
├ *Iniciado:* ${new Date(Date.now() - uptime * 1000).toLocaleString('es-MX')}
└ *Zona horaria:* ${Intl.DateTimeFormat().resolvedOptions().timeZone}

┌─「 🔧 CARACTERÍSTICAS 」
├ *Subbots:* ✅ Habilitado
├ *Panel Web:* ✅ Activo
├ *Auto-respuestas:* ${settings.autoResponse ? '✅' : '❌'}
├ *Modo mantenimiento:* ${settings.maintenance ? '⚠️ Activo' : '❌ Inactivo'}
└ *Comandos disponibles:* 10+

┌─「 🌐 ENLACES 」
├ *Panel:* https://tu-dominio.boxmine.xyz
├ *GitHub:* En desarrollo
└ *Soporte:* @owner

_Bot desarrollado para BoxMine 🚀_`;

        await message.reply(infoText);
    }
};
