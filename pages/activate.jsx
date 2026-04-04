import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Activate() {
  const router = useRouter();
  const { token } = router.query;
  const [message, setMessage] = useState('⏳ جاري التحقق...');
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    if (!token) return;

    fetch(`/api/activate?token=${token}`)
      .then(res => res.json())
      .then(data => {
        if (data.message === 'تم تفعيل الحساب بنجاح') {
          setMessage('✅ تم تفعيل حسابك بنجاح!');
          setStatus('success');
        } else {
          setMessage('❌ ' + data.message);
          setStatus('error');
        }
      })
      .catch(() => {
        setMessage('❌ حدث خطأ أثناء التفعيل');
        setStatus('error');
      });
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        {status === 'loading' && <p className="text-yellow-600">{message}</p>}
        {status === 'success' && (
          <>
            <p className="text-green-600 text-2xl mb-4">{message}</p>
            <button
              onClick={() => router.push('/login')}
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              تسجيل الدخول
            </button>
          </>
        )}
        {status === 'error' && (
          <>
            <p className="text-red-600 text-2xl mb-4">{message}</p>
            <button
              onClick={() => router.push('/register')}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              العودة للتسجيل
            </button>
          </>
        )}
      </div>
    </div>
  );
}