const ytdl = require('ytdl-core');
const { MessageMedia } = require('whatsapp-web.js');
const axios = require('axios');

module.exports = {
    name: 'download',
    aliases: ['dl', 'descargar'],
    description: 'Descarga contenido de YouTube y otras plataformas',
    usage: '.download <url>',
    category: 'Descargas',
    
    async execute(client, message, args, settings) {
        if (!args.length) {
            return await message.reply('❌ Por favor proporciona una URL para descargar.\n\n📝 *Plataformas soportadas:*\n• YouTube (videos/audio)\n• Instagram (próximamente)\n• TikTok (próximamente)\n\n*Ejemplo:* .download https://youtube.com/watch?v=...');
        }
        
        const url = args[0];
        
        // Validar URL
        if (!this.isValidURL(url)) {
            return await message.reply('❌ URL no válida. Por favor proporciona un enlace válido.');
        }
        
        try {
            await message.reply('🔄 Analizando URL...');
            
            if (ytdl.validateURL(url)) {
                await this.downloadYouTube(client, message, url);
            } else {
                await message.reply('❌ Plataforma no soportada aún. Actualmente solo YouTube está disponible.');
            }
            
        } catch (error) {
            console.error('Error en descarga:', error);
            await message.reply('❌ Error al procesar la descarga. Verifica la URL e inténtalo de nuevo.');
        }
    },
    
    async downloadYouTube(client, message, url) {
        try {
            // Obtener información del video
            const info = await ytdl.getInfo(url);
            const videoDetails = info.videoDetails;
            
            // Verificar duración (máximo 10 minutos para plan gratuito)
            if (parseInt(videoDetails.lengthSeconds) > 600) {
                return await message.reply('❌ El video es demasiado largo (máximo 10 minutos). Esto es para evitar sobrecargar el servidor gratuito.');
            }
            
            const infoText = `
🎥 *VIDEO ENCONTRADO*

📝 *Título:* ${videoDetails.title}
👤 *Canal:* ${videoDetails.author.name}
⏱️ *Duración:* ${this.formatDuration(videoDetails.lengthSeconds)}
👀 *Vistas:* ${this.formatNumber(videoDetails.viewCount)}
📅 *Publicado:* ${videoDetails.publishDate}

🎵 Enviando audio... (para ahorrar ancho de banda)`;

            await message.reply(infoText);
            
            // Descargar solo audio para ahorrar recursos
            const audioStream = ytdl(url, {
                filter: 'audioonly',
                quality: 'lowest', // Calidad más baja para plan gratuito
            });
            
            const chunks = [];
            audioStream.on('data', chunk => chunks.push(chunk));
            
            audioStream.on('end', async () => {
                try {
                    const buffer = Buffer.concat(chunks);
                    
                    // Verificar tamaño (máximo 16MB para WhatsApp)
                    if (buffer.length > 16000000) {
                        return await message.reply('❌ El archivo es demasiado grande para enviar por WhatsApp.');
                    }
                    
                    const media = new MessageMedia('audio/mp4', buffer.toString('base64'), `${videoDetails.title.substring(0, 30)}.m4a`);
                    
                    await client.sendMessage(message.from, media);
                    
                } catch (error) {
                    console.error('Error enviando audio:', error);
                    await message.reply('❌ Error al enviar el audio.');
                }
            });
            
            audioStream.on('error', async (error) => {
                console.error('Error descargando audio:', error);
                await message.reply('❌ Error al descargar el audio. El video podría no estar disponible.');
            });
            
        } catch (error) {
            console.error('Error obteniendo info de YouTube:', error);
            await message.reply('❌ Error al obtener información del video. Verifica que la URL sea correcta.');
        }
    },
    
    isValidURL(string) {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    },
    
    formatDuration(seconds) {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        
        if (hrs > 0) {
            return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        } else {
            return `${mins}:${secs.toString().padStart(2, '0')}`;
        }
    },
    
    formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    }
};
