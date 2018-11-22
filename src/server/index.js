import fetch from '@/fetch'
// 测试
export const test = data => fetch('/api/test', data, 'POST');
