// 图片数据
const images = [
    { 
        src: 'imgs/1.jpg', 
        title: '1.jpg',
        category: '风景',
        link: 'https://www.miyoushe.com/zzz/topicDetail/1255',
        width: 600,
        height: 300
    },
    { 
        src: 'imgs/2.jpg', 
        title: '2.jpg',
        category: '风景',
        link: 'https://www.miyoushe.com/zzz/topicDetail/1255',
        width: 600,
        height: 300
    },
    { 
        src: 'imgs/3.jpg', 
        title: '3.jpg',
        category: '风景',
        link: 'https://www.miyoushe.com/zzz/topicDetail/1255',
        width: 600,
        height: 300
    }
];

// 随机打乱数组
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// 渲染图片
function renderImages(images) {
    const gallery = document.querySelector('.gallery-grid');
    const shuffledImages = shuffleArray([...images]);
    
    gallery.innerHTML = shuffledImages.map(img => `
        <div class="gallery-item" data-category="${img.category}">
            <a href="${img.link}" target="_blank" rel="noopener noreferrer">
                <img src="${img.src}" 
                     alt="${img.title}" 
                     loading="lazy"
                     width="${img.width}"
                     height="${img.height}">
                <div class="gallery-item-info">
                    <h3 class="gallery-item-title">${img.title}</h3>
                    <p class="gallery-item-desc">${img.category}</p>
                </div>
            </a>
        </div>
    `).join('');
}

// 初始渲染
renderImages(images);

// 标签筛选功能
const filterTags = document.querySelectorAll('.filter-tag');
filterTags.forEach(tag => {
    tag.addEventListener('click', function() {
        filterTags.forEach(t => t.classList.remove('active'));
        this.classList.add('active');

        const category = this.textContent;
        const filteredImages = category === '全部' 
            ? images 
            : images.filter(img => img.category === category);
        renderImages(filteredImages);
    });
}); 