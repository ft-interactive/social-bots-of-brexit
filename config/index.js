import axios from 'axios';
import article from './article';
import getFlags from './flags';
import getOnwardJourney from './onward-journey';

export default async () => {
  const d = await article();
  const flags = await getFlags();
  const onwardJourney = await getOnwardJourney();
  const accountsSheetId = '10hv2ezszP6BfQ6R7unQhigB3AZedCbwEdwwHF7Js3eM';
  const accountsEndpoint = `https://bertha.ig.ft.com/view/publish/gss/${accountsSheetId}/accounts`;
  const resAccounts = await axios(accountsEndpoint);
  const accountsData = resAccounts.data;

  accountsData.forEach((row, i) => {
    const r = row;

    try {
      r.timeseries = JSON.parse(r.timeseries);
    } catch (e) {
      row.timeseries = null;

      console.log('Failed to parse timeseries for row', i);
    }
  });

  /*
  An experimental demo that gets content from the API
  and overwrites some model values. This requires the Link File
  to have been published. Also next-es-interface.ft.com probably
  isn't a reliable source. Also this has no way to prevent development
  values being seen in productions... use with care.

  try {
    const a = (await axios(`https://next-es-interface.ft.com/content/${d.id}`)).data;
    d.headline = a.title;
    d.byline = a.byline;
    d.summary = a.summaries[0];
    d.title = d.title || a.title;
    d.description = d.description || a.summaries[1] || a.summaries[0];
    d.publishedDate = new Date(a.publishedDate);
    f.comments = a.comments;
  } catch (e) {
    console.log('Error getting content from content API');
  }

  */

  return {
    ...d,
    flags,
    onwardJourney,
    accountsData,
  };
};
