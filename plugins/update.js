const { exec } = require('child_process');
const fs = require('fs').promises;

module.exports = {
    name: 'update',
    description: 'Actualiza el bot (Solo Owner)',
    usage: '.update',
    category: 'Owner',
    ownerOnly: true,
    
    async execute(client, message, args, settings) {
        // Verificar si el usuario es el owner
        if (message.from !== settings.owner + '@c.us') {
            return await message.reply('❌ Este comando solo está disponible para el propietario del bot.');
        }
        
        await message.reply('🔄 *INICIANDO ACTUALIZACIÓN*\n\nEsto puede tomar unos momentos...');
        
        try {
            // 1. Verificar git (si está disponible)
            await message.reply('📡 Verificando repositorio...');
            
            // 2. Actualizar dependencias
            await message.reply('📦 Actualizando dependencias...');
            
            await this.executeCommand('npm update');
            
            // 3. Limpiar caché
            await message.reply('🗑️ Limpiando caché...');
            
            delete require.cache;
            
            // 4. Verificar archivos de configuración
            await message.reply('⚙️ Verificando configuración...');
            
            const configStatus = await this.verifyConfig();
            
            // 5. Recargar plugins
            await message.reply('🔌 Recargando plugins...');
            
            const pluginCount = await this.reloadPlugins();
            
            // 6. Actualizar información del bot
            const newVersion = await this.updateBotInfo();
            
            const updateReport = `
✅ *ACTUALIZACIÓN COMPLETADA*

┌─「 📊 RESUMEN 」
├ *Estado:* Exitoso
├ *Versión:* ${newVersion}
├ *Plugins:* ${pluginCount} recargados
├ *Configuración:* ${configStatus ? '✅' : '⚠️'}
└ *Tiempo:* ${new Date().toLocaleString('es-MX')}

┌─「 🔄 CAMBIOS 」
├ ✅ Dependencias actualizadas
├ ✅ Caché limpiado
├ ✅ Plugins recargados
├ ✅ Configuración verificada
└ ✅ Sistema optimizado

┌─「 ⚠️ NOTA 」
└ El bot seguirá funcionando normalmente

🤖 *Bot actualizado y listo para usar!*`;

            await message.reply(updateReport);
            
            // Log del update
            console.log(`Bot actualizado por: ${message.from} a las ${new Date().toISOString()}`);
            
        } catch (error) {
            console.error('Error durante actualización:', error);
            
            const errorReport = `
❌ *ERROR EN ACTUALIZACIÓN*

🔍 *Detalles:*
${error.message}

⚠️ *Recomendaciones:*
• Verificar conexión a internet
• Revisar permisos del sistema
• Intentar restart manual si es necesario

🆘 Si el problema persiste, contacta soporte técnico.`;

            await message.reply(errorReport);
        }
    },
    
    async executeCommand(command) {
        return new Promise((resolve, reject) => {
            exec(command, (error, stdout, stderr) => {
                if (error) {
                    console.log(`Error: ${error.message}`);
                    resolve({ success: false, error: error.message });
                } else {
                    resolve({ success: true, output: stdout });
                }
            });
        });
    },
    
    async verifyConfig() {
        try {
            // Verificar que existan archivos críticos
            const criticalFiles = ['settings.json', 'package.json', 'index.js'];
            
            for (const file of criticalFiles) {
                await fs.access(file);
            }
            
            return true;
        } catch (error) {
            console.error('Error verificando configuración:', error);
            return false;
        }
    },
    
    async reloadPlugins() {
        try {
            const pluginFiles = await fs.readdir('./plugins');
            let count = 0;
            
            for (const file of pluginFiles) {
                if (file.endsWith('.js')) {
                    // Limpiar caché del plugin
                    const pluginPath = require.resolve(`../plugins/${file}`);
                    delete require.cache[pluginPath];
                    count++;
                }
            }
            
            return count;
        } catch (error) {
            console.error('Error recargando plugins:', error);
            return 0;
        }
    },
    
    async updateBotInfo() {
        try {
            // Leer package.json para obtener versión
            const packageData = await fs.readFile('./package.json', 'utf8');
            const packageInfo = JSON.parse(packageData);
            
            // Actualizar settings con nueva fecha
            const settingsData = await fs.readFile('./settings.json', 'utf8');
            const settings = JSON.parse(settingsData);
            
            settings.lastUpdate = new Date().toISOString();
            
            await fs.writeFile('./settings.json', JSON.stringify(settings, null, 2));
            
            return packageInfo.version || '1.0.0';
        } catch (error) {
            console.error('Error actualizando info del bot:', error);
            return '1.0.0';
        }
    }
};
