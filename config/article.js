export default () => ({ // eslint-disable-line

  // link file UUID
  id: 'c8c94c7a-3411-11e7-bce4-9023f8c0fd2e',

  // canonical URL of the published page
  // https://ig.ft.com/social-bots-of-brexit get filled in by the ./configure script
  url: 'https://ig.ft.com/social-bots-of-brexit',

  // To set an exact publish date do this:
  //       new Date('2016-05-17T17:11:22Z')
  publishedDate: new Date('2017-06-08T10:03:00Z'),

  headline: 'Brexit bots and the UK election',

  // summary === standfirst (Summary is what the content API calls it)
  summary: 'FT analysis of how the most prolific bots are responding to the UK vote on June 8',

  topic: {
    name: 'UK general election',
    url: 'https://www.ft.com/uk-general-election',
  },

  // relatedArticle: {
  //   text: 'Related article »',
  //   url: 'https://en.wikipedia.org/wiki/Politics_and_the_English_Language',
  // },

  mainImage: {
    title: '',
    description: '',
    credit: ' FT/Charlie Bibby',
    url: 'https://www.ft.com/__origami/service/image/v2/images/raw/ftcms%3Aed2c8786-3e06-11e7-82b6-896b95f30f58?source=ig&width=700&fit=scale-down&quality=highest',
    width: 2048, // ensure correct width
    height: 1152, // ensure correct height
  },

  // Byline can by a plain string, markdown, or array of authors
  // if array of authors, url is optional
  byline: [
    { name: 'David Blood', url: 'https://ft.com/david-blood' },
  ],

  // Appears in the HTML <title>
  title: 'Brexit bots and the UK election',

  // meta data
  description: 'FT analysis of how the most prolific bots are responding to the UK vote on June 8',

  /*
  TODO: Select Twitter card type -
        summary or summary_large_image

        Twitter card docs:
        https://dev.twitter.com/cards/markup
  */
  twitterCard: 'summary',

  /*
  TODO: Do you want to tweak any of the
        optional social meta data?
  */
  // General social
  // socialImage: '',
  // socialHeadline: '',
  // socialSummary:  '',

  // TWITTER
  // twitterImage: '',
  // twitterCreator: '@individual's_account',
  // tweetText:  '',
  // twitterHeadline:  '',

  // FACEBOOK
  // facebookImage: '',
  // facebookHeadline: '',

  tracking: {

    /*

    Microsite Name

    e.g. guffipedia, business-books, baseline.
    Used to query groups of pages, not intended for use with
    one off interactive pages. If you're building a microsite
    consider more custom tracking to allow better analysis.
    Also used for pages that do not have a UUID for whatever reason
    */
    // micrositeName: '',

    /*
    Product name

    This will usually default to IG
    however another value may be needed
    */
    // product: '',
  },
});
