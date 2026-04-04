// استبدل هذه القيم بمفاتيحك الحقيقية من حساب EmailJS
const PUBLIC_KEY = "53P1UJTIZ28FtAFcU";      // من صفحة Account
const SERVICE_ID = "9hczd4m";      // من صفحة Email Services
const TEMPLATE_ID = "jqol86l";    // من صفحة Email Templates

// دالة لتوليد كود تفعيل عشوائي (لأغراض الاختبار)
function generateActivationCode() {
    return Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
}

// دالة إرسال البريد
function sendActivationEmail(userName, userEmail, activationLink) {
    emailjs.send(SERVICE_ID, TEMPLATE_ID, {
        name: userName,
        email: userEmail,
        activation_link: activationLink   // تأكد أن الاسم يطابق المتغير في القالب
    })
    .then(function(response) {
        console.log("✅ تم الإرسال بنجاح", response.status);
        alert("تم إرسال رابط التفعيل إلى بريدك الإلكتروني.");
    })
    .catch(function(error) {
        console.error("❌ فشل الإرسال", error);
        alert("فشل إرسال البريد. تحقق من الإعدادات.");
    });
}

// عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registration-form');
    
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // منع إعادة تحميل الصفحة
        
        // جمع البيانات
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        
        // إنشاء رابط التفعيل (في مشروع حقيقي يُنشأ من الخادم)
        const activationCode = generateActivationCode();
        const activationLink = `http://localhost:3000/activate.html?code=${activationCode}`; // غيّر الرابط لرابط موقعك الحقيقي
        
        // يمكنك هنا حفظ الكود في localStorage أو قاعدة بيانات (اختياري للاختبار)
        localStorage.setItem(activationCode, JSON.stringify({ name, email, activated: false }));
        
        // إرسال البريد
        sendActivationEmail(name, email, activationLink);
        
        // (اختياري) تفريغ الحقول
        form.reset();
    });
});