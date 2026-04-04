import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const { token } = req.query;

  if (!token) {
    return res.status(400).json({ message: 'رمز التفعيل مفقود' });
  }

  try {
    const filePath = path.join(process.cwd(), 'data', 'users.json');
    const users = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    const userIndex = users.findIndex(u => u.token === token);
    if (userIndex === -1) {
      return res.status(400).json({ message: 'رمز التفعيل غير صحيح' });
    }

    if (users[userIndex].verified) {
      return res.status(200).json({ message: 'الحساب مفعل بالفعل' });
    }

    users[userIndex].verified = true;

    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

    return res.status(200).json({ message: 'تم تفعيل الحساب بنجاح' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'حدث خطأ في السيرفر' });
  }
}