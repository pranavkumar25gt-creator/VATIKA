import fs from 'fs';
import path from 'path';
import https from 'https';
import sharp from 'sharp';

// Helper to download image to buffer
function fetchBuffer(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchBuffer(res.headers.location).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to fetch ${url}: Status ${res.statusCode}`));
      }
      const chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    }).on('error', reject);
  });
}

// Convert RGB to Hex
function rgbToHex(r, g, b) {
  return '#' + [r, g, b].map(x => {
    const hex = Math.round(x).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
}

async function processImage(url, destRelativePath, maxWidth = 1920) {
  const destPath = path.join(process.cwd(), 'public', destRelativePath);
  const dir = path.dirname(destPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  try {
    console.log(`Downloading: ${url.slice(0, 70)}... -> ${destRelativePath}`);
    const buf = await fetchBuffer(url);

    // Process with sharp: resize, convert to WebP, extract dominant stats
    const image = sharp(buf);
    const metadata = await image.metadata();
    const stats = await image.stats();

    // Dominant color
    const dominantColor = rgbToHex(
      stats.channels[0].mean,
      stats.channels[1].mean,
      stats.channels[2].mean
    );

    // Resize if width > maxWidth
    let pipeline = image;
    if (metadata.width && metadata.width > maxWidth) {
      pipeline = pipeline.resize({ width: maxWidth, withoutEnlargement: true });
    }

    await pipeline
      .webp({ quality: 86, effort: 5 })
      .toFile(destPath);

    const finalMeta = await sharp(destPath).metadata();
    console.log(`✓ Saved ${destRelativePath} (${finalMeta.width}x${finalMeta.height}, dominant: ${dominantColor})`);

    return {
      src: `/${destRelativePath.replace(/\\/g, '/')}`,
      width: finalMeta.width,
      height: finalMeta.height,
      dominantColor,
      success: true
    };
  } catch (err) {
    console.error(`✗ Error processing ${url}:`, err.message);
    return { success: false, error: err.message };
  }
}

async function main() {
  console.log('--- Starting Real Photo Download & Ingestion Pipeline ---');

  const photoResults = [];

  // 1. Exterior & Lawn / Dining Ambience Photos from Google Maps & Zomato
  const mainEstablishmentPhotos = [
    {
      id: 'zomato-hero-building',
      url: 'https://b.zmtcdn.com/data/pictures/0/19159650/81c3e0c9c2792b67ea521383d0a5b42e.jpg',
      dest: 'assets/photos/exterior/facade-twilight.webp',
      category: 'exterior',
      altEn: 'Hotel Vatika illuminated building and entrance at twilight',
      altMr: 'संध्याकाळच्या वेळी हॉटेल वाटिकाची भव्य रोषणाई',
      altHi: 'गोधूलि वेला में होटल वाटिका का भव्य स्वरूप'
    },
    {
      id: 'zomato-entrance-lawn',
      url: 'https://b.zmtcdn.com/data/pictures/0/19159650/216f56188b2e2037b033167dae728d1d.jpg',
      dest: 'assets/photos/exterior/entrance-warm.webp',
      category: 'exterior',
      altEn: 'Hotel Vatika welcoming entrance porch and lush greenery',
      altMr: 'हॉटेल वाटिकाचे निसर्गरम्य स्वागत दालन व प्रवेशद्वार',
      altHi: 'होटल वाटिका का प्राकृतिक स्वागत द्वार और हरा-भरा प्रांगण'
    },
    {
      id: 'google-dining-sanctuary',
      url: 'https://lh3.googleusercontent.com/grass-cs/AABkmLfsC7EzlkC4ndtPyywv-AF2qYWfZmJRx1W6LHHd-NOKYGZQ6L9i8r9yj-HvEshZvMu-g6hgK7qs2qfYJmJxjfRBw7mhXxE6FZ8K1YdZCj64JLu35JNDSOwegq75yaG0wi-kq-3UzTrSncig=w1920-h1080',
      dest: 'assets/photos/interior/main-dining-hall.webp',
      category: 'interior',
      altEn: 'Main dining hall and family seating sanctuary at Hotel Vatika',
      altMr: 'हॉटेल वाटिकाचे प्रशस्त कौटुंबिक डायनिंग दालन',
      altHi: 'होटल वाटिका का विशाल पारिवारिक डाइनिंग हॉल'
    },
    {
      id: 'google-brass-decor',
      url: 'https://lh3.googleusercontent.com/grass-cs/AABkmLcJAtaz69WnnVH8HUBJwbJgxcBoQnkXob_kmoWcIx4dTFPwpmWQgwyr63a9gxGx8hCjnYhpfcdkdUTKrkVLhyF0ws40YIW5NgnFTnIFlT0JIWhymlg6EHbouSF2HwzRaFg1TSW7sGqzpDFs=w1600-h1200',
      dest: 'assets/photos/interior/brass-handi-counter.webp',
      category: 'interior',
      altEn: 'Authentic dining seating and warm ambience',
      altMr: 'उबदार प्रकाश आणि अस्सल बैठक व्यवस्था',
      altHi: 'पारंपरिक बैठक व्यवस्था और शांत वातावरण'
    },
    {
      id: 'google-hall-banquet',
      url: 'https://lh3.googleusercontent.com/grass-cs/AABkmLeho_jYJm8_GGO-rR9EdCgGFm_EwLh5B6tP8-mQIbh2v_f4oJN25L1Gh9ZNoNXb5DiSR94k9-Z0LKq9Th0xf5BJIurYYf526bIOBtGAFhlCmePWEzQ0xOkojH8f5sf-Z158JwPNWBFr-hM=w1920-h1080',
      dest: 'assets/photos/hall/banquet-hall-stage.webp',
      category: 'hall',
      altEn: 'Hotel Vatika spacious celebration hall arranged for family gathering',
      altMr: 'कौटुंबिक व मंगल कार्यासाठी हॉटेल वाटिकाचा भव्य सेलिब्रेशन हॉल',
      altHi: 'पारिवारिक उत्सव और आयोजनों के लिए भव्य बैंक्वेट हॉल'
    },
    {
      id: 'google-hall-events',
      url: 'https://lh3.googleusercontent.com/grass-cs/AABkmLcZUJZsTPVfrzDpxeriom44dM02vohkIdXtHLbwd0x2ozk-L-_iw3AFGXogeoQt-_Im5qxjP-7ItmOxWQgFvF8Biazrm_ICJ_QTOQjNdBkTb0Noj8YvFRj52Hk4qgcrnkqs7_JVZBH5pGg=w1920-h1080',
      dest: 'assets/photos/hall/birthday-setup.webp',
      category: 'event',
      altEn: 'Birthday and celebratory party setup at Hotel Vatika',
      altMr: 'वाढदिवस व पार्टी सोहळ्याची सुंदर सजावट',
      altHi: 'जन्मदिन और उत्सव की आकर्षक व्यवस्था'
    },
    {
      id: 'google-outdoor-lawn',
      url: 'https://lh3.googleusercontent.com/grass-cs/AABkmLcSjhHKr6SU-oCwRqc7dQrE1ew4z-9_YfgR1tqbpEoB53y7hyQ_lHHGfS_sJjfe_lbtfORuonNs0cvOA8-xY6r20o9gmX8VnAeg55xh6Sv6M3ma4s4cG2Brg2-vjRti_v5oC-nVqsBwrE7N=w1920-h1080',
      dest: 'assets/photos/hall/kitty-party-setup.webp',
      category: 'event',
      altEn: 'Evening outdoor seating and social gatherings',
      altMr: 'संध्याकाळची खुली बैठक आणि स्नेहमिलन व्यवस्था',
      altHi: 'शाम के समय खुले प्रांगण में मित्र मिलन व्यवस्था'
    }
  ];

  for (const item of mainEstablishmentPhotos) {
    const res = await processImage(item.url, item.dest, 1920);
    if (res.success) {
      photoResults.push({
        id: item.id,
        src: res.src,
        category: item.category,
        alt: { en: item.altEn, mr: item.altMr, hi: item.altHi },
        dominantColor: res.dominantColor,
        dimensions: { width: res.width, height: res.height },
        isRealAssetProvided: true
      });
    }
  }

  // 2. Real Food Dishes from Zomato (Clean, Original Full-Res URLs without crop query)
  const realDishes = [
    {
      id: 'vatika-special-veg',
      url: 'https://b.zmtcdn.com/data/dish_photos/ccc/6bb8255dc8f6b2acd7fccbdb0e7b5ccc.jpeg',
      dest: 'assets/photos/food/vatika-special.webp',
      nameEn: 'Vatika Special Veg',
      nameMr: 'वाटिका स्पेशल व्हेज',
      nameHi: 'वाटिका स्पेशल वेज'
    },
    {
      id: 'vatika-special-macro',
      url: 'https://b.zmtcdn.com/data/dish_photos/ccc/6bb8255dc8f6b2acd7fccbdb0e7b5ccc.jpeg',
      dest: 'assets/photos/food/vatika-special-macro.webp',
      nameEn: 'Vatika Special Veg Plating',
      nameMr: 'वाटिका स्पेशल व्हेज सर्व्हिंग',
      nameHi: 'वाटिका स्पेशल वेज'
    },
    {
      id: 'malai-methi',
      url: 'https://b.zmtcdn.com/data/dish_photos/62c/4ca97b2af79784114dd4747a492ed62c.jpeg',
      dest: 'assets/photos/food/malai-methi.webp',
      nameEn: 'Malai Methi',
      nameMr: 'मलाई मेथी',
      nameHi: 'मलाई मेथी'
    },
    {
      id: 'navratan-kurma',
      url: 'https://b.zmtcdn.com/data/dish_photos/f98/cf7c0f5789071e8b7065d6f87778ef98.jpeg',
      dest: 'assets/photos/food/navratan-kurma.webp',
      nameEn: 'Navratan Kurma',
      nameMr: 'नवरत्न कुरमा',
      nameHi: 'नवरत्न कुरमा'
    },
    {
      id: 'sev-masala',
      url: 'https://b.zmtcdn.com/data/dish_photos/f8b/90d5aee7ffa856dbd63cffe043d46f8b.jpeg',
      dest: 'assets/photos/food/sev-bhaji.webp',
      nameEn: 'Sev Bhaji / Sev Masala',
      nameMr: 'शेव भाजी / शेव मसाला',
      nameHi: 'सेव भाजी / सेव मसाला'
    },
    {
      id: 'veg-bhuna',
      url: 'https://b.zmtcdn.com/data/dish_photos/27b/67de13f935344ca97a76400e3781f27b.jpeg',
      dest: 'assets/photos/food/paneer-angara.webp',
      nameEn: 'Paneer Angara / Veg Bhuna',
      nameMr: 'पनीर अंगारा / व्हेज भुना',
      nameHi: 'पनीर अंगारा / वेज भुना'
    },
    {
      id: 'paneer-angara-macro',
      url: 'https://b.zmtcdn.com/data/dish_photos/27b/67de13f935344ca97a76400e3781f27b.jpeg',
      dest: 'assets/photos/food/paneer-angara-macro.webp',
      nameEn: 'Paneer Angara Macro',
      nameMr: 'पनीर अंगारा मॅक्रो',
      nameHi: 'पनीर अंगारा'
    },
    {
      id: 'tawa-bhaji',
      url: 'https://b.zmtcdn.com/data/dish_photos/513/723f9fec8f5c2ec990ece0e9383e7513.jpeg',
      dest: 'assets/photos/food/pav-bhaji.webp',
      nameEn: 'Tawa Bhaji',
      nameMr: 'तवा भाजी',
      nameHi: 'तवा भाजी'
    },
    {
      id: 'dal-fry',
      url: 'https://b.zmtcdn.com/data/dish_photos/45e/14b704acd26f122ebe4ac2f9eded045e.jpg',
      dest: 'assets/photos/food/curd.webp',
      nameEn: 'Dal Fry Tadka',
      nameMr: 'दाल फ्राय तडका',
      nameHi: 'दाल फ्राई तड़का'
    },
    {
      id: 'baingan-masala',
      url: 'https://b.zmtcdn.com/data/dish_photos/e06/88e681a26c2eb3b8486b4c07f84afe06.jpeg',
      dest: 'assets/photos/food/baingan-bharta.webp',
      nameEn: 'Baingan Masala / Bharta',
      nameMr: 'वांग्याचे भरीत / बैंगन मसाला',
      nameHi: 'बैंगन भर्ता / बैंगन मसाला'
    },
    {
      id: 'chana-masala',
      url: 'https://b.zmtcdn.com/data/dish_photos/d0c/0f8c5eb30e32f04beb8c896dbb532d0c.jpeg',
      dest: 'assets/photos/food/thecha.webp',
      nameEn: 'Chana Masala',
      nameMr: 'चना मसाला',
      nameHi: 'चना मसाला'
    },
    {
      id: 'mushroom-masala',
      url: 'https://b.zmtcdn.com/data/dish_photos/ed5/54bfed8d26111e69839b41386d7bfed5.jpeg',
      dest: 'assets/photos/food/kadai-mushroom.webp',
      nameEn: 'Mushroom Masala Kadai',
      nameMr: 'मशरूम मसाला कढई',
      nameHi: 'मशरूम मसाला कढ़ाई'
    },
    {
      id: 'mushroom-handi',
      url: 'https://b.zmtcdn.com/data/dish_photos/c9e/2b962ecd953ddf8108a4555213b11c9e.jpeg',
      dest: 'assets/photos/food/mushroom-handi.webp',
      nameEn: 'Mushroom Handi',
      nameMr: 'मशरूम हांडी',
      nameHi: 'मशरूम हांडी'
    },
    {
      id: 'veg-kofta-handi',
      url: 'https://b.zmtcdn.com/data/dish_photos/3b8/005094efac2cabdbf648a0ebcf8de3b8.jpg',
      dest: 'assets/photos/food/veg-kofta.webp',
      nameEn: 'Veg Kofta Handi',
      nameMr: 'व्हेज कोफ्ता हांडी',
      nameHi: 'वेज कोफ्ता हांडी'
    },
    {
      id: 'veg-shaam-savera',
      url: 'https://b.zmtcdn.com/data/dish_photos/cc2/6148e1ddb1ac8b0dd460df6ca7efecc2.jpeg',
      dest: 'assets/photos/food/malai-kofta.webp',
      nameEn: 'Veg Shaam Savera / Malai Kofta',
      nameMr: 'व्हेज शाम सवेरा / मलाई कोफ्ता',
      nameHi: 'वेज शाम सवेरा / मलाई कोफ्ता'
    },
    {
      id: 'paneer-rajwadi',
      url: 'https://b.zmtcdn.com/data/dish_photos/0b2/2c7618b8fca06d2cea6dc00da7eb50b2.jpeg',
      dest: 'assets/photos/food/paneer-rajwadi.webp',
      nameEn: 'Paneer Rajwadi',
      nameMr: 'पनीर रजवाडी',
      nameHi: 'पनीर रजवाड़ी'
    },
    {
      id: 'kaju-masala',
      url: 'https://b.zmtcdn.com/data/dish_photos/ccc/6bb8255dc8f6b2acd7fccbdb0e7b5ccc.jpeg',
      dest: 'assets/photos/food/kaju-masala.webp',
      nameEn: 'Kaju Masala',
      nameMr: 'काजू मसाला',
      nameHi: 'काजू मसाला'
    },
    {
      id: 'kaju-masala-macro',
      url: 'https://b.zmtcdn.com/data/dish_photos/ccc/6bb8255dc8f6b2acd7fccbdb0e7b5ccc.jpeg',
      dest: 'assets/photos/food/kaju-masala-macro.webp',
      nameEn: 'Kaju Masala Macro',
      nameMr: 'काजू मसाला मॅक्रो',
      nameHi: 'काजू मसाला'
    },
    {
      id: 'veg-lollipop',
      url: 'https://b.zmtcdn.com/data/dish_photos/b7a/f4fd5a43f96621d8c92d6bbace840b7a.jpeg',
      dest: 'assets/photos/food/veg-lollipop.webp',
      nameEn: 'Veg Lollipop / Gold Finger',
      nameMr: 'व्हेज लॉलीपॉप / गोल्ड फिंगर',
      nameHi: 'वेज लॉलीपॉप / गोल्ड फिंगर'
    },
    {
      id: 'mushroom-tikka',
      url: 'https://b.zmtcdn.com/data/dish_photos/135/89395d297bf9edde3727d6bb644a8135.jpg',
      dest: 'assets/photos/food/paneer-hot-pan.webp',
      nameEn: 'Mushroom Tikka Sizzler',
      nameMr: 'मशरूम टिक्का सिझलर',
      nameHi: 'मशरूम टिक्का सिज़लर'
    },
    {
      id: 'cheese-garlic-naan',
      url: 'https://b.zmtcdn.com/data/dish_photos/6fe/c2c2610439d9b4e774a6322082f0f6fe.jpeg',
      dest: 'assets/photos/food/garlic-naan.webp',
      nameEn: 'Cheese Garlic Naan',
      nameMr: 'चीज गार्लिक नान',
      nameHi: 'चीज लहसुन नान'
    },
    {
      id: 'butter-tandoori-roti',
      url: 'https://b.zmtcdn.com/data/dish_photos/f8a/389bc1db4ad0da6d85a9ac1e5c20bf8a.jpeg',
      dest: 'assets/photos/food/butter-roti.webp',
      nameEn: 'Butter Tandoori Roti',
      nameMr: 'बटर तंदूरी रोटी',
      nameHi: 'बटर तंदूरी रोटी'
    },
    {
      id: 'butter-chapati',
      url: 'https://b.zmtcdn.com/data/dish_photos/497/08e016da3026d2fc275ba457442cf497.jpeg',
      dest: 'assets/photos/food/butter-kulcha.webp',
      nameEn: 'Butter Kulcha & Chapati',
      nameMr: 'बटर कुलचा व चपाती',
      nameHi: 'बटर कुलचा और चपाती'
    },
    {
      id: 'tandoor-spread',
      url: 'https://b.zmtcdn.com/data/dish_photos/6fe/c2c2610439d9b4e774a6322082f0f6fe.jpeg',
      dest: 'assets/photos/food/tandoor-bread-spread.webp',
      nameEn: 'Fresh Tandoori Bread Spread',
      nameMr: 'गरमागरम तंदूरी रोट्यांचा थाट',
      nameHi: 'ताजा तंदूरी रोटियों का थाल'
    }
  ];

  for (const item of realDishes) {
    const res = await processImage(item.url, item.dest, 1200);
    if (res.success) {
      photoResults.push({
        id: `food-${item.id}`,
        src: res.src,
        category: 'food',
        alt: { en: item.nameEn, mr: item.nameMr, hi: item.nameHi },
        dominantColor: res.dominantColor,
        dimensions: { width: res.width, height: res.height },
        isRealAssetProvided: true
      });
    }
  }

  // Save the manifest of all processed real assets
  fs.writeFileSync('scripts/processed-real-photos.json', JSON.stringify(photoResults, null, 2));
  console.log(`\n🎉 Processed and saved ${photoResults.length} real photos with dimensions & dominant colors!`);
}

main().catch(err => {
  console.error('Fatal error in photo pipeline:', err);
  process.exit(1);
});

async function downloadMoreDishes() {
  const more = [
    { url: 'https://b.zmtcdn.com/data/dish_photos/240/8e49b980c7aa33c410c8d65de96d2240.jpeg', dest: 'assets/photos/food/aloo-paratha.webp' },
    { url: 'https://b.zmtcdn.com/data/dish_photos/fa1/aacd82a6bbd2130217fadeaaac04cfa1.jpeg', dest: 'assets/photos/food/paneer-paratha.webp' },
    { url: 'https://b.zmtcdn.com/data/dish_photos/e31/e665af380e9dd291b038ef11ffcf1e31.jpg', dest: 'assets/photos/food/puri-bhaji.webp' },
    { url: 'https://b.zmtcdn.com/data/dish_photos/919/710c52e8ee68e2edc7b63827cca37919.jpeg', dest: 'assets/photos/food/dahi-poha.webp' },
    { url: 'https://b.zmtcdn.com/data/dish_photos/6a2/9883dfe17be654531882d1dc3ec0c6a2.jpeg', dest: 'assets/photos/food/upma.webp' },
    { url: 'https://b.zmtcdn.com/data/dish_photos/ad2/367a09230e5d827e81601704f6d9aad2.jpeg', dest: 'assets/photos/food/raita.webp' },
    { url: 'https://b.zmtcdn.com/data/dish_photos/356/662ac1000b1e32e52bbc2f32d7597356.jpeg', dest: 'assets/photos/food/salad.webp' },
    { url: 'https://b.zmtcdn.com/data/dish_photos/f63/bcd211ea32eccb1aa86f022e40126f63.jpeg', dest: 'assets/photos/food/butter-naan.webp' },
    { url: 'https://b.zmtcdn.com/data/dish_photos/09f/a01440426806df76cbd057a12dfb609f.jpg', dest: 'assets/photos/food/lachha-paratha.webp' }
  ];

  for (const m of more) {
    await processImage(m.url, m.dest, 1200);
  }
}

downloadMoreDishes();
