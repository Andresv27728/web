const translate = require('google-translate-api');

module.exports = {
    name: 'translate',
    aliases: ['tr', 'traducir'],
    description: 'Traduce texto a otro idioma',
    usage: '.translate <idioma> <texto> o responder a un mensaje',
    category: 'Utilidades',
    
    async execute(client, message, args, settings) {
        let textToTranslate = '';
        let targetLang = 'es';
        
        // Si responde a un mensaje
        if (message.hasQuotedMsg) {
            const quotedMsg = await message.getQuotedMessage();
            textToTranslate = quotedMsg.body;
            targetLang = args[0] || 'es';
        } else {
            // Si proporciona texto directamente
            if (args.length < 2) {
                return await message.reply(`❌ Uso incorrecto.\n\n📝 *Ejemplos:*\n• .translate en Hola mundo\n• .translate es (respondiendo a mensaje)\n\n🌐 *Idiomas comunes:*\nes = Español, en = Inglés, fr = Francés\npt = Portugués, it = Italiano, de = Alemán\nja = Japonés, ko = Coreano, zh = Chino`);
            }
            
            targetLang = args[0];
            textToTranslate = args.slice(1).join(' ');
        }
        
        if (!textToTranslate.trim()) {
            return await message.reply('❌ No hay texto para traducir.');
        }
        
        try {
            await message.reply('🌐 Traduciendo...');
            
            const result = await translate(textToTranslate, { to: targetLang });
            
            const languageNames = {
                'es': 'Español',
                'en': 'Inglés',
                'fr': 'Francés',
                'pt': 'Portugués',
                'it': 'Italiano',
                'de': 'Alemán',
                'ja': 'Japonés',
                'ko': 'Coreano',
                'zh': 'Chino',
                'ru': 'Ruso',
                'ar': 'Árabe'
            };
            
            const fromLang = languageNames[result.from.language.iso] || result.from.language.iso.toUpperCase();
            const toLang = languageNames[targetLang] || targetLang.toUpperCase();
            
            const translateText = `
🌐 *TRADUCCIÓN*

┌─「 📝 ORIGINAL (${fromLang}) 」
└ ${textToTranslate}

┌─「 ✅ TRADUCIDO (${toLang}) 」
└ ${result.text}

🔍 *Confianza:* ${Math.round((result.from.text.autoCorrected ? 0.8 : 1) * 100)}%
⏰ *Procesado:* ${new Date().toLocaleTimeString('es-MX')}`;

            await message.reply(translateText);
            
        } catch (error) {
            console.error('Error traduciendo:', error);
            
            if (error.code === 'BAD_REQUEST') {
                await message.reply('❌ Idioma de destino no válido.\n\n🌐 Usa códigos como: es, en, fr, pt, it, de, ja, ko, zh');
            } else {
                await message.reply('❌ Error al traducir el texto. Inténtalo de nuevo.');
            }
        }
    }
};
