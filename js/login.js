// 生成随机验证码
function generateCaptcha() {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let captcha = '';
    for (let i = 0; i < 4; i++) {
        captcha += chars[Math.floor(Math.random() * chars.length)];
    }
    return captcha;
}

// 绘制验证码
function drawCaptcha(captcha) {
    const canvas = document.getElementById('captchaCanvas');
    const ctx = canvas.getContext('2d');

    // 清空画布
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 设置背景
    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 绘制干扰线
    for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
        ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
        ctx.strokeStyle = `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`;
        ctx.stroke();
    }

    // 绘制干扰点
    for (let i = 0; i < 30; i++) {
        ctx.beginPath();
        ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, 1, 0, 2 * Math.PI);
        ctx.fillStyle = `rgb(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255})`;
        ctx.fill();
    }

    // 设置字体
    ctx.font = 'bold 24px Arial';
    ctx.textBaseline = 'middle';

    // 计算每个字符的固定宽度
    const charWidth = canvas.width / (captcha.length + 2);
    const startX = charWidth;

    // 绘制验证码文字
    for (let i = 0; i < captcha.length; i++) {
        const x = startX + i * charWidth;
        const y = canvas.height / 2 + (Math.random() - 0.5) * 10;

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate((Math.random() - 0.5) * 0.2);
        
        const r = Math.floor(Math.random() * 100);
        const g = Math.floor(Math.random() * 100);
        const b = Math.floor(Math.random() * 100);
        ctx.fillStyle = `rgb(${r},${g},${b})`;
        
        ctx.fillText(captcha[i], 0, 0);
        ctx.restore();
    }

    return captcha;
}

// 当前验证码值
let currentCaptcha = '';

// 初始化验证码
function initCaptcha() {
    currentCaptcha = generateCaptcha();
    drawCaptcha(currentCaptcha);
}

// 添加错误提示的无障碍支持
function showAccessibleError(message) {
    alert(message);
    const errorDiv = document.createElement('div');
    errorDiv.setAttribute('role', 'alert');
    errorDiv.setAttribute('aria-live', 'polite');
    errorDiv.textContent = message;
    document.body.appendChild(errorDiv);
    setTimeout(() => errorDiv.remove(), 5000);
}

// 页面加载完成后的初始化
document.addEventListener('DOMContentLoaded', function() {
    // 禁止页面滚动直到动画结束
    document.body.style.overflow = 'hidden';
    
    // 动画结束后启用滚动
    setTimeout(() => {
        document.body.style.overflow = '';
        // 移除开屏动画元素
        const splashScreen = document.querySelector('.splash-screen');
        if (splashScreen && splashScreen.parentNode) {
            splashScreen.parentNode.removeChild(splashScreen);
        }
    }, 3500); // 3.5秒后移除开屏动画

    // 初始化验证码
    initCaptcha();

    // 点击刷新验证码
    document.getElementById('captchaCanvas').addEventListener('click', initCaptcha);

    // 添加键盘操作支持
    document.getElementById('captchaCanvas').addEventListener('keypress', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            initCaptcha();
        }
    });

    // 表单提交处理
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const captcha = document.getElementById('captcha').value;
        
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,12}$/;
        
        if (!passwordRegex.test(password)) {
            showAccessibleError('密码必须包含字母和数字，长度在6-12位之间！');
            return;
        }

        if (captcha.toLowerCase() !== currentCaptcha.toLowerCase()) {
            showAccessibleError('验证码错误！');
            initCaptcha();
            document.getElementById('captcha').value = '';
            return;
        }
        
        if (username && password && captcha) {
            showAccessibleError('登录成功！');
            window.location.href = 'https://www.zmx.com/gallery.html';
        } else {
            showAccessibleError('请填写完整的登录信息！');
        }
    });
}); 