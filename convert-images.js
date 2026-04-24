#!/usr/bin/env node
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = './assets/img';
const outputDir = './assets/img';

const images = [
    { name: 'slider-1.png', formats: ['webp'] },
    { name: 'slider-2.png', formats: ['webp'] },
    { name: 'slider-3.png', formats: ['webp'] },
    { name: 'slider-4.png', formats: ['webp'] },
    { name: 'mini-banner-1.png', formats: ['webp'] },
    { name: 'mini-banner-2.png', formats: ['webp'] },
    { name: 'mini-banner-3.png', formats: ['webp'] },
    { name: 'mini-banner-4.png', formats: ['webp'] },
    { name: 'icone-mapa.png', formats: ['webp'] },
];

async function convertImage(input, output, format) {
    try {
        let pipeline = sharp(input);
        
        if (format === 'webp') {
            pipeline = pipeline.webp({ quality: 80 });
        } else if (format === 'avif') {
            pipeline = pipeline.avif({ quality: 70 });
        }
        
        await pipeline.toFile(output);
        console.log(`✓ Convertido: ${output}`);
    } catch (error) {
        console.error(`✗ Erro em ${input}:`, error.message);
    }
}

async function main() {
    if (!fs.existsSync(inputDir)) {
        console.error('Diretório não encontrado:', inputDir);
        process.exit(1);
    }

    console.log('Iniciando conversão de imagens...\n');

    for (const img of images) {
        const inputPath = path.join(inputDir, img.name);
        
        if (!fs.existsSync(inputPath)) {
            console.log(`⚠ Pulando (não encontrado): ${inputPath}`);
            continue;
        }

        for (const format of img.formats) {
            const outputName = img.name.replace(/\.[^.]+$/, `.${format}`);
            const outputPath = path.join(outputDir, outputName);
            await convertImage(inputPath, outputPath, format);
        }
    }

    console.log('\nConversão concluída!');
}

main();