import syncApiService from '../services/sync-api-service';

function handleUrl(str) {
  if (!str) return '';
  return str.trim().split('/').join('_').split(' ').join('-');
}

const routes = {
  getMainRoutes: function() {
    return [
      '/', '/contact', '/search-results?keywords=', '/Sitemap', '/legal-notice', '/privacy-policy'
    ];
  },
  getNewsRoutes: async function () {
    let result = ['/news'];
    let promise1 = syncApiService.post('api/news/getAllNews');
    let resArr = await Promise.all([promise1]);
    let itemObj = resArr[0];
    itemObj.forEach(item => {
      result.push('/news/' + '/' + handleUrl(item.new_title) + '?id=' + item.id);
    });
    return result;
  },
  getAboutAptRoutes: async function () {
    let promise1 = syncApiService.get('api/company/aboutApt');
    let resArr = await Promise.all([promise1]);
    let itemObj = resArr[0].info;
    let result = ['/About-APT'];
    itemObj.forEach(item => {
      result.push('/About-APT/' + '/' + handleUrl(item.title) + '?id=' + item.id);
    });
    return result;
  },
  getSolutionRoutes: async function() {
    let promise1 = syncApiService.post('api/category/getList', {type: 'solutions'});
    let promise2 = syncApiService.post('api/solution/getAllSolution');
    let resArr = await Promise.all([promise1, promise2]);

    let categoryArr = resArr[0];
    let itemObj = resArr[1];

    let result = ['/Solutions'];
    categoryArr.forEach(menu => {
      result.push('/Solutions/' + handleUrl(menu.category_name) + '?id=' + menu.id);
    });
    for (let i in itemObj) {
      itemObj[i].forEach(item => {
        result.push('/Solutions/' + handleUrl(i) + '/' + handleUrl(item.title) + '?id=' + item.id);
      });
    }

    return result;
  },
  getProductRoutes: async function() {
    let promise1 = syncApiService.post('api/category/getList', {type: 'products'});
    let promise2 = syncApiService.post('api/products/getAllProducts');
    let resArr = await Promise.all([promise1, promise2]);

    let categoryArr = resArr[0];
    let itemObj = resArr[1];

    let result = ['/Products'];
    categoryArr.forEach(menu => {
      result.push('/Products/' + handleUrl(menu.category_name) + '?id=' + menu.id);
      if (menu.children && menu.children.length > 0) {
        menu.children.forEach(subMenu => {
          result.push('/Products/' + handleUrl(subMenu.category_name) + '?id=' + subMenu.id + '&level=sub');
        });
      }
    });
    for (let i in itemObj) {
      itemObj[i].forEach(item => {
        result.push('/Products/' + handleUrl(i) + '/' + handleUrl(item.products_title) + '?id=' + item.id);
      });
    }

    return result;
  },
  getServiceRoutes: async function() {
    let promise1 = syncApiService.post('api/service/getAllService');
    let resArr = await Promise.all([promise1]);

    let itemObj = resArr[0];

    let result = ['/Services'];
    for (let i in itemObj) {
      itemObj[i].forEach(item => {
        result.push('/Services/' + handleUrl(i) + '/' + handleUrl(item.title) + '?id=' + item.id);
      });
    }

    return result;
  },
  getInfocenterRoutes: async function() {
    let promise1 = syncApiService.get('api/infocenter/getFirstList');
    let promise2 = syncApiService.post('api/infocenter/getAllInfocenter');
    let resArr = await Promise.all([promise1, promise2]);

    let categoryArr = resArr[0];
    let itemObj = resArr[1];

    let result = ['/Infocenter'];
    categoryArr.forEach(menu => {
      result.push('/Infocenter/' + handleUrl(menu.category_name) + '?id=' + menu.id);
    });
    for (let i in itemObj) {
      itemObj[i].forEach(item => {
        result.push('/Infocenter/' + handleUrl(i) + '/' + handleUrl(item.title) + '?id=' + item.id);
      });
    }

    return result;
  },
  getFaqRoutes: async function() {
    let promise1 = syncApiService.get('api/faq/getFirstList');
    let promise2 = syncApiService.post('api/faq/getAllFaq');
    let resArr = await Promise.all([promise1, promise2]);

    let categoryArr = resArr[0];
    let itemObj = resArr[1];

    let result = ['/FAQ'];
    categoryArr.forEach(menu => {
      result.push('/FAQ/' + handleUrl(menu.category_name) + '?id=' + menu.id);
    });
    for (let i in itemObj) {
      itemObj[i].forEach(item => {
        result.push('/FAQ/' + handleUrl(i) + '/' + handleUrl(item.title) + '?id=' + item.id);
      });
    }

    return result;
  },
};

module.exports = routes;
