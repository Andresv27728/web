const { MessageMedia } = require('whatsapp-web.js');

module.exports = {
    name: 'sticker',
    aliases: ['s', 'stiker'],
    description: 'Convierte imagen o video a sticker',
    usage: '.sticker (responder a imagen/video)',
    category: 'Convertir',
    
    async execute(client, message, args, settings) {
        // Verificar si hay media adjunto o citado
        let media = null;
        
        if (message.hasQuotedMsg) {
            const quotedMsg = await message.getQuotedMessage();
            if (quotedMsg.hasMedia) {
                media = await quotedMsg.downloadMedia();
            }
        } else if (message.hasMedia) {
            media = await message.downloadMedia();
        }
        
        if (!media) {
            return await message.reply('❌ Por favor responde a una imagen o video, o envía una imagen con el comando.\n\n📝 *Uso:* .sticker (respondiendo a una imagen)');
        }
        
        // Verificar tipo de archivo
        if (!media.mimetype.startsWith('image/') && !media.mimetype.startsWith('video/')) {
            return await message.reply('❌ Solo se admiten imágenes y videos para crear stickers.');
        }
        
        // Verificar tamaño del archivo (max 2MB para stickers)
        if (media.data.length > 2000000) {
            return await message.reply('❌ El archivo es demasiado grande. El tamaño máximo es 2MB.');
        }
        
        try {
            await message.reply('🎨 Creando sticker...');
            
            // Configurar opciones del sticker
            const stickerOptions = {
                pack: settings.botName,
                author: 'BoxMine Bot',
                type: 'default',
                categories: ['🤖'],
                quality: 60
            };
            
            // Para videos, limitar duración
            if (media.mimetype.startsWith('video/')) {
                stickerOptions.type = 'video';
            }
            
            // Enviar como sticker
            await client.sendMessage(message.from, media, {
                sendMediaAsSticker: true,
                stickerMetadata: stickerOptions
            });
            
        } catch (error) {
            console.error('Error creando sticker:', error);
            await message.reply('❌ Error al crear el sticker. Inténtalo de nuevo.');
        }
    }
};
