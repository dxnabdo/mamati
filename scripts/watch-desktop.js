// scripts/watchDesktop.js
const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');

// تعريف المجلدات التي سيتم مراقبتها
const watchConfigs = [
  {
    source: path.join(require('os').homedir(), 'Desktop', 'BAL-MA-PR'),
    target: path.join(__dirname, '..', 'public', 'BAL-MA-PR'),
    validator: (filename) => {
      // صيغة المنتجات العادية والأطقم
      const pattern = /^(sets_(boy|girl)_[\w\d]+_\d+_\d+|(boy|girls|women)_[\w\d]+_\d+_\d+)\.(png|jpg|jpeg)$/i;
      return pattern.test(filename);
    },
    parser: (filename) => {
      // نفس التحليل السابق
      const setsMatch = filename.match(/^sets_(boy|girl)_([\w\d]+)_(\d+)_(\d+)\./i);
      if (setsMatch) return { faction: 'sets', gender: setsMatch[1], size: setsMatch[2], price: setsMatch[3], serial: setsMatch[4] };
      const oldMatch = filename.match(/^(boy|girls|women)_([\w\d]+)_(\d+)_(\d+)\./i);
      if (oldMatch) return { faction: oldMatch[1], name: oldMatch[2], price: oldMatch[3], serial: oldMatch[4] };
      return null;
    }
  },
  {
    source: path.join(require('os').homedir(), 'Desktop', 'BAL-MA-MARKET'),
    target: path.join(__dirname, '..', 'public', 'BAL-MA-MARKET'),
    validator: (filename) => {
      // صيغة منتجات الماركت: النوع_المقاس_السعر_الرقم.jpg (المقاس اختياري)
      const pattern = /^([a-zA-Z0-9]+)(?:_[a-zA-Z0-9]+)?_\d+_\d+\.(png|jpg|jpeg)$/i;
      return pattern.test(filename);
    },
    parser: (filename) => {
      const parts = filename.replace(/\.[^/.]+$/, '').split('_');
      let type, size, price, serial;
      if (parts.length === 3) {
        // type_price_serial
        [type, price, serial] = parts;
        size = null;
      } else if (parts.length >= 4) {
        // type_size_price_serial
        [type, size, price, serial] = parts;
      } else {
        return null;
      }
      return { type, size, price: parseInt(price), serial, faction: 'market' };
    }
  }
];

// التأكد من وجود المجلدات الهدف
const ensureDirectories = () => {
  watchConfigs.forEach(cfg => {
    if (!fs.existsSync(cfg.source)) fs.mkdirSync(cfg.source, { recursive: true });
    if (!fs.existsSync(cfg.target)) fs.mkdirSync(cfg.target, { recursive: true });
  });
};

// نسخ ملف صالح إلى المجلد الهدف
const copyFile = (filePath, config) => {
  const fileName = path.basename(filePath);
  if (!config.validator(fileName)) return false;

  const destPath = path.join(config.target, fileName);
  if (fs.existsSync(destPath)) return false;

  fs.copyFileSync(filePath, destPath);
  console.log(`✅ تم رفع ${fileName} إلى ${path.basename(config.target)}`);
  return true;
};

// حذف الملف من المجلد الهدف عند حذفه من المصدر
const deleteFile = (filePath, config) => {
  const fileName = path.basename(filePath);
  const destPath = path.join(config.target, fileName);
  if (fs.existsSync(destPath)) fs.unlinkSync(destPath);
};

// فحص الملفات الموجودة مسبقاً في كل مجلد مصدر
const scanExistingFiles = () => {
  watchConfigs.forEach(cfg => {
    if (!fs.existsSync(cfg.source)) return;
    const files = fs.readdirSync(cfg.source).filter(f => /\.(jpg|jpeg|png)$/i.test(f));
    files.forEach(f => copyFile(path.join(cfg.source, f), cfg));
  });
};

// بدء مراقبة جميع المجلدات
const startWatching = () => {
  ensureDirectories();
  scanExistingFiles();

  watchConfigs.forEach(cfg => {
    const watcher = chokidar.watch(cfg.source, { persistent: true, ignoreInitial: true });
    watcher.on('add', (filePath) => copyFile(filePath, cfg));
    watcher.on('change', (filePath) => copyFile(filePath, cfg));
    watcher.on('unlink', (filePath) => deleteFile(filePath, cfg));
    console.log(`👀 جاري مراقبة الصور في: ${cfg.source}`);
  });
};

if (require.main === module) startWatching();
module.exports = { startWatching, copyFile, deleteFile, watchConfigs };