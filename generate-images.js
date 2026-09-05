import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1. Читаем db.json
const dbPath = path.join(__dirname, 'db.json');
const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));

// Берём товары из массива goods (или products / сам массив)
const productsList = dbData.goods || dbData.products || (Array.isArray(dbData) ? dbData : []);

if (!productsList.length) {
  console.error('❌ Ошибка: В db.json не найдено товаров!');
  process.exit(1);
}

// 2. Создаем папку public/products, если ее нет
const outputDir = path.join(__dirname, 'public', 'products');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

function escapeXml(unsafe) {
  return String(unsafe || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

const categoryColors = {
  furniture: '#f59e0b',
  PC: '#2563eb',
  audio: '#8b5cf6',
  TV: '#dc2626',
  kitchen: '#059669'
};

// 3. Обновляем товары и генерируем SVG
const updatedProducts = productsList.map((product, index) => {
  const id = product.id || index + 1;
  const type = product.type || 'PRODUCT';
  const color = categoryColors[type] || '#4b5563';
  const fileName = `${id}.svg`;
  const filePath = path.join(outputDir, fileName);

  const titleText = escapeXml(product.title || 'Товар');
  const priceText = `${product.price || 0} $`;
  const typeText = escapeXml(type.toUpperCase());

  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">
  <rect width="100%" height="100%" fill="#f3f4f6"/>
  <rect x="20" y="20" width="560" height="360" rx="16" fill="#ffffff" stroke="#e5e7eb" stroke-width="2"/>
  <rect x="40" y="40" width="120" height="32" rx="8" fill="${color}"/>
  <text x="100" y="61" fill="#ffffff" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle">${typeText}</text>
  <text x="300" y="180" fill="#1f2937" font-family="sans-serif" font-size="20" font-weight="bold" text-anchor="middle">
    ${titleText.length > 32 ? titleText.substring(0, 32) + '...' : titleText}
  </text>
  <text x="300" y="240" fill="${color}" font-family="sans-serif" font-size="28" font-weight="bold" text-anchor="middle">${priceText}</text>
</svg>`;

  fs.writeFileSync(filePath, svgContent, 'utf-8');

  return {
    ...product,
    media: [`/products/${fileName}`]
  };
});

// 4. Перезаписываем db.json
if (dbData.goods) {
  dbData.goods = updatedProducts;
} else if (dbData.products) {
  dbData.products = updatedProducts;
}

fs.writeFileSync(dbPath, JSON.stringify(dbData, null, 2), 'utf-8');

console.log('✅ Всё готово! SVG-картинки сгенерированы в public/products/, а db.json обновлён!');