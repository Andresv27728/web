module.exports = {
    name: 'ping',
    description: 'Verifica la latencia del bot',
    usage: '.ping',
    category: 'General',
    
    async execute(client, message, args, settings) {
        const start = Date.now();
        
        const reply = await message.reply('🏓 Calculando ping...');
        
        const latency = Date.now() - start;
        
        const pingText = `
🏓 *PONG!*

⚡ *Latencia:* ${latency}ms
🤖 *Estado:* Activo
📱 *WhatsApp:* Conectado
🌐 *Servidor:* Online

⏰ *Timestamp:* ${new Date().toLocaleString('es-MX')}`;

        await reply.edit(pingText);
    }
};
