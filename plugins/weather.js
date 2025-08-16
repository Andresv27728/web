const axios = require('axios');

module.exports = {
    name: 'weather',
    aliases: ['clima', 'tiempo'],
    description: 'Obtiene información del clima de una ciudad',
    usage: '.weather <ciudad>',
    category: 'Utilidades',
    
    async execute(client, message, args, settings) {
        if (!args.length) {
            return await message.reply('❌ Por favor especifica una ciudad.\n\n📝 *Uso:* .weather Mexico City');
        }
        
        const city = args.join(' ');
        
        try {
            await message.reply('🌤️ Obteniendo información del clima...');
            
            // API gratuita de OpenWeatherMap (requiere key)
            const apiKey = settings.apiKeys?.openweather || 'demo_key';
            const url = `http://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric&lang=es`;
            
            const response = await axios.get(url);
            const data = response.data;
            
            // Emojis para condiciones climáticas
            const getWeatherEmoji = (weather) => {
                const condition = weather.toLowerCase();
                if (condition.includes('sun') || condition.includes('clear')) return '☀️';
                if (condition.includes('cloud')) return '☁️';
                if (condition.includes('rain')) return '🌧️';
                if (condition.includes('storm')) return '⛈️';
                if (condition.includes('snow')) return '❄️';
                if (condition.includes('mist') || condition.includes('fog')) return '🌫️';
                return '🌤️';
            };
            
            const weatherEmoji = getWeatherEmoji(data.weather[0].description);
            
            const weatherText = `
${weatherEmoji} *CLIMA EN ${data.name.toUpperCase()}*

┌─「 🌡️ TEMPERATURA 」
├ *Actual:* ${Math.round(data.main.temp)}°C
├ *Sensación:* ${Math.round(data.main.feels_like)}°C
├ *Mínima:* ${Math.round(data.main.temp_min)}°C
└ *Máxima:* ${Math.round(data.main.temp_max)}°C

┌─「 📊 CONDICIONES 」
├ *Descripción:* ${data.weather[0].description}
├ *Humedad:* ${data.main.humidity}%
├ *Presión:* ${data.main.pressure} hPa
└ *Viento:* ${Math.round(data.wind?.speed * 3.6 || 0)} km/h

┌─「 🌅 SOL 」
├ *Amanecer:* ${new Date(data.sys.sunrise * 1000).toLocaleTimeString('es-MX')}
└ *Atardecer:* ${new Date(data.sys.sunset * 1000).toLocaleTimeString('es-MX')}

📍 *Coordenadas:* ${data.coord.lat}, ${data.coord.lon}
⏰ *Consultado:* ${new Date().toLocaleString('es-MX')}`;

            await message.reply(weatherText);
            
        } catch (error) {
            console.error('Error obteniendo clima:', error);
            
            if (error.response?.status === 404) {
                await message.reply('❌ Ciudad no encontrada. Verifica el nombre e inténtalo de nuevo.');
            } else if (error.response?.status === 401) {
                await message.reply('❌ API Key no válida. Contacta al administrador.');
            } else {
                await message.reply('❌ Error al obtener información del clima. Inténtalo más tarde.');
            }
        }
    }
};
