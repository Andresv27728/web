module.exports = {
    name: 'gura',
    aliases: ['same', 'shark', 'a'],
    description: 'Información y datos curiosos sobre Gawr Gura!',
    usage: '.gura [facts|stats|song|quote]',
    category: 'Gawr Gura',
    
    async execute(client, message, args, settings) {
        const option = args[0]?.toLowerCase() || 'random';
        
        try {
            switch (option) {
                case 'facts':
                    await this.sendFacts(message);
                    break;
                    
                case 'stats':
                    await this.sendStats(message);
                    break;
                    
                case 'song':
                    await this.sendSong(message);
                    break;
                    
                case 'quote':
                    await this.sendQuote(message);
                    break;
                    
                default:
                    await this.sendRandom(message);
            }
            
        } catch (error) {
            console.error('Error en comando gura:', error);
            await message.reply('A... algo salió mal en el océano 😅🦈');
        }
    },
    
    async sendFacts(message) {
        const facts = [
            '🦈 Gura es oficialmente la VTuber con más suscriptores en YouTube',
            '📏 Mide 141cm (sin incluir la cola de tiburón)',
            '🎂 Su cumpleaños es el 20 de junio',
            '🍔 Le encantan las hamburguesas y las galletas',
            '🎮 Es muy buena jugando rythm games',
            '🎵 Su voz de canto es increíblemente bella',
            '🦈 Los tiburones han existido por más de 400 millones de años',
            '🌊 Viene de la ciudad perdida de Atlantis',
            '📺 Debutó en Hololive English el 13 de septiembre de 2020',
            '💙 Su color representativo es el azul océano'
        ];
        
        const randomFact = facts[Math.floor(Math.random() * facts.length)];
        
        const factMessage = `
🦈 *DATOS CURIOSOS DE GURA*

${randomFact}

💡 *¿Sabías que?* Los tiburones pueden detectar una gota de sangre en 100 litros de agua... ¡pero Gura solo detecta hamburguesas! 🍔

A A A! 🎵`;

        await message.reply(factMessage);
    },
    
    async sendStats(message) {
        // Estadísticas aproximadas (estas se actualizarían con API real)
        const stats = `
📊 *ESTADÍSTICAS DE GAWR GURA*

┌─「 📺 YOUTUBE 」
├ 🔴 Suscriptores: 4.2M+
├ 👀 Vistas totales: 200M+
├ 🎬 Videos: 500+
└ ⭐ Streams regulares

┌─「 🎮 GAMING 」
├ 🎯 Rhythm games PRO
├ 🎣 Minecraft builder
├ 😱 Horror games... scared
└ 🏆 Apex Legends skilled

┌─「 🎵 MÚSICA 」
├ 🎤 Karaoke streams populares
├ 🎼 "Reflect" - canción original
├ 🎸 Ukulele player
└ 🎶 Voz angelical confirmada

┌─「 🦈 DATO ÉPICO 」
└ ¡Primer VTuber en alcanzar 4M subs!

Same desu~ ✨`;

        await message.reply(stats);
    },
    
    async sendSong(message) {
        const songs = [
            {
                title: 'Reflect',
                description: 'Su emotiva canción original',
                emoji: '💙'
            },
            {
                title: 'City Pop Karaoke',
                description: 'Sus increíbles covers de city pop',
                emoji: '🌃'
            },
            {
                title: 'Ride on Time',
                description: 'Cover clásico que enamoró a todos',
                emoji: '🎶'
            },
            {
                title: 'Country Roads',
                description: 'El cover que nos hizo llorar',
                emoji: '🛤️'
            },
            {
                title: 'Fly Me to the Moon',
                description: 'Jazz que llega al corazón',
                emoji: '🌙'
            }
        ];
        
        const randomSong = songs[Math.floor(Math.random() * songs.length)];
        
        const songMessage = `
🎵 *MÚSICA DE GURA*

${randomSong.emoji} *${randomSong.title}*
${randomSong.description}

🎤 *¿Por qué es especial?*
La voz de Gura tiene la capacidad única de transmitir emociones profundas. Cuando canta, todo el océano se calma para escucharla.

🎵 *Tip:* Busca sus karaoke streams en YouTube para experimentar la magia completa.

A! My voice is... not bad, right? 🦈✨`;

        await message.reply(songMessage);
    },
    
    async sendQuote(message) {
        const quotes = [
            {
                text: 'A',
                context: 'La palabra más icónica del internet'
            },
            {
                text: 'Same desu~',
                context: 'Cuando está de acuerdo con algo'
            },
            {
                text: 'I\'m not a loli!',
                context: 'Defendiendo su honor de tiburón adulto'
            },
            {
                text: 'Shrimp? Where?',
                context: 'Cuando menciona a sus queridos chumbuds'
            },
            {
                text: 'I\'m stuff',
                context: 'Meme interno que adoptó completamente'
            },
            {
                text: 'Atlantis is real!',
                context: 'Defendiendo su ciudad natal'
            },
            {
                text: 'Math is hard...',
                context: 'Luchando con números en stream'
            },
            {
                text: 'Can you guys hear me?',
                context: 'Problemas técnicos clásicos'
            }
        ];
        
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        
        const quoteMessage = `
💬 *CITA ICÓNICA DE GURA*

🦈 "${randomQuote.text}"

📝 *Contexto:* ${randomQuote.context}

✨ *¿Por qué es memorable?*
Cada frase de Gura se convierte en meme instantáneo gracias a su personalidad única y su delivery perfecto.

A! Did I say something weird? 🤔`;

        await message.reply(quoteMessage);
    },
    
    async sendRandom(message) {
        const randomMessages = [
            `🦈 A! ¿Conocías a la mejor tiburón del océano?\n\n✨ Usa .gura facts para datos curiosos!`,
            `🎵 La voz de Gura puede calmar cualquier tormenta~\n\n🎤 Prueba .gura song para música!`,
            `📊 ¿Quieres saber qué tan increíble es Gura?\n\n📈 Usa .gura stats para estadísticas!`,
            `💙 Las mejores citas vienen del corazón del océano\n\n💬 Prueba .gura quote para frases icónicas!`,
            `🦈 Same desu~ ¿Todo bien, chumbud?\n\nA A A! 🎵`
        ];
        
        const randomMsg = randomMessages[Math.floor(Math.random() * randomMessages.length)];
        
        const fullMessage = `
${randomMsg}

┌─「 🦈 COMANDOS GURA 」
├ .gura facts - Datos curiosos
├ .gura stats - Estadísticas 
├ .gura song - Información musical
├ .gura quote - Citas icónicas
└ .gura - Mensaje aleatorio

🌊 ¡El océano siempre tiene más secretos que compartir!`;

        await message.reply(fullMessage);
    }
};
