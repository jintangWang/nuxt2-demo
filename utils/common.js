import syncApiService from '@/services/sync-api-service.js';

let dateAbbreviation = [
    {months: 1, abbreviation: 'Jan'},
    {months: 2, abbreviation: 'Feb'},
    {months: 3, abbreviation: 'Mar'},
    {months: 4, abbreviation: 'Apr'},
    {months: 5, abbreviation: 'May'},
    {months: 6, abbreviation: 'Jun'},
    {months: 7, abbreviation: 'Jul'},
    {months: 8, abbreviation: 'Aug'},
    {months: 9, abbreviation: 'Sept'},
    {months: 10, abbreviation: 'Oct'},
    {months: 11, abbreviation: 'Nov'},
    {months: 12, abbreviation: 'Dec'},
];

export function abbreviation(months) {
    return dateAbbreviation.find((item) => Number(months) === item.months).abbreviation;
}


export async function setRecommendProducts(context) {
  if (context.store.state.recommendProducts.length === 0) {
    await syncApiService.get('api/products/getRecommendProducts').then(data => {
      context.store.commit('setRecommendProducts', data)
    }).catch(err => {
      console.log('获取推荐产品出错', err)
    });
  }
}

export async function setCooperation(context) {
  if (context.store.state.cooperationList.length === 0) {
    await syncApiService.get('api/cooperation/getLists').then(data => {
      context.store.commit('setCooperation', data)
    }).catch((error) => {
      console.log('获取合作伙伴出错', error)
    });
  }
}

// 根据路由获取 service、info center、faq 二级页面的 title
export function getTitle(path) {
  if (!path) return '';
  let pathArr = path.split('/');
  let category = pathArr[pathArr.length - 1];
  return category.split('-').join(' ').split('_').join('/');
}

// 兼容 safari、chrome、firefox
export function timeToIso(str) {
  let dateString = str.replace(/-/g, '/').replace('T', ' ');
  return new Date(dateString).toISOString()
}

export function formatDate(str) {
  let time = new Date(str);
  let date = (time.getDate() + '').padStart(2, '0');
  return time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + date;
}
