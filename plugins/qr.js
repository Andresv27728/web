const QRCode = require('qrcode');
const { MessageMedia } = require('whatsapp-web.js');

module.exports = {
    name: 'qr',
    aliases: ['qrcode'],
    description: 'Genera un código QR desde texto',
    usage: '.qr <texto>',
    category: 'Utilidades',
    
    async execute(client, message, args, settings) {
        if (!args.length) {
            return await message.reply('❌ Por favor proporciona el texto para generar el QR.\n\n📝 *Ejemplos:*\n• .qr https://boxmine.xyz\n• .qr Mi texto personalizado\n• .qr WhatsApp: +521234567890');
        }
        
        const text = args.join(' ');
        
        if (text.length > 500) {
            return await message.reply('❌ El texto es demasiado largo. Máximo 500 caracteres.');
        }
        
        try {
            await message.reply('🔄 Generando código QR...');
            
            // Generar QR con alta calidad
            const qrBuffer = await QRCode.toBuffer(text, {
                type: 'png',
                quality: 0.92,
                margin: 1,
                color: {
                    dark: '#000000',
                    light: '#FFFFFF'
                },
                width: 512
            });
            
            // Convertir buffer a MessageMedia
            const media = new MessageMedia('image/png', qrBuffer.toString('base64'), `qr_${Date.now()}.png`);
            
            const qrText = `
📱 *CÓDIGO QR GENERADO*

✅ *Contenido:* ${text.length > 50 ? text.substring(0, 50) + '...' : text}
📏 *Caracteres:* ${text.length}/500
🖼️ *Resolución:* 512x512px
⏰ *Generado:* ${new Date().toLocaleString('es-MX')}

💡 *Tip:* Escanea con la cámara de tu dispositivo`;

            await client.sendMessage(message.from, media, { caption: qrText });
            
        } catch (error) {
            console.error('Error generando QR:', error);
            await message.reply('❌ Error al generar el código QR. Inténtalo de nuevo.');
        }
    }
};
