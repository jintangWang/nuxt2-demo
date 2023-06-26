import { timeToIso } from './common';

export default {
  domain: 'https://www.xaapt.com',
  getSearch() {
    return {
      innerHTML:
        `{
          "@context": "http://schema.org",
          "@type" : "WebSite",
          "url" : "${this.domain}",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "${this.domain}/search/Results?keywords={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        }`,
      type: 'application/ld+json'
    };
  },
  /**
   * @params {Object} article
   *  @field {String} url
   *  @field {String} title
   *  @field {Array} image
   *  @field {String ISO} publishDate
   *  @field {String ISO} modifiedDate : ? not required
   * */
  getArticle(article = {}) {
    article.title = article.title || '';
    let image = article.image.filter(item => {
      return item;
    });
    article.image = JSON.stringify(image);
    article.publishDate = (typeof article.publishDate === 'number') ?
      new Date(article.publishDate * 1000).toISOString() :
      timeToIso(article.publishDate);

    let modifiedStr = '';
    if (article.modifiedDate) {
      article.modifiedDate = (typeof article.modifiedDate === 'number') ?
        new Date(article.modifiedDate * 1000).toISOString() :
        timeToIso(article.modifiedDate);
      modifiedStr = `,"dateModified": "${article.modifiedDate}"`;
    }

    return {
      innerHTML:
        `{
          "@context": "https://schema.org",
          "@type": "NewsArticle",
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "${this.domain}${article.url}"
          },
          "author": {
            "@type": "Organization",
            "name": "APT"
          },
          "publisher": {
            "@type": "Organization",
            "name": "APT",
            "logo": {
              "@type": "ImageObject",
              "url": "${this.domain}/img/logo.png"
            }
          },
          "headline": "${article.title}",
          "image": ${article.image},
          "datePublished": "${article.publishDate}"
          ${modifiedStr}
        }`,
      type: 'application/ld+json'
    };
  },
  /**
   * @param {Array} crumbList
   * */
  getCrumb(crumbList) {
    crumbList = crumbList.map(item => {
      item["@type"] = "ListItem";
      return item;
    });
    return {
      innerHTML:
        `{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": ${JSON.stringify(crumbList)}
        }`,
      type: 'application/ld+json'
    };
  },
  getBadge() {
    return {
      innerHTML:
        `{
          "@context": "https://schema.org",
          "@type": "Organization",
          "url": "${this.domain}",
          "logo": "${this.domain}/img/logo.png"
        }`,
      type: 'application/ld+json'
    };
  },
  /**
   * @param {Array} steps
   *  @field [0] name
   *  @filed [1...] step
   *  todo 不确定每一步是否需要图片，文档说不需要，测试工具说需要
   * */
  getHowTo(steps = []) {
    let matchName = steps[0].match(/\s.+/);
    let name = matchName ? matchName[0] : '';
    let step = steps.slice(1).map(item => {
      let matchText = item.match(/\s.+/);
      let text = matchText ? matchText[0].split('&nbsp;').join('') : '';
      return {
        "@type": "HowToStep",
        "text": text,
      }
    });
    return {
      innerHTML:
        `{
          "@context": "http://schema.org",
          "@type": "HowTo",
          "name": "${name}",
          "step": ${JSON.stringify(step)}
        }`,
      type: 'application/ld+json'
    };
  },
  /**
   * @param {Array} questions
   *  @item question
   *    @field name
   *    @filed answer
   *  todo   item.answer 待优化
   * */
  getFaq(questions = []) {
    let result = questions.map(item => {
      return {
        "@type": "Question",
        "name": item.name,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.answer
        }
      };
    });
    return {
      innerHTML:
        `{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": ${JSON.stringify(result)}
        }`,
      type: 'application/ld+json'
    };
  },
};
